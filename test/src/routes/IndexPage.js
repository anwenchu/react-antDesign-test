import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import { DatePicker, version } from "antd";
import "antd/dist/antd.css";

import { Layout, Menu, Breadcrumb } from "antd";
const { Header, Content, Footer } = Layout;

ReactDOM.render(
  <Layout className="layout">
    <Header>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["0"]}
        style={{ lineHeight: "64px" }}
      >
        <Menu.SubMenu key="1" title="android自动化用例">
          <Menu.Item key="1.1">android自动化用例</Menu.Item>
          <Menu.Item>android自动化结果分析</Menu.Item>
          <Menu.Item>android测试计划</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="2" title="ios自动化用例">
          <Menu.Item>ios自动化用例</Menu.Item>
          <Menu.Item>ios自动化结果分析</Menu.Item>
          <Menu.Item>ios测试计划</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="3" title="性能基准测试">
          <Menu.Item>性能基准测试用例</Menu.Item>
          <Menu.Item>性能基准测试结果分析</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Header>
    <Content style={{ padding: " 50px" }}>
      <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
        使用说明
      </div>
    </Content>
    <Footer style={{ textAlign: "center" }}>
      Ant Design ©2017 Created by Ant UED
    </Footer>
  </Layout>,
  document.getElementById("root")
);
export default IndexPage;