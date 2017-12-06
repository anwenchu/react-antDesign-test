import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import { DatePicker, version, Layout, Menu, Breadcrumb } from "antd";
import "antd/dist/antd.css";
import HeaderMenu from '../components/HeaderMenu';

const { Header, Content, Footer } = Layout;

ReactDOM.render(
  <Layout className="layout">
  <HeaderMenu />
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