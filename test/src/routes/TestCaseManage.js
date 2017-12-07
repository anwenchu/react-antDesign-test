import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import { DatePicker, version, Layout, Menu, Breadcrumb, Divider,Input,Row, Col ,Table, Icon,Dropdown, Button,message} from "antd";
import "antd/dist/antd.css";
import HeaderMenu from '../components/HeaderMenu';
import Directory from '../components/Directory';
import DropdownList from '../components/DropdownList';
import CaseManageList from '../components/CaseManageList';


const { Header, Content, Footer, Sider } = Layout;
const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">下拉列表内</Menu.Item>
  </Menu>
);
function handleButtonClick(e) {
  message.info('Click on left button.');
  console.log('click left button', e);
}

function handleMenuClick(e) {
  message.info('Click on menu item.');
  console.log('click', e);
}

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
            <div style={{ padding: " 0px 0px 45px 0px" }}>
              <Row gutter={16} align="middle" >
                <Col className="gutter-row" span={2}>
                  <div className="gutter-box" >状态：</div>
                </Col>
                <Col className="gutter-row" span={4}>
                  <DropdownList />
                </Col>
                <Col className="gutter-row" span={4}>
                  <Button type="primary">查找</Button>
                </Col>
              </Row>
            </div>
            <div style={{ padding: " 0px 0px 15px 0px" }}>
              <Row gutter={16} align="middle" >
                <Col className="gutter-row" span={3}>
                  <Button type="primary">+ 新建</Button>
                </Col>
                <Col className="gutter-row" span={3}>
                  <Button >批量操作</Button>
                </Col>
                <Col className="gutter-row" span={3}>
                  <Button type="dashed">...</Button>
                </Col>
              </Row>
            </div>
            <div style={{ padding: " 0px 0px 15px 0px" }}>
              <CaseManageList />
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  </Layout>,
  document.getElementById("root")
);
export default TestCase;