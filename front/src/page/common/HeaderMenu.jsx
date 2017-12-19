import React from "react";
import "antd/dist/antd.css";
import {Link} from "react-router-dom";
import { version, Layout, Menu, Breadcrumb, Divider,Input,Row, Col ,Table, Icon,Dropdown, Button,message} from "antd";
import {promiseAjax} from '../common/an';
import { Router,Route} from 'react-router';

const {Header} = Layout;


export default class HeaderMenu extends React.Component {

    render(){
        return (
            <Header>
                <Row>
                    <Col span={4}>
                        <div style={{color: "#F0F2F5", height: "45px", lineHeight: "45px", fontSize: "20px"}}>
                            自动化测试平台
                        </div>
                    </Col>
                    <Col span={20}>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={["0"]}
                        >
                            <Menu.SubMenu key="1" title="测试计划">
                                <Menu.Item key="1.1" ><Link to={"/testplane?platform=android&category=1"}>android自动化测试计划</Link></Menu.Item>
                                <Menu.Item key="1.2"><Link to={"/testplane?platform=ios&category=1"}>ios自动化测试计划</Link></Menu.Item>
                                <Menu.Item key="1.3"><Link to={"/testplane?category=2"}>性能基准测试计划</Link></Menu.Item>
                            </Menu.SubMenu>
                            <Menu.SubMenu key="2" title="用例管理">
                                <Menu.Item key="2.1"><Link to={"/testcasemanage?platform=android&category=1"}>android自动化用例管理</Link></Menu.Item>
                                <Menu.Item key="2.2"><Link to={"/testcasemanage?platform=ios&category=1"}>ios自动化用例管理</Link></Menu.Item>
                                <Menu.Item key="2.3"><Link to={"/testcasemanage?category=2"}>性能基准测试用例管理</Link></Menu.Item>
                            </Menu.SubMenu>
                            <Menu.SubMenu key="3" title="测试报告">
                                <Menu.Item key="3.1">android自动化测试报告</Menu.Item>
                                <Menu.Item key="3.2">ios自动化测试报告</Menu.Item>
                                <Menu.Item key="3.3">性能基准测试结果报告</Menu.Item>
                            </Menu.SubMenu>
                            <Menu.SubMenu key="4" title="页面元素管理">
                                <Menu.Item key="4.1"><Link to={"/elementlist?platform=android"}>android页面元素管理</Link></Menu.Item>
                                <Menu.Item key="4.2"><Link to={"/elementlist?platform=ios"}>ios页面元素管理</Link></Menu.Item>
                            </Menu.SubMenu>
                        </Menu>
                    </Col>
                </Row>
            </Header>
        );
    }
};

