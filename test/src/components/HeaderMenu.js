import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import { DatePicker, version } from "antd";
import "antd/dist/antd.css";
/*
*首页导航
*/


import { Layout, Menu, Breadcrumb } from "antd";
const { Header, Content, Footer } = Layout;

const HeaderMenu = () => {
  return (
    <Header>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["0"]}
        style={{ lineHeight: "64px" }}>
        <Menu.SubMenu key="1" title="测试计划">
          <Menu.Item key="1.1">
            <a href="http://www.alipay.com/" target="_blank">android自动化测试计划</a>
          </Menu.Item>
          <Menu.Item>ios自动化测试计划</Menu.Item>
          <Menu.Item>性能基准测试计划</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="2" title="用例管理">
          <Menu.Item>android自动化用例管理</Menu.Item>
          <Menu.Item>ios自动化用例管理</Menu.Item>
          <Menu.Item>性能基准测试用例管理</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="3" title="测试报告">
          <Menu.Item>android自动化测试报告</Menu.Item>
          <Menu.Item>ios自动化测试报告</Menu.Item>
          <Menu.Item>性能基准测试结果报告</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="4" title="页面元素管理">
          <Menu.Item>ios页面元素管理</Menu.Item>
          <Menu.Item>android页面元素管理</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Header>
  );
};

HeaderMenu.propTypes = {
};

export default HeaderMenu;

