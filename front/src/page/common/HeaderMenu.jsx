import React from "react";
import {Layout, Menu, Row, Col } from "antd";
import "antd/dist/antd.css";
import {Link} from "react-router-dom";
const {Header, Content, Footer} = Layout;

const HeaderMenu = () => {
    return (
        <Header>
            <div className="logo"/>
            <Row>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={["0"]}
                >

                        <Menu.SubMenu key="1" title="测试计划">
                            <Menu.Item key="1.1">
                                <Link to={"testplanemanage"}>android自动化测试计划</Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link to={"testplanemanage"}>ios自动化测试计划</Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link to={"testplanemanage"}>性能基准测试计划</Link>
                            </Menu.Item>
                        </Menu.SubMenu>
                    <Col span={1}>
                    </Col>
                    <Menu.SubMenu key="2" title="用例管理">
                        <Menu.Item><Link to={"/testcasemanage"}>android自动化用例管理</Link></Menu.Item>
                        <Menu.Item><Link to={"/testcasemanage"}>ios自动化用例管理</Link></Menu.Item>
                        <Menu.Item><Link to={"/testcasemanage"}>性能基准测试用例管理</Link></Menu.Item>
                    </Menu.SubMenu>
                    <Col span={1}>
                    </Col>
                    <Menu.SubMenu key="3" title="测试报告">
                        <Menu.Item>android自动化测试报告</Menu.Item>
                        <Menu.Item>ios自动化测试报告</Menu.Item>
                        <Menu.Item>性能基准测试结果报告</Menu.Item>
                    </Menu.SubMenu>
                    <Col span={1}>
                    </Col>
                    <Menu.SubMenu key="4" title="页面元素管理">
                        <Menu.Item>
                            <Link to={"/elementlist"}>ios页面元素管理</Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to={"/elementlist"}>android页面元素管理</Link>
                        </Menu.Item>
                    </Menu.SubMenu>
                </Menu>
            </Row>
        </Header>
    );
};

HeaderMenu.propTypes = {};

export default HeaderMenu;

