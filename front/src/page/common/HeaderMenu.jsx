import React from "react";
import "antd/dist/antd.css";
import {Link} from "react-router-dom";
import { version, Layout, Menu, Breadcrumb, Divider,Input,Row, Col ,Table, Icon,Dropdown, Button,message} from "antd";
import {promiseAjax} from '../common/an';

const {Header} = Layout;


export default class HeaderMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            path : {
                pathName : '',
                query : {
                    platform : '',
                    category : '',
                },
            },
        }
    }


    clickItem (menu){

        //key的命名规则按照：页面-客户端平台-类型的规则
        var path = this.state.path;
        var data = menu.key.split(".");
        if(data[0] === "1")
            path.pathName = "/testplanemanage";
        else if(data[0] === "2")
            path.pathName = "/testcasemanage";
        else if(data[0] === "3")
            path.pathName = "";
        else if(data[0] === "4")
            path.pathName = "/elementlist";

        if(data[1] === "1")
            path.query.platform = "android";
        else if(data[1] === "2")
            path.query.platform = "ios";

        if(data[2] === "1")
            path.query.category = "android";
        else if(data[2] === "2")
            path.query.category = "ios";

        this.setState({
            path : path,
        })
        //console.log("path:",path);
        //console.log("history:",this.props.history);
        //this.props.history.push(path);

    }


    render(){
        return (
            <Header>
                <Row>
                    <Col span={4}>
                        <div style={{color: "#F0F2F5", height: "45px", lineHeight: "45px", fontSize: "20px"}}>
                            自动化测试平台
                        </div>
                    </Col>
                    <Col span={20}>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={["0"]}
                            onClick={this.clickItem.bind(this)}
                        >
                            <Menu.SubMenu key="1" title="测试计划">
                                <Menu.Item key="1.1.1" ><Link to={this.state.path}>android自动化测试计划</Link></Menu.Item>
                                <Menu.Item key="1.2.1"><Link to={this.state.path}>ios自动化测试计划</Link></Menu.Item>
                                <Menu.Item key="1.3.2"><Link to={this.state.path}>性能基准测试计划</Link></Menu.Item>
                            </Menu.SubMenu>
                            <Menu.SubMenu key="2" title="用例管理">
                                <Menu.Item key="2.1.1"><Link to={"/testcasemanage"}>android自动化用例管理</Link></Menu.Item>
                                <Menu.Item key="2.2.1"><Link to={"/testcasemanage"}>ios自动化用例管理</Link></Menu.Item>
                                <Menu.Item key="2.3.2"><Link to={"/testcasemanage"}>性能基准测试用例管理</Link></Menu.Item>
                            </Menu.SubMenu>
                            <Menu.SubMenu key="3" title="测试报告">
                                <Menu.Item key="3.1.1">android自动化测试报告</Menu.Item>
                                <Menu.Item key="3.2.1">ios自动化测试报告</Menu.Item>
                                <Menu.Item key="3.3.2">性能基准测试结果报告</Menu.Item>
                            </Menu.SubMenu>
                            <Menu.SubMenu key="4" title="页面元素管理">
                                <Menu.Item key="4.1.0"><Link to={"/elementlist"}>android页面元素管理</Link></Menu.Item>
                                <Menu.Item key="4.2.0"><Link to={this.state.path}>ios页面元素管理</Link></Menu.Item>
                            </Menu.SubMenu>
                        </Menu>
                    </Col>
                </Row>
            </Header>
        );
    }
};

