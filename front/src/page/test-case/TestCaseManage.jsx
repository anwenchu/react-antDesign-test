import React from "react";
import { Popconfirm, version, Layout, Menu, Breadcrumb, Divider,Input,Row, Col ,Table, Icon,Dropdown, Button,message} from "antd";
import "antd/dist/antd.css";
import Directory from './Directory';
import DropdownList from '../common/DropdownList';
import {
    Link
} from 'react-router-dom'
import {promiseAjax} from "../common/an";
/*
*页面名称：测试用例管理页面
* 入口：点击顶部导航中的用例管理进入（ios导航点击进入后数据为ios用例数据，android导航点击进入后数据为android用例数据）
*/

const { Content, Sider } = Layout;


export default class TestCaseManage extends React.Component{
    state = {
        data : [],
        platform:'',
        dirId:'',
    };
    columns = [{
        title: '编号',
        dataIndex: 'id',
    }, {
        title: '用例标题',
        dataIndex: 'caseTitle',
        render: (text, record) => (
            <a onClick={() => this.handleEdit(record.key)}>{text}</a>
        )
    }, {
        title: '状态',
        dataIndex: 'caseStatus',
    }, {
        title: '操作',
        dataIndex: 'action',
        render: (text, record) => (
            <span>
                <Popconfirm title="Delete?" onConfirm={e => this.onDelete(record.key, e)}>
                    <a href="#">删除</a>
                </Popconfirm>
                <Divider type="vertical" />
                <a href="#">订阅警报</a>
            </span>
        ),
    }];

    // react 生命周期函数  自己百度
    componentDidMount() {
        // 页面渲染完成，进行一次查询
        this.search()
    }

    getPlatform(){
        var platform;
        if (this.props.location.pathname.indexOf('ios') > 0) {
            platform = 'ios'
        } else {
            platform = 'android'
        }
        return platform;
    }

    /**
     * 查询，获取用例列表信息
     */
    search = (dirId) => {

        var platform = this.getPlatform();
        this.setState({
            platform: platform,
        })
        // 用例列表接口
        var urlPath = `/testcase/search?platform=${platform}`;
        if (dirId !== null &&  dirId !== undefined)
            urlPath = urlPath + `&directoryId=${dirId}`;
        promiseAjax.get(urlPath).then(data => {
            console.log('data: ', data);
            if (data) {
                // 将数据存入state  渲染页面
                this.setState({
                    data: data,
                });
            }
        });
    }





    /**
     *
     * @param id
     */
    handleEdit() {
        const editPath = {
            pathname : '/addtestcase',
            platform : this.getPlatform(),
        }
        this.props.history.push(editPath);
    }

    onDelete(key, e) {
        console.log('Delete', key);
        e.preventDefault();
        const data = this.state.data.filter(item => item.key !== key);
        console.log('Delete', data);
        this.setState({ data });
    }

    /**
     *
     * @param id
     */
    handleClickNew = (key) => {
        const platfrominfo = this.state.platform;
        const editPath = {
            pathname : '/addtestcase',
            platform : platfrominfo,
        }
        this.props.history.push(editPath);
    }


    selectPage = (key) => {
        console.log("caseManage-selectKeys:",key);
        this.search(key);
        this.setState({
            pageId:key,
        })

    }

    render() {
        const platform = this.getPlatform();
        return(
            <Layout>
                <Sider width={260} style={{ background: "#F0F2F5" }}>
                    <div style={{ background: "#fff", padding: 10, minHeight: 960 }}>
                        <Directory platform={platform} selectPage={this.selectPage}/>
                    </div>
                </Sider>
                <Content style={{ padding: " 0px 0px 0px 20px" }}>
                    <div style={{ background: "#fff", padding: 50, minHeight: 960 }}>
                        <div className="gutter-example" style={{ padding: " 0px 0px 30px 0px" }}>
                            <div style={{ padding: " 0px 0px 15px 0px" }}>
                                <Row gutter={16} align="middle" >
                                    <Col className="gutter-row" span={3}>
                                        <Button type="primary" onClick={this.handleClickNew}><Link to={"/addtestcase"}>+ 新建</Link></Button>
                                    </Col>
                                    <Col className="gutter-row" span={3}>
                                        <Button >批量操作</Button>
                                    </Col>
                                    <Col className="gutter-row" span={3}>
                                        <Button type="dashed">...</Button>
                                    </Col>
                                </Row>
                            </div>
                            <div style={{ padding: " 0px 0px 15px 0px" }}>
                                    <Table
                                        dataSource={this.state.data}
                                        columns={this.columns}
                                    />
                            </div>
                        </div>
                    </div>
                </Content>
            </Layout>
        )
    }
}

