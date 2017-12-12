import React from "react";
import { DatePicker, version, Layout, Menu, Breadcrumb, Divider,Input,Row, Col ,Table, Icon,Dropdown, Button,message} from "antd";
import "antd/dist/antd.css";
import PageDirectory from './PageDirectory';
import ElementForm from './ElementForm';
/*
*页面名称：新建编辑元素页面
* 入口：点击元素管理页面的新建按钮进入
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

export default class ElementNew extends React.Component {

  render() {
    return(
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
    )
  }
}



