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
const provinceData = ['访客页', '登录页'];
const cityData ={
    访客页: ['登录按钮', '注册按钮', 'qq登录入口'],
    登录页: ['账号文本框', '密码文本框', '登录按钮'],
};

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
                <Select size={"small"} style={{ width: 110 }} onChange={e => this.onProvinceChange(record.key,e)}>
                    {this.state.provinceOptions}
                </Select>
            ),
            width: 120
        }, {
            title: '操作对象',
            dataIndex: 'element',
            key: 'element',
            render: (text, record) => (
                <Select size={"small"}  style={{ width: 110 }} onChange={e =>this.onSecondCityChange(record.key,e)}>
                    {this.state.cityOptions}
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
            data: [{
                key: '1',
                stepNo: '1',
                status: '通过',
            }],
            // secondCity: cityData[provinceData[0]][0],
            provinceOptions: [], // 页面下拉列表数据
            cityOptions: [],   // 元素下拉列表数据
            //citiesList:[cityData[provinceData[0]]],  // 存储每一行的元素下拉列表数据
            // secondCityList:[cityData[provinceData[0]][0]],  // 存储每一行的默认元素下拉列表数据
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
            teardownCaseId: ''

        };
    }

    componentDidMount() {
        // 页面渲染完成，进行一次查询
        this.initPlatform();
        this.initPageOptions();
        this.initElementOptions(provinceData[0]);
        //初始化平台信息

        //初始化page下拉列表
        this.initPageSelect();
        // 初始化步骤action下拉列表
        this.initAction1();

    }

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
                const data = actionSelect.map(province => <Option key={province.id}>{province.actionName}</Option>);
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
                    data = actionSelect.map(province => <Option key={province.id}>{province.actionName}</Option>);
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
                    data = actionSelect.map(province => <Option key={province.id}>{province.actionName}</Option>);
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
    initPageSelect() {
        // const platform = this.props.location.platform;
        const platform = 'android';
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
                const data = pageSelect.map(province => <Option key={province.id}>{province.pageName}</Option>);
                this.setState({
                    provinceOptions: data
                });
            }
        });

    }

    initPlatform() {
        // 获取平台信息
        var platform = this.props.location.platform;
        this.setState({
            platform: platform,
        });
    }


    // 选择页面发生变化
    onProvinceChange(key,value){
        const platform = 'android';
        // 保存选中
        const postCaseSteps = this.state.postCaseSteps;
        console.log('====postCaseSteps====:', postCaseSteps);
        console.log('====key====:', key);
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
        promiseAjax.get(`/element/search?platform=${platform}&pageId=${value}`).then((rsp) => {
            if (rsp != null && rsp.length > 0) {
                var pageSelect = [];
                for (var i = 0; i < rsp.length; i++) {
                    pageSelect.push(
                        {
                            id : rsp[i].id.toString(),
                            elementName : rsp[i].elementName,
                        }
                    )
                }
                const data = pageSelect.map(province => <Option key={province.id}>{province.elementName}</Option>);
                this.setState({
                    cityOptions: data
                });
            } else {
                this.setState({
                    cityOptions: []
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

    onSecondCityChange (key,value) {
        // 保存选中
        const postCaseSteps = this.state.postCaseSteps;
        if (postCaseSteps.length <= key) {
            const caseStep = {
                elementId: value,
            }
            postCaseSteps.push(caseStep);
        } else {
            postCaseSteps[key].elementId = value;
        }
        this.setState({
            postCaseSteps,
        })
        // var key_i =  parseInt(key);
        // var secondCityList = [...this.state.secondCityList];
        // secondCityList[key_i-1] = value;
        // this.setState({
        //     secondCity: value,
        //     secondCityList : secondCityList,
        // });
    }
    initElementOptions (value) {
        const cityOptions = cityData[value].map(city => <Option key={city}>{city}</Option>);
        this.setState({
            cityOptions : cityOptions,
        });
    }
    // 初始化页面
    initPageOptions(key) {
        const platform = this.props.location.platform;
        var datalist = [];
        //ajax get请求  url 路径
        promiseAjax.get(`/page/list?platform=${platform}`).then(data => {
            if (data && data.length) {
                for (var i = 0;i<data.length;i++) {
                    datalist.push(
                        {
                            key : data[i].id.toString(),
                            title : data[i].pageName,
                        }
                    )
                }

                // 将数据存入state  渲染页面
                this.setState({
                    data: datalist,
                });
            }
        });


    }

    onDelete(key, e) {
        e.preventDefault();
        const data = this.state.data.filter(item => item.key !== key);
        this.setState({ data });
    }

    onAdd(key, e) {

        const data = [...this.state.data];
        //const citiesList = [...this.state.data];
        const secondCityList = [...this.state.data];
        //citiesList.push(cityData[provinceData[0]]);
        secondCityList.push(cityData[provinceData[0]][0]);
        this.initElementOptions(provinceData[0]);
        var key_i = parseInt(key);
        var stepNo = key_i + 1;
        var el = {
            stepNo: stepNo.toString(),
            key: stepNo.toString(),
        }

        data.splice(key_i, 0, el);
        for (var i=0;i<data.length;i++)
        {
            if (i>key_i)
            {
                data[i].stepNo = (parseInt(data[i].stepNo) + 1).toString();
                data[i].key = data[i].stepNo;

            }
        }
        this.setState({ data });
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
                                    data={this.state.data}
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


