import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import { DatePicker, version, Layout, Menu, Breadcrumb, Divider,Input,Row, Col ,Table, Icon,Dropdown, Button,message} from "antd";
import "antd/dist/antd.css";
import HeaderMenu from '../components/HeaderMenu';
import TestPlaneList from '../components/TestPlaneList';

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
export default IndexPage;