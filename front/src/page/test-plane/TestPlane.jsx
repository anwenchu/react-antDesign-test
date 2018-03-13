import React from "react";
import {Layout,Form, Input, Cascader, Divider, Row, Col, Checkbox, Button, Table,message} from "antd";
import "antd/dist/antd.css";
import {promiseAjax} from '../common/an';
import {
    Link
} from 'react-router-dom'
/*
 *页面名称：新建、编辑测试计划页面
 * 入口：测试计划管理页面点击新建测试计划进入
 */

const {Header, Content, Footer} = Layout;

const FormItem = Form.Item;
const { TextArea } = Input;

@Form.create()
export default class TestPlane extends React.Component {
    state = {
        caseDir : [],
        caseData : [],
        selectedRowKeys : [], // 记录选中的用例序号
        plane : [],
        platform : '',
        selectCase : [],  // 记录被选中的用例信息
        isEdit:'', //判断是否为编辑状态
    };
    columns = [{
        title: '执行顺序',
        dataIndex: 'key',
        width: 100
    }, {
        title: '用例标题',
        dataIndex: 'caseTitle',
        render: (text, record) => (
            <a onClick={() => this.handleEdit(record.id)}>{text}</a>
        ),
        width: 650
    }, {
        title: '执行次数',
        dataIndex: 'caseCount',
        render: (text, record) => (
            <Input placeholder="1" value={record.caseCount} onChange={e=>this.onChangeValue(record.key,e)}/>
        ),
        width: 150
    }, {
        title: '操作',
        dataIndex: 'action',
        render: (text, record) => (
            <span>
                    <a href="#" onClick={e => this.upMove(record.key,e)}>上移</a>
                    <Divider type="vertical" />
                    <a href="#" onClick={e => this.downMove(record.key,e)}>下移</a>
                </span>
        ),
        width: 150
    }];


    /**
     * 编辑用例
     * @param id
     */
    handleEdit(caseId) {
        const editPath = {
            pathname : '/addtestcase',
            isEdit:'1', // 如果是编辑操作则进入编辑状态
            caseId : caseId,
            platform:this.state.platform,
        }
        this.props.history.push(editPath);
    }

