import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import { DatePicker, version, Layout, Menu, Breadcrumb,Form, Icon, Input, Button,Tooltip, Cascader, Select, Row, Col, Checkbox, AutoComplete } from "antd";
import "antd/dist/antd.css";
import HeaderMenu from '../components/HeaderMenu';
import TestPlaneForm from '../components/TestPlaneForm';
/*
*页面名称：新建、编辑测试计划页面
* 入口：测试计划管理页面点击新建测试计划进入
*/

const { Header, Content, Footer } = Layout;

ReactDOM.render(
  <Layout className="layout">
  <HeaderMenu />
    <Content style={{ padding: " 50px" }}>
      <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
        <div style={{ padding: "40px" }}>
          <TestPlaneForm />
        </div>
      </div>
    </Content>
  </Layout>,
  document.getElementById("root")
);
export default TestPlane;
