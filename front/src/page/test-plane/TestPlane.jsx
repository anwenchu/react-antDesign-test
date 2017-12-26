import React from "react";
import {Layout,Form, Input, Cascader, Divider, Row, Col, Checkbox, Button, Table} from "antd";
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
        caseDir:[],
        caseData:[],
        selectedRowKeys:[],
    };
    columns = [{
        title: '执行顺序',
        dataIndex: 'key',
    }, {
        title: '用例标题',
        dataIndex: 'caseTitle',
        render: text => <a href="#"><Link to={"/addtestcase"}>{text}</Link></a>,
    }, {
        title: '执行次数',
        dataIndex: 'caseCount',
        render: (text, record) => (
            <Input placeholder="1" value={record.caseCount} onChange={e=>this.onChangeValue(record.key,e)}/>
        ),
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
    }];

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
        const platform = this.props.location.platform;
        //ajax get请求  url 路径
        promiseAjax.get(`/dir/list?platform=${platform}`).then(data => {
            if (null != data) {
                // 将数据存入state  渲染页面
                data = data.children;
                var data = this.getData(data);
                console.log("serch-getdata:",data);
                this.setState({
                    caseDir : data,
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
        const form = this.props.form;
        var platform = this.props.location.platform;

        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.platform = platform;
                values.directoryId = values.directoryId.toString();
                console.log("handleSubmit-values:",values);
                //ajax post请求  url 路径
                promiseAjax.post('/plane/add', values).then(data => {
                    if (null != data) {
                        //插入测试计划的用例数据
                        //var caseValue = {};
                        var planecase = [];
                        var selectCase = this.state.selectedRowKeys;
                        var caseData = this.state.caseData;
                        for(var i=0;i<selectCase.length;i++){
                            var value = caseData[selectCase[i]]
                            //caseValue["planecase["+i+"]"]={
                            planecase.push({
                                caseId : value.id.toString(),
                                caseCount : value.caseCount,
                                planeId : data[0].id.toString(),  // 测试计划添加成功后返回的id
                                order : value.key,
                            })
                        }
                        console.log("handleSubmit-caseValue:",planecase);
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
        });
    }


    // 根据选择的目录展示用例信息
    onChange(value) {
        console.log("onChange-value:",value);
        const platform = this.props.location.platform;
        // 条件查询接口
        promiseAjax.get(`/testcase/search?platform=${platform}&directoryId=${value[value.length-1]}`).then(data => {
            if (null != data) {
                // 将数据存入state  渲染页面
                console.log("onChange-data",data);
                // 增加排序字段
                for(var i=0;i<data.length;i++){
                    data[i]["key"] = (i+1).toString();
                    data[i]["caseCount"] = '1';
                }
                this.setState({
                    caseData : data,
                });
            }
        });
    }



    upMove(key,e) {

        const data = [...this.state.caseData];
        console.log("render-upMove-key",key);
        console.log("render-upMove-data-before",data);
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
                key_i = key_i -1;
                for (var i=0;i<selectCase.length;i++){
                    if(key_i===selectCase[i])
                        selectCase[i] = selectCase[i]-1;
                    else if((key_i-1)===selectCase[i])
                        selectCase[i] = selectCase[i]+1;
                }
            }

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
            if(selectCase.length!==0){
                key_i = key_i -1;
                for (var i=0;i<selectCase.length;i++){
                    if(key_i===selectCase[i])
                        selectCase[i] = selectCase[i]+1;
                    else if((key_i+1)===selectCase[i])
                        selectCase[i] = selectCase[i]-1;
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
        const { caseData,caseDir, selectedRowKeys } = this.state;
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
                                        rules: [{
                                            required: true, message: '请输入app地址!',
                                        },{
                                            max:50,message: '最多允许输入100个字符!',
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
                                        rules: [{
                                            required: true, message: '请输入uuid!',
                                        },{
                                            max:50,message: '最多允许输入50个字符!',
                                        }],
                                    })(
                                        <Input placeholder="请输入设备名称"/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="uuis（ios）"
                                >
                                    {getFieldDecorator('deviceUUID', {
                                        rules: [{
                                            max:50,message: '最多允许输入50个字符!',
                                        }],
                                    })(
                                        <Input placeholder="请输入uuid"/>
                                    )}

                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="选择用例目录"
                                >
                                    {getFieldDecorator('directoryId', {
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
