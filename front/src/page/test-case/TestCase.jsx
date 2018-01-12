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
            dataIndex: 'stepNo',
            key: 'stepNo',
            width: 50
        }, {
            title: '页面',
            dataIndex: 'page',
            key: 'page',
            render: (text, record) => (
                <Select  size={"small"} style={{ width: 110 }} onChange={e => this.onPageChange(record.key,e)}>
                    {this.state.pageOptions}
                </Select>
            ),
            width: 120
        }, {
            title: '操作对象',
            dataIndex: 'element',
            key: 'element',
            render: (text, record) => (
                <Select size={"small"} value={this.state.stepElement[parseInt(record.key)-1].elementId} style={{ width: 110 }}  onChange={e =>this.onElementChange(record.key,e)}>
                    {this.state.stepElement[parseInt(record.key)-1].elementOptions}
                </Select>
            ),
            width: 120
        }, {
            title: '步骤描述',
            dataIndex: 'step',
            key: 'step',
            render: (text, record) => (
                <div>
                    <Select size={"small"}  style={{ width: 110 }} onChange={e =>this.onAction1Change(record.key,e)}>
                        {this.state.action1Option}
                    </Select>
                    {
                        (this.state.stepAction[parseInt(record.key)-1].isAction2 === true && this.state.stepAction[parseInt(record.key)-1].action2Type === '1') ?
                            <Select size={"small"} style={{width: 110,marginLeft:15}}
                                    onChange={e => this.onAction2Change(record.key, e)}>
                                {this.state.stepAction[parseInt(record.key)-1].action2}
                            </Select> : null
                    }
                    {
                        (this.state.stepAction[parseInt(record.key)-1].isAction2 === true && this.state.stepAction[parseInt(record.key)-1].action2Type === '2')?
                            <input onBlur={e => this.onAction2Input(record.key, e)} style={{width: 110,marginLeft:15}}/>: null
                    }
                    {
                        (this.state.stepAction[parseInt(record.key)-1].isAction3 === true && this.state.stepAction[parseInt(record.key)-1].action3Type === '1') ?
                            <Select size={"small"} style={{width: 110,marginLeft:15}}
                                    onChange={e => this.onAction3Change(record.key, e)}>
                                {this.state.stepAction[parseInt(record.key)-1].action3}
                            </Select> : null
                    }
                    {
                        (this.state.stepAction[parseInt(record.key)-1].isAction3 === true && this.state.stepAction[parseInt(record.key)-1].action3Type === '2')?
                            <input onBlur={e => this.onAction3Input(record.key, e)} style={{width: 110,marginLeft:15}}/>: null
                    }
                </div>

            ),
            width: 400
        }, {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: 50
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
        }];
        this.state = {
            setpData: [{
                key:"1",
                stepNo:"1",
            }],// 记录步骤数据
            pageOptions: [], //记录页面下拉列表数据
            // 记录每行操作对象（页面及元素）内容
            stepElement:[{
                elementOptions:'',
                pageId:'',
                elementId:'',
            }],
            action1Option:'',//记录1级行为下拉列表数据
            // 需要记录下每行的用例步骤数据与控件展示状态
            stepAction:[{
                action1:'',
                action2:'',
                action3:'',
                isAction1: false,
                isAction2: false,
                isAction3: false,
                action1Type: '',
                action2Type: '',
                action3Type: '',
            }],
            // 以下是存的数据
            postCaseSteps: [{
                parentId: '',
                actionId: '',
                subtext: '',
                stepNo: '',
                pageId: '',
                elementId: '',
            }],
            directoryId:'',//记录用例所属目录id
            platform:'',
        };
    }

    componentDidMount() {
        // 初始化平台信息
        this.initPlatform();
        //初始化page下拉列表
        this.initPageSelect();
        // 初始化步骤action下拉列表
        this.initAction1();
    }

    // 获取步骤描述中的一级（parentId=0）操作行为数据
    initAction1() {
        promiseAjax.get(`/action/findByParentId?parentId=0`).then((rsp) => {
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
                const data = actionSelect.map(action => <Option key={action.id}>{action.actionName}</Option>);
                this.setState({
                    action1Option: data
                });
            } else {
                this.setState({
                    action1Option: []
                });
            }
        });
    }

    // 根据选中的操作行为展示后续控件
    onAction1Change(key, id) {
        key = parseInt(key);
        // 保存选中
        const postCaseSteps = this.state.postCaseSteps;
        if (postCaseSteps.length <= key) {
            const caseStep = {
                actionId: id,
            }
            postCaseSteps.push(caseStep);
        } else {
            postCaseSteps[key].actionId = id;
        }
        this.setState({
            postCaseSteps,
        })
        // 获取二级行为操作数据
        promiseAjax.get(`/action/findByParentId?parentId=${id}`).then((rsp) => {
            if (rsp != null && rsp.length > 0) {

                // 设置二级行为控件可见
                var stepAction = this.state.stepAction;
                stepAction[key-1].isAction2 = true;

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
                    stepAction[key-1].action2Type='1'
                    this.setState({
                        action2: data,
                        action2Type,
                    });
                } else {
                    this.setState({
                        isAction2: true,
                        action2Type,
                    });
                }

            } else {
                this.setState({
                    isAction2: false,
                    action2: [],
                });
            }
        });
    }

    // 根据子操作行为展示后续控件
    onAction2Change(key, id) {
        // 保存选中
        const postCaseSteps = this.state.postCaseSteps;
        if (postCaseSteps.length <= key) {
            const caseStep = {
                actionId: id,
            }
            postCaseSteps.push(caseStep);
        } else {
            postCaseSteps[key].actionId = `${postCaseSteps[key].actionId},${id}`;
        }
        this.setState({
            postCaseSteps,
        })
        promiseAjax.get(`/action/findByParentId?parentId=${id}`).then((rsp) => {
            if (rsp != null && rsp.length > 0) {
                var actionSelect = [];
                var action3Type = '1';
                var data;
                for (var i = 0; i < rsp.length; i++) {
                    console.log('rsp[i].category=====::', rsp[i].category);
                    if (rsp[i].category === '2') {
                        console.log('lalalalalal');
                        action3Type = '2';
                    }
                    actionSelect.push(
                        {
                            id : rsp[i].id.toString(),
                            actionName : rsp[i].actionName,
                            category: rsp[i].category,
                        }
                    )
                }
                if (action3Type === '1') {
                    data = actionSelect.map(action => <Option key={action.id}>{action.actionName}</Option>);
                    this.setState({
                        isAction3: true,
                        action3: data,
                        action3Type,
                    });
                } else {
                    this.setState({
                        isAction3: true,
                        action3Type,
                    });
                }

            } else {
                this.setState({
                    isAction3: false,
                    action3: [],
                });
            }
        });
    }

    // 根据3级操作展示后续控件
    onAction3Change(key, id) {
        // 保存选中
        const postCaseSteps = this.state.postCaseSteps;
        if (postCaseSteps.length <= key) {
            const caseStep = {
                actionId: id,
            }
            postCaseSteps.push(caseStep);
        } else {
            postCaseSteps[key].actionId = `${postCaseSteps[key].actionId},${id}`;
        }
        this.setState({
            postCaseSteps,
        })
    }

    onAction2Input(key, value) {
        // 保存选中
        const postCaseSteps = this.state.postCaseSteps;
        if (postCaseSteps.length <= key) {
            const caseStep = {
                subtext: value,
            }
            postCaseSteps.push(caseStep);
        } else {
            postCaseSteps[key].subtext = value;
        }
        this.setState({
            postCaseSteps,
        })
    }

    onAction3Input(key, value) {
        // 保存选中
        const postCaseSteps = this.state.postCaseSteps;
        if (postCaseSteps.length <= key) {
            const caseStep = {
                subtext: value,
            }
            postCaseSteps.push(caseStep);
        } else {
            postCaseSteps[key].subtext = value;
        }
        this.setState({
            postCaseSteps,
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


    // 根据选择不同的页面初始化元素下拉列表数值--这里的元素只展示有元素名称的元素
    onPageChange(key,value){

        // 所选页面变更时，不管是不是能取到元素列表信息，都置空元素列表的展示
        const elementList = this.state.elementList;
        elementList[parseInt(key)-1] = '';
        console.log("onPageChange-elementList:",elementList);
        this.setState({
            elementList:elementList,
        });

        // 保存选中
        const postCaseSteps = this.state.postCaseSteps;
        const elementOptionsList = this.state.elementOptionsList;
        if (postCaseSteps.length <= key) {
            const caseStep = {
                pageId: value,
            }
            postCaseSteps.push(caseStep);
        } else {
            postCaseSteps[key].pageId = value;
        }
        this.setState({
            postCaseSteps,
        })
        promiseAjax.get(`/element/elementforpage?pageId=${value}`).then((rsp) => {
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
                elementOptionsList[parseInt(key)-1] = data;
                this.setState({
                    elementOptionsList:elementOptionsList,
                });
            } else {
                elementOptionsList[parseInt(key)-1] = [];
                this.setState({
                    elementOptionsList: elementOptionsList,
                });
            }
        });
    }

    onElementChange (key,value) {
        // 保存选中
        const postCaseSteps = this.state.postCaseSteps;
        const elementList = this.state.elementList;
        if (postCaseSteps.length <= key) {
            const caseStep = {
                elementId: value,
            }
            postCaseSteps.push(caseStep);
        } else {
            postCaseSteps[key].elementId = value;
        }
        elementList[parseInt(key)-1] = value;
        this.setState({
            postCaseSteps:postCaseSteps,
            elementList:elementList,
        });
    }

    onDelete(key, e) {
        e.preventDefault();
        const setpData = this.state.setpData.filter(item => item.key !== key);
        this.setState({ setpData });
    }

    onAdd(key) {
        const data = this.state.setpData;
        var key_i = parseInt(key);
        // 在所选行下方插入一行数据
        var stepNo = key_i + 1;
        var el = {
            stepNo: stepNo.toString(),
            key: stepNo.toString(),
        }
        data.splice(key_i, 0, el);
        // 新数据后的所有数据序号+1
        for (var i=0;i<data.length;i++) {
            if (i>key_i) {
                data[i].stepNo = (parseInt(data[i].stepNo) + 1).toString();
                data[i].key = data[i].stepNo;
            }
        }
        this.setState({
            setpData:data,
        });
    }



    /**
     * 新建测试用例与测试步骤
     */
    handleSubmit = (e) => {
        e.preventDefault();
        console.log('====this.state.postCaseSteps====', this.state.postCaseSteps);
        const form = this.props.form;
        var platform = this.state.platform;
        var directoryId = this.state.directoryId;

        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.platform = platform;
                values.directoryId = directoryId.toString();
                console.log("handleSubmit-values:",values);
                //ajax post请求  url 路径
                promiseAjax.post('/testcase/add', values).then(data => {
                    if (null != data) {
                        //测试用例保存成功后，保存测试步骤数据
                        this.props.history.goBack();
                    }
                });
            }
        });

    }
    render() {
        const platform = this.props.location.platform;
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
                <Sider width={260} style={{background: "#F0F2F5"}}>
                    <div style={{background: "#fff", padding: 10, minHeight: 960}}>
                        <Directory platform={platform}/>
                    </div>
                </Sider>
                <Content style={{padding: "0px 0px 0px 20px"}}>
                    <div style={{background: "#fff", padding: 50, minHeight: 960}}>
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem
                                {...formItemLayoutCaseTile}
                                label="用例标题"
                            >
                                {getFieldDecorator('caseTitle', {
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
                                    data={this.state.setpData}
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


