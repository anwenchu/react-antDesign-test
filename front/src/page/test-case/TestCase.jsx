import React from "react";
import { version, Layout, Menu, Select, Divider,Input,Row, Col ,Table, Icon,Dropdown, Button,message} from "antd";
import "antd/dist/antd.css";
import Directory from './Directory';
import TableRC from 'rc-table';
import Animate from 'rc-animate';
import 'rc-table/assets/index.css';
import 'rc-table/assets/animation.css';;
import DropdownList from '../common/DropdownList';
import {promiseAjax} from "../common/an";

/*
*页面名称：新建、保存用例页面
* 入口：点击测试管理页面中的新建进入
*/


const { Header, Content, Footer, Sider } = Layout;
const AnimateBody = (props) =>
    <Animate transitionName="move" component="tbody" {...props} />;
const Option = Select.Option;


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
                <Select size={"small"} value={this.state.elementList[parseInt(record.key)-1]} style={{ width: 110 }}  onChange={e =>this.onElementChange(record.key,e)}>
                    {this.state.elementOptionsList[parseInt(record.key)-1]}
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
                        {this.state.action1}
                    </Select>
                    {
                        (this.state.isAction2 == true && this.state.action2Type === '1') ?
                            <Select size={"small"} style={{width: 110,marginLeft:15}}
                                    onChange={e => this.onAction2Change(record.key, e)}>
                                {this.state.action2}
                            </Select> : null
                    }
                    {
                        (this.state.isAction2 == true && this.state.action2Type === '2')?
                            <input onBlur={e => this.onAction2Input(record.key, e)} style={{width: 110,marginLeft:15}}/>: null
                    }
                    {
                        (this.state.isAction3 == true && this.state.action3Type === '1') ?
                            <Select size={"small"} style={{width: 110,marginLeft:15}}
                                    onChange={e => this.onAction3Change(record.key, e)}>
                                {this.state.action3}
                            </Select> : null
                    }
                    {
                        (this.state.isAction3 == true && this.state.action3Type === '2')?
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
                key:"1"
            }],// 记录步骤数据
            pageOptions: [], //记录页面下拉列表数据
            elementOptionsList: [], //记录元素下拉列表数据
            pageList:[], //记录每一行的页面列表数据
            elementList:[],//记录每一行的元素列表数据
            action1: [],//步骤第1列数据
            action2: [],//步骤第2列数据
            action3: [],//步骤第3列数据
            isAction1: false,
            isAction2: false,
            isAction3: false,
            action1Type: '',
            action2Type: '',
            action3Type: '',
            platform:'',
            // 以下是存的数据
            postCaseSteps: [{
                parentId: '',
                actionId: '',
                subtext: '',
                stepNo: '',
                pageId: '',
                elementId: '',
            }],
            caseTitle: '',
            setupCaseId: '',
            teardownCaseId: '',

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

    // 获取步骤描述中的操作行为数据
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
                    action1: data
                });
            } else {
                this.setState({
                    action1: []
                });
            }
        });
    }

    // 根据选中的操作行为展示后续控件
    onAction1Change(key, id) {
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

        promiseAjax.get(`/action/findByParentId?parentId=${id}`).then((rsp) => {
            if (rsp != null && rsp.length > 0) {
                var actionSelect = [];
                var action2Type = '1';
                var data;
                for (var i = 0; i < rsp.length; i++) {
                    if (rsp[i].category === 2) {
                        action2Type = '2';
                    }
                    actionSelect.push(
                        {
                            id : rsp[i].id.toString(),
                            actionName : rsp[i].actionName,
                            category: rsp[i].category,
                        }
                    )
                }
                if (action2Type === '1') {
                    data = actionSelect.map(action => <Option key={action.id}>{action.actionName}</Option>);
                    this.setState({
                        isAction2: true,
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
    // 初始化平台
    initPlatform() {
        // 获取平台信息
        var platform = this.props.location.platform;
        this.setState({
            platform: platform,
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
        console.log('====pageOptions====:', this.state.pageOptions);
        console.log('====key====:', key);
        console.log('====value====:', value);
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


        // var key_i =  parseInt(key);
        // //var citiesList = [...this.state.citiesList];
        // var secondCityList = [...this.state.secondCityList];
        // //citiesList[key_i-1] = cityData[value];
        // secondCityList[key_i-1] = cityData[value][0]
        // this.setState({
        //     cities: cityData[value],
        //     secondCity: cityData[value][0],
        //     //citiesList : citiesList,
        //     secondCityList : secondCityList,
        //
        // });
        // this.initElementOptions(value);

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
        console.log("onElementChange-elementList:",elementList);
        this.setState({
            postCaseSteps:postCaseSteps,
            elementList:elementList,
        })
        // var key_i =  parseInt(key);
        // var secondCityList = [...this.state.secondCityList];
        // secondCityList[key_i-1] = value;
        // this.setState({
        //     secondCity: value,
        //     secondCityList : secondCityList,
        // });
    }

    onDelete(key, e) {
        e.preventDefault();
        const setpData = this.state.setpData.filter(item => item.key !== key);
        this.setState({ setpData });
    }

    onAdd(key, e) {

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
        for (var i=0;i<data.length;i++)
        {
            if (i>key_i)
            {
                data[i].stepNo = (parseInt(data[i].stepNo) + 1).toString();
                data[i].key = data[i].stepNo;

            }
        }

        this.setState({
            setpData:data,
        });
    }

    setTitle(value) {
        console.log('????????', value);
        this.setState({
            caseTitle: value
        });
    }

    SetupCaseId (value){
        this.setState({
            setupCaseId: value
        });
    }

    TeardownCaseId = (value) => {
        this.setState({
            teardownCaseId: value
        });
    }

    submit = () => {
        console.log('====this.state.postCaseSteps====', this.state.postCaseSteps);
        console.log('====this.state.caseTitle====', this.state.caseTitle);
        console.log('====this.state.setupCaseId====', this.state.setupCaseId);
        console.log('====this.state.teardownCaseId====', this.state.teardownCaseId);
    }
    render() {
        const platform = this.props.location.platform;
        return (
            <Layout>
                <Sider width={260} style={{background: "#F0F2F5"}}>
                    <div style={{background: "#fff", padding: 10, minHeight: 960}}>
                        <Directory platform={platform}/>
                    </div>
                </Sider>
                <Content style={{padding: "0px 0px 0px 20px"}}>
                    <div style={{background: "#fff", padding: 50, minHeight: 960}}>
                        <div className="gutter-example" style={{padding: " 0px 0px 30px 0px"}}>
                            <div style={{padding: " 0px 0px 15px 0px"}}>
                                <Row gutter={16} align="middle">
                                    <Col className="gutter-row" span={3}>
                                        <div className="gutter-box">用例标题：</div>
                                    </Col>
                                    <Col className="gutter-row" span={21}>
                                        <div className="gutter-box">
                                            <Input onblur={(e) => this.setTitle(e)}  placeholder="请输入用例标题"/>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <div>
                                <Row gutter={16} align="middle">
                                    <Col className="gutter-row" span={4}>
                                        <div className="gutter-box">前置用例依赖：</div>
                                    </Col>
                                    <Col className="gutter-row" span={6}>
                                        <div className="gutter-box">
                                            <Input onblur={(e) => this.SetupCaseId(e)} placeholder="请输入用例编号"/>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div className="caseStepList">
                            <div style={{margin: 5}}>
                                <TableRC
                                    columns={this.columns}
                                    data={this.state.setpData}
                                    components={{
                                        body: {wrapper: AnimateBody},
                                    }}
                                />
                            </div>
                        </div>
                        <div className="gutter-example">
                            <div style={{padding: " 30px 0px 0px 0px"}}>
                                <Row gutter={16} align="middle">
                                    <Col className="gutter-row" span={4}>
                                        <div className="gutter-box">后置用例依赖：</div>
                                    </Col>
                                    <Col className="gutter-row" span={6}>
                                        <div className="gutter-box">
                                            <Input onblur={(e) => this.TeardownCaseId(e)}  placeholder="请输入用例编号"/>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <div style={{padding: " 30px 0px 0px 0px"}}>
                                <Row gutter={16} align="middle">
                                    <Col className="gutter-row" offset={20} span={2}>
                                        <Button onClick={this.submit} type="primary">保存</Button>
                                    </Col>
                                </Row>

                            </div>
                        </div>
                    </div>
                </Content>
            </Layout>
        );
    }
}


