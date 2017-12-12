import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import { DatePicker, version, Layout, Menu, Breadcrumb, Divider,Input,Row, Col ,Table, Icon,Dropdown, Button,message} from "antd";
import "antd/dist/antd.css";
import HeaderMenu from '../components/HeaderMenu';
import Directory from '../components/Directory';
import CaseStepList from '../components/CaseStepList';
/*
*页面名称：新建、保存用例页面
* 入口：点击测试管理页面中的新建进入
*/


const { Header, Content, Footer, Sider } = Layout;

ReactDOM.render(
  <Layout>
    <HeaderMenu />
    <Layout>
      <Sider width={300} style={{ background: "#F0F2F5", padding: " 25px 0px 25px 25px" }}>
        <div style={{ background: "#fff", padding: 10, minHeight: 960 }}>
          <Directory />
        </div>
      </Sider>
      <Content style={{ padding: " 25px" }}>
        <div style={{ background: "#fff", padding: 50, minHeight: 960 }}>
          <div className="gutter-example" style={{ padding: " 0px 0px 30px 0px" }}>
            <div style={{ padding: " 0px 0px 15px 0px" }}>
              <Row gutter={16} align="middle" >
                <Col className="gutter-row" span={3}>
                  <div className="gutter-box" >用例标题：</div>
                </Col>
                <Col className="gutter-row" span={21}>
                  <div className="gutter-box" >
                    <Input placeholder="请输入用例标题" />
                  </div>
                </Col>
              </Row>
            </div>
            <div>
              <Row gutter={16} align="middle">
                <Col className="gutter-row" span={4}>
                  <div className="gutter-box" >前置用例依赖：</div>
                </Col>
                <Col className="gutter-row" span={6}>
                  <div className="gutter-box" >
                    <Input placeholder="请输入用例编号" />
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          <div className="caseStepList">
            <CaseStepList />
          </div>
          <div className="gutter-example">
            <div>
              <Row gutter={16} align="middle">
                <Col className="gutter-row" span={4}>
                  <div className="gutter-box" >后置用例依赖：</div>
                </Col>
                <Col className="gutter-row" span={6}>
                  <div className="gutter-box" >
                    <Input placeholder="请输入用例编号" />
                  </div>
                </Col>
              </Row>
            </div>
            <div style={{ padding: " 30px 0px 0px 0px" }}>
              <Button type="primary">保存</Button>
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  </Layout>,
  document.getElementById("root")
);
export default TestCase;
