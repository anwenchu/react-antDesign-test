import React from "react";
import { version, Layout, Menu, Select, Divider,Input,Row, Col ,Table, Icon,Form, Button,message} from "antd";
import "antd/dist/antd.css";
import Directory from './Directory';
import TableRC from 'rc-table';
import Animate from 'rc-animate';
import 'rc-table/assets/index.css';
import 'rc-table/assets/animation.css';
import {promiseAjax} from "../common/an";

/*
*页面名称：新建、保存用例页面
* 入口：点击测试管理页面中的新建进入
*/


const {  Content,  Sider } = Layout;
const AnimateBody = (props) =>
    <Animate transitionName="move" component="tbody" {...props} />;
const Option = Select.Option;
const FormItem = Form.Item;

@Form.create()
export default class TestCase extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: '编号',
            dataIndex: 'key',
            key: 'key',
            width: 50
        }, {
            title: '页面',
            dataIndex: 'page',
            key: 'page',
            render: (text, record) => (
                <Select  size={"small"} value={record.pageId} style={{ width: 140 }} onChange={e => this.onPageChange(record.key,e)}>
                    {this.state.pageOptions}
                </Select>
            ),
            width: 150
        }, {
            title: '操作对象',
            dataIndex: 'element',
            key: 'element',
            render: (text, record) => (
                <Select size={"small"} value={record.element.elementId} style={{ width: 140 }}  onChange={e =>this.onElementChange(record.key,e)}>
                    {record.element.elementOptions}
                </Select>
            ),
            width: 150
        }, {
            title: '步骤描述',
            dataIndex: 'step',
            key: 'step',
            render: (text, record) => (
                <div>
                    <Select size={"small"}  value={record.step.action1default} style={{ width: 110 }} onChange={e =>this.onAction1Change(record.key,e)}>
                        {this.state.action1Option}
                    </Select>
                    {
                        (record.step.isAction2 === '1' && record.step.action2Type === '1') ?
                            <Select size={"small"} style={{width: 110,marginLeft:15}} value={record.step.action2default}
                                    onChange={e => this.onAction2Change(record.key, e)}>
                                {record.step.action2}
                            </Select> : null
                    }
                    {
                        (record.step.isAction2 === '1' && record.step.action2Type === '2')?
                            <input size={"small"} value={record.step.action2default} onChange={e => this.onAction2Input(record.key,e)} style={{width: 110,marginLeft:15}}/>: null
                    }
                    {
                        (record.step.isAction3 === '1' && record.step.action3Type === '1') ?
                            <Select size={"small"} style={{width: 110,marginLeft:15}} value={record.step.action2default}
                                    onChange={e => this.onAction3Change(record.key, e)}>
                                {record.step.action3}
                            </Select> : null
                    }
                    {
                        (record.step.isAction3 === '1' && record.step.action3Type === '2')?
                            <input size={"small"} value={record.step.action3default} onChange={e => this.onAction3Input(record.key,e)} style={{width: 110,marginLeft:15}}/>: null
                    }
                </div>

            ),
            width: 500
        }, {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: 80
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a onClick={e => this.onAdd(record.key,e)} href="#">添加</a>
                    <Divider type="vertical" />
                    <a onClick={e => this.onDelete(record.key, e)} href="#">删除</a>
                </span>
            ),
            width: 80,
        }];
        this.state = {
            pageOptions: [], //记录页面下拉列表数据
            action1Option:'',//记录1级行为下拉列表数据
            // 每行步骤数据
            caseSteps: [{
                key:"1",
                stepNo:"1",
                pageId:'',  // 每行页面id
                step:{
                    action1default:'',// 记录某行一级选中的行为
                    action2default:'',// 记录某行二级选中的行为
                    action3default:'',// 记录某行三级选中的行为
                    action2:'',   // 记录某行二级行为
                    action3:'',   // 记录某行三级行为
                    isAction2: '0', // 设置某行二级行为是否展示
                    isAction3: '0', // 设置某行三级行为是否展示
                    action2Type: '', // 设置某行二级行为控件类型
                    action3Type: '', // 设置某行二级行为控件类型

                },
                element:{
                    elementId:'',
                    elementOptions:'',
                },
            }],
            directoryId:'',//记录用例所属目录id
            platform:'',
            testCase:{
                caseTitle: "",
                id: "",
                setupCaseId:"",
                teardownCaseId:"",
            },
            isEdit : '0',//1:编辑状态，0：新增状态
        };
    }

    componentDidMount() {
        // 初始化平台信息
        this.initPlatform();
        // 初始化page下拉列表
        this.initPageSelect();
        // 初始化步骤action下拉列表
        this.initAction1();
        // 初始化用例信息（编辑状态）
        this.initTestCase();
    }
    initTestCase(){
        // 检查是否为编辑状态,如果是编辑状态则初始化用例数据
        if (this.props.history.location.isEdit==='1') {
            // 初始化用例信息
            var caseInfo = this.props.history.location.caseInfo;
            const testCase = this.state.testCase;
            testCase.id = caseInfo.id;
            testCase.caseTitle = caseInfo.caseTitle;
            testCase.setupCaseId = caseInfo.setupCaseId;
            testCase.teardownCaseId = caseInfo.teardownCaseId;
            this.setState({
                testCase : testCase,
                directoryId : caseInfo.directoryId,
                isEdit:'1',
            });
            // 初始化用例步骤信息
            var caseSteps = [];
            console.log('testcase：',testCase);
            promiseAjax.get(`/casestep/search?caseId=${testCase.id}`).then((rsp) => {
                if (rsp != null && rsp.length > 0) {
                    for (var i = 0; i < rsp.length; i++) {

                        caseSteps.push(
                            {
                                stepNo : rsp[i].stepNo,
                                key : (i+1).toString(),
                                pageId : rsp[i].pageId,  // 每行页面id
                                step:{
                                    action1default : rsp[i].action1Default,// 记录某行一级选中的行为
                                    action2default : rsp[i].action2Default,// 记录某行二级选中的行为
                                    action3default : rsp[i].action3Default,// 记录某行三级选中的行为
                                    action2 : '',   // 记录某行二级行为
                                    action3 : '',   // 记录某行三级行为
                                    isAction2 : rsp[i].isAction2, // 设置某行二级行为是否展示
                                    isAction3 : rsp[i].isAction3, // 设置某行三级行为是否展示
                                    action2Type : rsp[i].action2Type, // 设置某行二级行为控件类型
                                    action3Type : rsp[i].action3Type, // 设置某行二级行为控件类型
                                    id : rsp[i].id,
                                },
                                element:{
                                    elementId:rsp[i].elementId,
                                    elementOptions:'',
                                },
                            }
                        );

                        // 如果action2是下拉列表
                        const step = rsp[i];
                        const m = i;
                        if(step.action2Type==='1') {

                            promiseAjax.get(`/action/findByParentId?parentId=${rsp[i].action1Default}`).then((rsp) => {
                                console.log("aciton2是下拉列表：",m)
                                if (rsp != null && rsp.length > 0) {
                                    var actionSelect = [];
                                    for (var k = 0; k < rsp.length; k++) {
                                        actionSelect.push(
                                            {
                                                id: rsp[k].id.toString(),
                                                actionName: rsp[k].actionName,
                                            }
                                        )
                                    }
                                    const data = actionSelect.map(action => <Option key={action.id}>{action.actionName}</Option>);
                                    caseSteps[m].step.action2 = data;
                                }
                                // 如果action3是下拉列表
                                if (step.action3Type === '1') {
                                    promiseAjax.get(`/action/findByParentId?parentId=${step.action1Default}`).then((rsp) => {
                                        if (rsp != null && rsp.length > 0) {
                                            var actionSelect = [];
                                            for (var k = 0; k < rsp.length; k++) {
                                                actionSelect.push(
                                                    {
                                                        id: rsp[k].id.toString(),
                                                        actionName: rsp[k].actionName,
                                                    }
                                                )
                                            }
                                            const data = actionSelect.map(action => <Option key={action.id}>{action.actionName}</Option>);
                                            caseSteps[m].step.action2 = data;
                                            this.setState({
                                                caseSteps: caseSteps
                                            });
                                        }
                                    });

                                } else {
                                    this.setState({
                                        caseSteps: caseSteps
                                    });
                                }
                            });
                        }else{
                            this.setState({
                                caseSteps: caseSteps
                            });
                        }
                        // 获取每行元素id
                        this.initElementList(m+1,step.pageId);

                    }
                }
            });

        }else {
            //如果不是编辑状态，清空用例和用例步骤数据
            //this.setState({
            //    testCase: '',
            //    caseSteps:'',
            //});
        }


    }

    // 获取步骤描述中的一级（parentId=0）操作行为数据
    initAction1() {

        promiseAjax.get(`/action/findByParentId?parentId=0`).then((rsp) => {
            var actionOption = '';
            if (rsp != null && rsp.length > 0) {
                var actionSelect = [];
                for (var i = 0; i < rsp.length; i++) {
                    actionSelect.push(
                        {
                            id : rsp[i].id.toString(),
                            actionName : rsp[i].actionName,
                        }
                    )
                }
                actionOption = actionSelect.map(action => <Option key={action.id}>{action.actionName}</Option>);
                this.setState({
                    action1Option: actionOption
                });
            }
        });

    }

    // 根据选中的操作行为展示后续控件
    onAction1Change(key, id) {
        key = parseInt(key);
        // 保存数据
        const caseSteps = this.state.caseSteps;
        caseSteps[key-1].step.action1default = id;
        caseSteps[key-1].step.action2default = '';
        caseSteps[key-1].step.action3default = '';
        // 获取二级行为操作数据

        promiseAjax.get(`/action/findByParentId?parentId=${id}`).then((rsp) => {
            // 如果有数据返回
            if (rsp != null && rsp.length > 0) {
                // 如果action2的类别是下拉列表，则生成下拉列表数据
                if (rsp[0].category === '1') {
                    var actionSelect = [];
                    for (var i = 0; i < rsp.length; i++) {
                        actionSelect.push(
                            {
                                id : rsp[i].id.toString(),
                                actionName : rsp[i].actionName,
                            }
                        )
                    }
                    var data = actionSelect.map(action => <Option key={action.id}>{action.actionName}</Option>);
                    caseSteps[key-1].step.action2Type = '1';
                    caseSteps[key-1].step.action2 = data;
                    caseSteps[key-1].step.isAction2 = '1';
                } else {
                    caseSteps[key-1].step.action2Type = '2';
                    caseSteps[key-1].step.isAction2 = '1';
                }

            } else {
                // 如果没有数据返回，相关数据重置
                caseSteps[key-1].step.action2Type = '';
                caseSteps[key-1].step.isAction2 = '0';
                caseSteps[key-1].step.action2 = [];
            }
            this.setState({
                caseSteps: caseSteps,
            });
        });
    }

    // 根据子操作行为展示后续控件
    onAction2Change(key, id) {
        key = parseInt(key);
        // 保存数据
        const caseSteps = this.state.caseSteps;
        caseSteps[key-1].step.action2default = id;
        caseSteps[key-1].step.action3default = '';
        promiseAjax.get(`/action/findByParentId?parentId=${id}`).then((rsp) => {
            // 如果有数据返回
            if (rsp != null && rsp.length > 0) {
                // 如果action3的类别是下拉列表，则生成下拉列表数据
                if (rsp[0].category === '1') {
                    var actionSelect = [];
                    for (var i = 0; i < rsp.length; i++) {
                        actionSelect.push(
                            {
                                id: rsp[i].id.toString(),
                                actionName: rsp[i].actionName,
                            }
                        )
                    }
                    var data = actionSelect.map(action => <Option key={action.id}>{action.actionName}</Option>);
                    caseSteps[key-1].step.action3Type = '1';
                    caseSteps[key-1].step.action3 = data;
                    caseSteps[key-1].step.isAction3 = '1';
                }  else {
                    caseSteps[key-1].step.action3Type = '2';
                    caseSteps[key-1].step.isAction3 = '1';
            }

            } else {
                // 如果没有数据返回，相关数据重置
                caseSteps[key-1].step.action3Type = '';
                caseSteps[key-1].step.isAction3 = '0';
                caseSteps[key-1].step.action3 = [];
            }
            this.setState({
                caseSteps: caseSteps,
            });
        });
    }

    // 根据3级操作展示后续控件
    onAction3Change(key, id) {
        key = parseInt(key);
        const caseSteps = this.state.caseSteps;
        caseSteps[key-1].step.action3default = id;

        this.setState({
            caseSteps:caseSteps,
        })
    }

    onAction2Input(key, e) {
        // 保存选中
        key = parseInt(key);
        const caseSteps = this.state.caseSteps;
        caseSteps[key-1].step.action2default = e.target.value;
        this.setState({
            caseSteps:caseSteps,
        })
    }

    onAction3Input(key, e) {
        // 保存选中
        key = parseInt(key);
        const caseSteps = this.state.caseSteps;
        caseSteps[key-1].step.action3default = e.target.value;
        this.setState({
            caseSteps:caseSteps,
        })
    }
    // 初始化页面数据下拉列表
    initPageSelect() {
        const platform = this.props.location.platform;
        promiseAjax.get(`/page/list?platform=${platform}`).then((rsp) => {
            if (rsp != null && rsp.length > 0) {
                var pageSelect = [];
                for (var i = 0; i < rsp.length; i++) {
                    pageSelect.push(
                        {
                            id : rsp[i].id.toString(),
                            pageName : rsp[i].pageName,
                        }
                    )
                }
                const data = pageSelect.map(page => <Option key={page.id}>{page.pageName}</Option>);
                this.setState({
                    pageOptions: data
                });
            }
        });

    }
    // 初始化平台和目录id
    initPlatform() {
        // 获取平台信息和目录id
        var platform = this.props.location.platform;
        var directoryId = this.props.location.directoryId;
        this.setState({
            platform: platform,
            directoryId:directoryId,
        });
    }

    // 根据页面信息初始化
    initElementList(key,pageId){
        key = parseInt(key);
        const caseSteps = this.state.caseSteps;
        promiseAjax.get(`/element/elementforpage?pageId=${pageId}`).then((rsp) => {
            if (rsp != null && rsp.length!==0) {
                var elementSelect = [];
                for (var i = 0; i < rsp.length; i++) {
                    elementSelect.push(
                        {
                            id : rsp[i].id.toString(),
                            elementName : rsp[i].elementName,
                        }
                    )
                }
                const data = elementSelect.map(element => <Option key={element.id}>{element.elementName}</Option>);
                caseSteps[key-1].element.elementOptions = data;

                this.setState({
                    caseSteps: caseSteps,
                });
            }

        });
    }


    // 根据选择不同的页面初始化元素下拉列表数值--这里的元素只展示有元素名称的元素
    onPageChange(key,value){

        // 所选页面变更时，不管是不是能取到元素列表信息，都置空元素列表的展示,设置选中的id
        const caseSteps = this.state.caseSteps;
        caseSteps[parseInt(key)-1].element.elementId = '';
        caseSteps[parseInt(key)-1].pageId = value;
        this.setState({
            caseSteps:caseSteps,
        });
        // 页面选择变更后，加载所选页面元素的信息
        this.initElementList(key,value);

    }

    onElementChange (key,value) {
        // 保存选中
        const caseSteps = this.state.caseSteps;
        caseSteps[parseInt(key)-1].element.elementId = value;
        this.setState({
            caseSteps:caseSteps,
        });
    }

    onDelete(key, e) {
        e.preventDefault();
        // 删除列表数据源内容
        const caseSteps = this.state.caseSteps.filter(item => item.key !== key);
        this.setState({
            caseSteps:caseSteps
        });
        console.log("caseSteps:",caseSteps);

    }

    onAdd(key) {
        // 增加列表数据源内容
        const caseSteps = this.state.caseSteps;
        var key_i = parseInt(key);
        // 在所选行下方插入一行数据
        var stepNo = key_i + 1;
        var el = {
            stepNo: stepNo.toString(),
            key: stepNo.toString(),
            pageId:'',  // 每行页面id
            step:{
                action1default:'',// 记录某行一级选中的行为
                action2default:'',// 记录某行二级选中的行为
                action3default:'',// 记录某行三级选中的行为
                action2:'',   // 记录某行二级行为
                action3:'',   // 记录某行三级行为
                isAction2: '0', // 设置某行二级行为是否展示
                isAction3: '0', // 设置某行三级行为是否展示
                action2Type: '', // 设置某行二级行为控件类型
                action3Type: '', // 设置某行二级行为控件类型

            },
            element:{
                elementId:'',
                elementOptions:''
            },
        };
        caseSteps.splice(key_i, 0, el);
        // 新数据后的所有数据序号+1
        for (var i=0;i<caseSteps.length;i++) {
            if (i>key_i) {
                caseSteps[i].stepNo = (parseInt(caseSteps[i].stepNo) + 1).toString();
                caseSteps[i].key = caseSteps[i].stepNo;
            }
        }

        this.setState({
            caseSteps:caseSteps,
        });
    }



    /**
     * 新建测试用例与测试步骤
     */
    handleSubmit = (e) => {
        e.preventDefault();

        const form = this.props.form;
        var platform = this.state.platform;
        var directoryId = this.state.directoryId;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.platform = platform;
                values.directoryId = directoryId.toString();
                console.log("handleSubmit-values:",values);
                var caseStep = [];
                const caseSteps = this.state.caseSteps;
                const isEdit = this.state.isEdit;
                for(var i=0;i<caseSteps.length;i++) {
                    caseStep.push({
                        pageId:caseSteps[i].pageId,
                        stepNo:caseSteps[i].step.stepNo,
                        elementId:caseSteps[i].element.elementId,
                        action1Default:caseSteps[i].step.action1default,
                        action2Default:caseSteps[i].step.action2default,
                        action3Default:caseSteps[i].step.action3default,
                        isAction2:caseSteps[i].step.isAction2,
                        isAction3:caseSteps[i].step.isAction3,
                        action2Type:caseSteps[i].step.action2Type,
                        action3Type:caseSteps[i].step.action3Type,
                    })
                }
                // 如果是编辑状态
                if (isEdit==='1'){
                    const testCase = this.state.testCase;
                    for(var i=0;i<caseSteps.length;i++) {
                        caseStep[i].id = caseSteps[i].step.id;
                        caseStep[i].caseId = testCase.id;
                    }
                    // 保存测试用例
                    values.id = testCase.id;
                    promiseAjax.post('/testcase/add', values).then(data => {
                        if (null != data) {
                            // 保存测试步骤数据
                            promiseAjax.post(`/casestep/add`,caseStep).then(data => {
                                if (null != data) {
                                    this.props.history.goBack();
                                }
                            });

                        }
                    });
                }else{
                    // 添加测试用例
                    promiseAjax.post('/testcase/add', values).then(data => {
                        if (null != data) {
                            //测试用例保存成功后，保存测试步骤数据
                            for(var i=0;i<caseSteps.length;i++) {
                                caseStep[i].caseId = data[0].id;
                            }
                            // 添加测试步骤数据
                            promiseAjax.post(`/casestep/add`,caseStep).then(data => {
                                if (null != data) {
                                    this.props.history.goBack();
                                }
                            });

                        }
                    });
                }

            }
        });


    }
    render() {
        const testCase = this.state.testCase;
        const { getFieldDecorator } = this.props.form;
        const formItemLayoutCaseTile = {
            labelCol: {
                span: 2 ,
            },
            wrapperCol: {
                span: 18 ,
            },
        };
        const formItemLayout = {
            labelCol: {
                span: 2 ,
            },
            wrapperCol: {
                span: 5 ,
            },
        };
        return (
            <Layout>
                <Content style={{padding: "0px 0px 0px 20px"}}>
                    <div style={{background: "#fff", padding: 50, minHeight: 960}}>
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem
                                {...formItemLayoutCaseTile}
                                label="用例标题"
                            >
                                {getFieldDecorator('caseTitle', {
                                    initialValue: testCase == null ? '' : testCase.caseTitle,
                                    rules: [{
                                        required: true, message: '请输入用例标题!',
                                    },{
                                        max:50,message: '最多允许输入50个字符!',
                                    }],

                                })(
                                    <Input  placeholder="请输入用例标题"/>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="前置用例"
                            >
                                {getFieldDecorator('setupCaseId', {
                                    initialValue: testCase == null ? '' : testCase.setupCaseId,
                                    rules: [{
                                        message: '请输入前置用例编号!',
                                    },{
                                        max:50,message: '最多允许输入50个字符!',
                                    }],

                                })(
                                    <Input placeholder="请输入前置用例编号"/>
                                )}
                            </FormItem>
                            <FormItem
                            >
                                <div>用例步骤：</div>
                                <TableRC
                                    columns={this.columns}
                                    data={this.state.caseSteps}
                                    components={{
                                        body: {wrapper: AnimateBody},
                                    }}
                                />
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="后置用例"
                            >
                                {getFieldDecorator('teardownCaseId', {
                                    initialValue: testCase == null ? '' : testCase.teardownCaseId,
                                    rules: [{
                                         message: '请输入后置用例编号!',
                                    },{
                                        max:50,message: '最多允许输入50个字符!',
                                    }],

                                })(
                                    <Input  placeholder="请输入后置用例编号"/>
                                )}
                            </FormItem>
                            <FormItem>
                                <Row gutter={16} align={"middle"} justify={"center"}>
                                    <Col className="gutter-row" span={2} offset={16}>
                                        <Button onClick={()=>{this.props.history.goBack()}}>取消</Button>
                                    </Col>
                                    <Col className="gutter-row" span={2} offset={2}>
                                        <Button type="primary" htmlType="submit">保存</Button>
                                    </Col>
                                </Row>
                            </FormItem>
                        </Form>
                    </div>
                </Content>
            </Layout>
        );
    }
}


