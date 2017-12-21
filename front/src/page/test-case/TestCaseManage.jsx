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
        data : [{
            key: '1',
            caseNo: '1',
            caseTile: '测试用例标题1',
            caseStatus: '通过',
        }, {
            key: '2',
            caseNo: '2',
            caseTile: '测试用例标题2，测试用例标题2',
            caseStatus: '失败',
        }],
    };
    columns = [{
        title: '编号',
        dataIndex: 'caseNo',
    }, {
        title: '用例标题',
        dataIndex: 'caseTile',
        render: (text, record) => (
            <a href="#" onClick={() => this.handleEdit(record.key)}><Link to={"addtestcase"}>{text}</Link></a>
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
     * 查询，获取元素列表信息
     */
    search = (dirId) => {
        //ajax get请求  url 路径
        var platform = this.getPlatform();
        this.setState({
            platform: platform,
        })
        var available = this.state.available;
        var elementId = this.state.elementId;
        var elementText = this.state.elementText;

        var urlPath = `/element/search?platform=${platform}&available=${available}`;
        if (elementId!=='')
            urlPath = urlPath + `&elementId=${elementId}`;
        if (elementText!=='')
            urlPath = urlPath + `&elementText=${elementText}`;
        if (null !== dirId) {
            urlPath = urlPath + `&pageId=${dirId}`;
        }
        promiseAjax.get(urlPath).then(data => {
            console.log('data: ', data);
            if (data) {
                //添加元素的顺序编号，在前端展示
                for(var i=0;i<data.length;i++)
                    data[i]["elementNo"] = (i+1).toString();
                // 将数据存入state  渲染页面
                this.setState({
                    elements: data,
                });
            }
        });
    }





    /**
     *
     * @param id
     */
    handleEdit = (id) => {
        const editPath = {
            pathname: '/addtestcase',
            query: 'edit',
            id,
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

    render() {
        const platform = this.getPlatform();
        return(
            <Layout>
                <Sider width={260} style={{ background: "#F0F2F5" }}>
                    <div style={{ background: "#fff", padding: 10, minHeight: 960 }}>
                        <Directory platform={platform} />
                    </div>
                </Sider>
                <Content style={{ padding: " 0px 0px 0px 20px" }}>
                    <div style={{ background: "#fff", padding: 50, minHeight: 960 }}>
                        <div className="gutter-example" style={{ padding: " 0px 0px 30px 0px" }}>
                            <div style={{ padding: " 0px 0px 45px 0px" }}>
                                <Row gutter={16} align="middle" >
                                    <Col className="gutter-row" span={2}>
                                        <div className="gutter-box" >状态：</div>
                                    </Col>
                                    <Col className="gutter-row" span={4}>
                                        <DropdownList />
                                    </Col>
                                    <Col className="gutter-row" span={4}>
                                        <Button type="primary">查找</Button>
                                    </Col>
                                </Row>
                            </div>
                            <div style={{ padding: " 0px 0px 15px 0px" }}>
                                <Row gutter={16} align="middle" >
                                    <Col className="gutter-row" span={3}>
                                        <Button type="primary"><Link to={"addtestcase"}>+ 新建</Link></Button>
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

