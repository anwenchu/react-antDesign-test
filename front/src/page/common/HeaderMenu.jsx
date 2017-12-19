import React from "react";
import {Layout, Menu, Row,Col } from "antd";
import "antd/dist/antd.css";
import {Link} from "react-router-dom";
const {Header} = Layout;

const HeaderMenu = () => {
    return (
        <Header>
            <Row >
                <Col span={4}>
                    <div style={{color:"#F0F2F5",height:"45px" ,lineHeight:"45px",fontSize:"20px"}}>
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
                            <Menu.Item key="1.1"><Link to={"/testplanemanage"}>android自动化测试计划</Link></Menu.Item>
                            <Menu.Item key="1.2"><Link to={"/testplanemanage"}>ios自动化测试计划</Link></Menu.Item>
                            <Menu.Item key="1.3"><Link to={"/testplanemanage"}>性能基准测试计划</Link></Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="2" title="用例管理">
                            <Menu.Item key="2.1"><Link to={"/testcasemanage"}>android自动化用例管理</Link></Menu.Item>
                            <Menu.Item key="2.2"><Link to={"/testcasemanage"}>ios自动化用例管理</Link></Menu.Item>
                            <Menu.Item key="2.3"><Link to={"/testcasemanage"}>性能基准测试用例管理</Link></Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="3" title="测试报告">
                            <Menu.Item key="3.1">android自动化测试报告</Menu.Item>
                            <Menu.Item key="3.2">ios自动化测试报告</Menu.Item>
                            <Menu.Item key="3.3">性能基准测试结果报告</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="4" title="页面元素管理">
                            <Menu.Item key="4.1"><Link to={"/elementlist"}>ios页面元素管理</Link></Menu.Item>
                            <Menu.Item key="4.2"><Link to={"/elementlist"}>android页面元素管理</Link></Menu.Item>
                        </Menu.SubMenu>
                    </Menu>
                </Col>
            </Row>
        </Header>
    );
};

HeaderMenu.propTypes = {};

export default HeaderMenu;

