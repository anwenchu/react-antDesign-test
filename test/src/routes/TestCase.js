import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import { DatePicker, version, Layout, Menu, Breadcrumb, Divider,Input } from "antd";
import "antd/dist/antd.css";
import HeaderMenu from '../components/HeaderMenu';
import Directory from '../components/Directory';

const { Header, Content, Footer, Sider } = Layout;

ReactDOM.render(
  <Layout>
    <HeaderMenu />
    <Layout>
      <Sider width={350} style={{ background: "#F0F2F5", padding: " 25px 0px 25px 25px" }}>
        <div style={{ background: "#fff", padding: 10, minHeight: 960 }}> 
          <Divider>用例查找</Divider>
          <div style={{ padding: " 15px" }}> 用例编号：</div>
          <div style={{ padding: " 0px 15px 0px 15px" }}> 
            <Input placeholder="请输入用例编号" />
          </div>
          <div style={{ padding: " 15px" }}> 用例标题：</div>
          <div style={{ padding: " 0px 15px 15px 15px" }}> 
            <Input placeholder="请输入用例标题" />
          </div>
          <Divider>用例管理</Divider>
          <Directory />
        </div>

      </Sider>
      <Content style={{ padding: " 25px" }}>
        <div style={{ background: "#fff", padding: 10, minHeight: 960 }}> 
        </div>
      </Content>
    </Layout>
  </Layout>,
  document.getElementById("root")
);
export default TestCase;