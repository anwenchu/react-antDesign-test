import React from "react";
import "antd/dist/antd.css";
import {Link,withRouter} from "react-router-dom";
import { version, Layout, Menu, Breadcrumb, Divider,Input,Row, Col ,Table, Icon,Dropdown, Button,message} from "antd";
import {promiseAjax} from '../common/an';
import { Router,Route} from 'react-router';

const {Header} = Layout;


 class HeaderMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            path : {
                pathname : '',
                query : {
                    platform : '',
                    category : '',
                },
            },
        }
    }

    /**
    clickItem (menu){

        //key的命名规则按照：页面-客户端平台-类型的规则
        var path = this.state.path;
        var data = menu.key.split(".");
        if(data[0] === "1")
            path.pathname = "/testplanemanage";
        else if(data[0] === "2")
            path.pathname = "/testcasemanage";
        else if(data[0] === "3")
            path.pathname = "";
        else if(data[0] === "4")
            path.pathname = "/elementlist";

        if(data[1] === "1"){
            path.pathname = `${path.pathname}/android`;
            // path.query.platform = "android";
        }
        else if(data[1] === "2")
            path.pathname = `${path.pathname}/ios`;
        // path.query.platform = "ios";

        if(data[2] === "1")
            path.query.category = "android";
        else if(data[2] === "2")
            path.query.category = "ios";

        this.setState({
            path : path,
        })
        console.log("menu:",path);

        console.log("menu-clickItem-history1:",this.props.history);
        this.props.history.push(path);
        console.log("menu-clickItem-history2:",this.props.history);

    }
    **/

    render(){
        return (
            <Header>
                <Row>
                    <Col span={4}>
                        <div style={{color: "#F0F2F5", height: "45px", lineHeight: "45px", fontSize: "20px"}}>
                            <a href={"/index"} style={{color: "#F0F2F5"}}>自动化测试平台</a>
                        </div>
                    </Col>
                    <Col span={20}>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={["0"]}

                        >
                            <Menu.SubMenu key="1" title="测试计划">
                                <Menu.Item key="1.1" ><Link to={"/testplanemanage/android"}>android测试计划</Link></Menu.Item>
                                <Menu.Item key="1.2"><Link to={"/testplanemanage/ios"}>ios测试计划</Link></Menu.Item>
                            </Menu.SubMenu>
                            <Menu.SubMenu key="2" title="用例管理">
                                <Menu.Item key="2.1"><Link to={"/testcasemanage/android"}>android用例管理</Link></Menu.Item>
                                <Menu.Item key="2.2"><Link to={"/testcasemanage/ios"}>ios用例管理</Link></Menu.Item>
                            </Menu.SubMenu>
                            <Menu.SubMenu key="3" title="测试报告">
                                <Menu.Item key="3.1">android自动化测试报告</Menu.Item>
                                <Menu.Item key="3.2">ios自动化测试报告</Menu.Item>
                                <Menu.Item key="3.3">android性能基准测试结果报告</Menu.Item>
                                <Menu.Item key="3.4">ios性能基准测试结果报告</Menu.Item>
                            </Menu.SubMenu>
                            <Menu.SubMenu key="4" title="页面元素管理">
                                <Menu.Item key="4.1"><Link to={"/elementlist/android"}>android页面元素管理</Link></Menu.Item>
                                <Menu.Item key="4.2"><Link to={"/elementlist/ios"}>ios页面元素管理</Link></Menu.Item>
                            </Menu.SubMenu>
                        </Menu>
                    </Col>
                </Row>
            </Header>
        );
    }
};
export default HeaderMenu = withRouter(HeaderMenu)
