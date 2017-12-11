import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import { DatePicker, version, Layout, Menu, Breadcrumb, Divider,Input,Row, Col ,Table, Icon,Dropdown, Button,message} from "antd";
import "antd/dist/antd.css";
import HeaderMenu from '../components/HeaderMenu';
import PageDirectory from '../components/PageDirectory';
import ElementForm from '../components/ElementForm';
/*
*页面名称：新建编辑元素页面
* 入口：点击顶部导航中的用例管理进入（ios导航点击进入后数据为ios用例数据，android导航点击进入后数据为android用例数据）
*/

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
          <PageDirectory />
        </div>
      </Sider>
      <Content style={{ padding: " 25px" }}>
        <div style={{ background: "#fff", padding: 50, minHeight: 960 }}>
          <div className="gutter-example" style={{ padding: " 0px 0px 30px 0px" }}>
            <div style={{ padding: " 0px 0px 15px 0px" }}>
              新建元素
            </div>
            <div style={{ padding: " 0px 0px 15px 0px" }}>
              <ElementForm />
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  </Layout>,
  document.getElementById("root")
);
export default ElementNew;