    onChangeValue = (key,e) => {
        console.log("onChangeUserName-value:",e.target.value );
        var key_i = parseInt(key)-1;
        var data = [...this.state.caseData];
        data[key_i].caseCount = e.target.value;
        this.setState({
            caseData:data,
        });

    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    // react 生命周期函数
    componentDidMount() {
        //初始化数据
        this.search()
    }

    // 将返回的目录数据转为级联控件需要的格式
    getData(data){
        return data.map((item) => {
            var str = {};
            str.value = item.nodeId;
            str.label = item.nodeName;
            if (item.children.length !== 0) {
                str.children = this.getData(item.children);
                return str;

            }else {
                return str;
            }
        });
    }

    /**
     * 查询用例目录
     * @param all
     */
    search = () => {
        const isEidt = this.props.location.isEdit;
        console.log("search-isEdit:",isEidt);
        var platform;
        if(null != isEidt){
            // 如果是编辑状态，则初始化表单数据
            const plane = this.props.location.planeInfo;
            plane.directoryId = plane.directoryId.split(",");
            platform = plane.platform;
            this.setState({
                plane : plane
            });
            // 获取当前目录下的所有用例数据
            promiseAjax.get(`/testcase/search?directoryId=${plane.directoryId[plane.directoryId.length-1]}`).then(data => {
                if (data && data.length!=0) {
                    // 增加排序字段
                    for(var i=0;i<data.length;i++){
                        data[i]["key"] = (i+1).toString();
                        data[i]["caseCount"] = '1';
                    }
                    // 更新用例数据源
                    this.setState({
                        caseData : data
                    });
                    //获取用例列表数据
                    promiseAjax.get(`/planecase/search?planeId=${plane.id}`).then(rsp => {
                        if (rsp && rsp.length!=0) {
                            // 根据返回结果修改选中状态
                            const selectedRowKeys = this.state.selectedRowKeys;
                            console.log("selectedRowKeys:",selectedRowKeys);
                            const caseData = this.state.caseData;
                            console.log("caseData:",caseData);
                            rsp.map((item)=>{
                                selectedRowKeys.push(item.orderNo);
                                console.log("item:",item);
                                for(var i=0;i<caseData.length;i++)

                                    if (caseData[i].id.toString() === item.caseId){
                                        console.log("caseData[i].id:",caseData[i].id.toString());
                                        // 修改用例执行次数
                                        caseData[i].caseCount = item.caseCount;
                                        // 修改位置
                                        if(caseData[parseInt(item.orderNo)-1].id.toString()!==item.caseId){
                                            var tmp = caseData[i];
                                            caseData[i] = caseData[parseInt(item.orderNo)-1];
                                            caseData[parseInt(item.orderNo)-1] = tmp
                                            var tmp = caseData[parseInt(item.orderNo)-1].key
                                            caseData[parseInt(item.orderNo)-1].key = caseData[i].key;
                                            caseData[i].key = tmp;


                                        }
                                    }
                                    else{
                                        console.log("caseData[i].id:",caseData[i].id.toString());
                                    }
                            });


                            this.setState({
                                selectCase : rsp,
                            });
                        }
                    });
                }
            });

        }else{
            platform = this.props.location.platform;
        }
        // 获取目录数据
        promiseAjax.get(`/dir/list?platform=${platform}`).then(data => {
            if (null != data) {
                // 将数据存入state  渲染页面
                data = data.children;
                var data = this.getData(data);
                console.log("serch-getdata:",data);
                this.setState({
                    caseDir : data,
                    platform : platform,
                });
            }
        });
    }

    /**
     * 新建测试计划
     * @param all
     */
    handleSubmit = (e) => {
        e.preventDefault();
        var platform = this.state.platform;

        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.platform = platform;
                values.directoryId = values.directoryId.toString();
                const isEdit = this.props.location.isEdit;

                //插入测试计划的用例数据
                var planecase = [];
                var selectCase = this.state.selectedRowKeys;
                var caseData = this.state.caseData;
                for(var i=0;i<selectCase.length;i++){
                    var value = caseData[selectCase[i]-1];//选择被选中的用例数据
                    planecase.push({
                        caseId : value.id.toString(),
                        caseCount : value.caseCount,
                        orderNo : value.key,
                    })
                }
                console.log("handleSubmit-values:",values);
                // 如果是编辑状态
                if (isEdit==='1') {
                    console.log("handleSubmit-111111:",isEdit);
                    // 保存测试用例
                    const testplane = this.props.location.planeInfo;
                    values.id = testplane.id;
                    for(var i=0;i<planecase.length;i++){
                        planecase[i].planeId = testplane.id.toString(); // 测试计划添加成功后返回的id
                    }
                    //测试计划新建成功后，新增测试用例数据
                    promiseAjax.post('/plane/add', values).then(data => {
                        if (null != data) {
                            // 保存测试用例数据
                            promiseAjax.post(`/planecase/add`,planecase).then(data => {
                                if (null != data) {
                                    message.info('保存测试计划成功！');
                                    this.props.history.goBack();
                                }
                            });

                        }
                    });
                }else {
                    //添加测试计划
                    promiseAjax.post('/plane/add', values).then(data => {
                        if (null != data) {
                            //测试计划新建成功后，新增测试用例数据
                            for(var i=0;i<planecase.length;i++){
                                planecase[i].planeId = data[0].id.toString(); // 测试计划添加成功后返回的id
                            }
                            // 插入测试计划所选用例
                            promiseAjax.post('/planecase/add', planecase).then(data => {
                                if (null != data) {
                                    //form.resetFields();
                                    this.props.history.goBack();
                                }
                            });
                        }
                    });
                }





            }
        });
    }


    // 获取该目录下所有用例数据
    getCaseData(directoryId){
        // 条件查询接口
        promiseAjax.get(`/testcase/search?directoryId=${directoryId[directoryId.length-1]}`).then(data => {
            if (data && data.length!=0) {
                // 增加排序字段
                for(var i=0;i<data.length;i++){
                    data[i]["key"] = (i+1).toString();
                    data[i]["caseCount"] = '1';
                }
                // 将数据存入state  渲染页面
                this.setState({
                    caseData : data,
                });
                console.log("onChange-data",this.state.caseData);
            }
        });

    }


    // 根据选择的目录展示用例信息
    onChange(value) {
        this.getCaseData(value);
    }



    upMove(key,e) {

        const data = [...this.state.caseData];

        e.preventDefault();
        var key_i = parseInt(key);

        if (key_i > 1)
        {
            // 交换排序
            var temp = data[key_i-2];
            data[key_i-2] = data[key_i-1];
            data[key_i-1] = temp;

            // 交换数据内容
            var tempKey = data[key_i-2].key;
            data[key_i-2].key = data[key_i-1].key;
            data[key_i-1].key = tempKey;

            // 交换选中状态
            var selectCase = this.state.selectedRowKeys;
            if (selectCase.length !==0){
                selectCase.sort()
                console.log("key-before",key_i);
                console.log("selectCase-before",selectCase);

                for (var i=0;i<selectCase.length;i++){
                    if ((key_i-1).toString() === selectCase[i]){
                        selectCase[i] = key_i.toString()
                    }
                    else if(key_i.toString()===selectCase[i]){
                        selectCase[i] = (key_i-1).toString();
                    }
                }
            }
            console.log("selectCase-after",selectCase);

        }
        this.setState({
            caseData :data,
            selectedRowKeys:selectCase,
        });
    }

    downMove(key, e) {

        const data = [...this.state.caseData];
        e.preventDefault();
        var key_i = parseInt(key);

        if (key_i < data.length)
        {
            // 交换排序
            var temp = data[key_i];
            data[key_i] = data[key_i-1];
            data[key_i-1] = temp;

            // 交换数据内容
            var tempKey = data[key_i].key;
            data[key_i].key = data[key_i-1].key;
            data[key_i-1].key = tempKey;

            // 交换选中状态
            var selectCase = this.state.selectedRowKeys;
            if (selectCase.length !==0){
                selectCase.sort()
                console.log("selectCase-before",selectCase);

                for (var i=0;i<selectCase.length;i++){
                    if(key_i.toString()===selectCase[i]){
                        selectCase[i] = (key_i+1).toString();
                    }
                    else if ((key_i+1).toString() === selectCase[i]){
                        selectCase[i] = key_i.toString()
                    }

                }

            }

        }
        console.log("render-downMove-data-selectCase",selectCase);
        this.setState({
            caseData:data,
            selectedRowKeys:selectCase,
        });

    }

    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        const { caseData,caseDir, selectedRowKeys,plane } = this.state;
        // 选择复选框
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const formItemLayout = {
            labelCol: {
                span: 6 ,
            },
            wrapperCol: {
                span: 12 ,
            },
        };


        return (
            <Content >
                <div style={{background: "#fff", padding: 24, minHeight: 430}}>
                    <div style={{padding: "40px"}}>
                        <div style={{textAlign:"center",fontSize:20} } >测试计划</div>
                        <div style={{padding:20}}>
                            <Form onSubmit={this.handleSubmit}>

                                <FormItem
                                    {...formItemLayout}
                                    label="标题"
                                >
                                    {getFieldDecorator('testPlaneName', {
                                        initialValue: plane == null ? '' : plane.testPlaneName,
                                        rules: [{
                                            required: true, message: '请输入标题!',
                                        },{
                                            max:50,message: '最多允许输入50个字符!',
                                        }],

                                    })(
                                        <Input placeholder="请输入标题"/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="描述"
                                >
                                    {getFieldDecorator('testPlaneDes', {
                                        initialValue: plane == null ? '' : plane.testPlaneDes,
                                        rules: [{
                                            max:50, message: '最多允许输入50个字符!',
                                        }],

                                    })(
                                        <TextArea placeholder="请输入描述" autosize={{ minRows: 2, maxRows: 6 }} />
                                    )}

                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="执行次数"
                                >
                                    {getFieldDecorator('testPlaneCount', {
                                        initialValue: plane == null ? '' : plane.testPlaneCount,
                                        rules: [{
                                            pattern: "^[0-9]*$", message: '只允许输入数字!',
                                        },{
                                            max: 11, message: '输入超出范围!',
                                        }],

                                    })(
                                        <Input placeholder="1"/>
                                    )}

                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="执行时间(分钟)"
                                >
                                    {getFieldDecorator('testPlaneRuntime', {
                                        initialValue: plane == null ? '' : plane.testPlaneRuntime,
                                        rules: [{
                                            pattern: "^[0-9]*$", message: '只允许输入数字!',
                                        },{
                                            max: 11, message: '输入超出范围!',
                                        }],

                                    })(
                                        <Input placeholder="请输入执行时间"/>
                                    )}

                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="app地址"
                                >
                                    {getFieldDecorator('appUrl', {
                                        initialValue: plane == null ? '' : plane.appUrl,
                                        rules: [{
                                            required: true, message: '请输入app地址!',
                                        },{
                                            max:100,message: '最多允许输入100个字符!',
                                        }],
                                    })(
                                        <Input placeholder="请输入app地址"/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="客户端版本号"
                                >
                                    {getFieldDecorator('appVersion', {
                                        initialValue: plane == null ? '' : plane.appVersion,
                                        rules: [{
                                            required: true, message: '请输入客户端版本号!',
                                        },{
                                            max:50,message: '最多允许输入50个字符!',
                                        }],
                                    })(
                                        <Input placeholder="请输入客户端版本号"/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="系统版本"
                                >
                                    {getFieldDecorator('sysVersion', {
                                        initialValue: plane == null ? '' : plane.sysVersion,
                                        rules: [{
                                            required: true, message: '请输入系统版本!',
                                        },{
                                            max:50,message: '最多允许输入50个字符!',
                                        }],
                                    })(
                                        <Input placeholder="请输入系统版本"/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="设备名称"
                                >
                                    {getFieldDecorator('deviceName', {
                                        initialValue: plane == null ? '' : plane.deviceName,
                                        rules: [{
                                            required: true, message: '请输入设备名称!',
                                        },{
                                            max:50,message: '最多允许输入50个字符!',
                                        }],
                                    })(
                                        <Input placeholder="请输入设备名称"/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="udid（ios）"
                                >
                                    {getFieldDecorator('deviceUUID', {
                                        initialValue: plane == null ? '' : plane.deviceUUID,
                                        rules: [{
                                            max:50,message: '最多允许输入50个字符!',
                                        }],
                                    })(
                                        <Input placeholder="请输入udid"/>
                                    )}

                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="选择用例目录"
                                >
                                    {getFieldDecorator('directoryId', {
                                        initialValue: plane == null ? '' : plane.directoryId,

                                        rules: [{ type: 'array', required: true, message: '请选择用例组目录!' }],
                                    })(
                                        <Cascader placeholder="请选择" options={caseDir} onChange={this.onChange.bind(this)}/>
                                    )}
                                </FormItem>
                                <FormItem>
                                    <Table rowSelection={rowSelection} columns={this.columns} dataSource={caseData}/>
                                </FormItem>
                                <FormItem>
                                    <Row gutter={16} align={"middle"} justify={"center"}>
                                        <Col className="gutter-row" span={2} offset={8}>
                                            <Button onClick={()=>{this.props.history.goBack()}}>取消</Button>
                                        </Col>
                                        <Col className="gutter-row" span={2} offset={4}>
                                            <Button type="primary" htmlType="submit">保存</Button>
                                        </Col>
                                    </Row>
                                </FormItem>
                            </Form>
                        </div>
                    </div>
                </div>
            </Content>
        )
    }
}
