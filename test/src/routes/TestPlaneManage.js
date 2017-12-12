import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import { DatePicker, version, Layout, Menu, Breadcrumb, Divider,Input,Row, Col ,Table, Icon,Dropdown, Button,message} from "antd";
import "antd/dist/antd.css";
import HeaderMenu from '../components/HeaderMenu';
import TestPlaneList from '../components/TestPlaneList';
/*
*页面名称：测试计划管理页面
* 入口：点击导航中的测试计划管理进入（ios入口进入数据为ios测试计划，android入口进入数据为android测试计划）
*/

const { Header, Content, Footer } = Layout;

ReactDOM.render(
  <Layout className="layout">
  <HeaderMenu />
    <Content style={{ padding: " 50px" }}>
      <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
        <div style={{ padding: " 0px 0px 45px 0px" }}>
          <Button type="primary">+ 新建测试计划</Button>
        </div>
        <div style={{ padding: " 0px 0px 15px 0px" }}>
          <TestPlaneList />
        </div>
      </div>
    </Content>
  </Layout>,
  document.getElementById("root")
);
export default TestPlaneManage;
