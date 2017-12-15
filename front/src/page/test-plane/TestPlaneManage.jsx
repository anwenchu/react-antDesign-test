import React from "react";
import { DatePicker, version, Layout, Menu, Breadcrumb, Divider,Input,Row, Col ,Table, Icon,Dropdown, Button,message} from "antd";
import "antd/dist/antd.css";
import TestPlaneList from './TestPlaneList';
import {
    Link
} from 'react-router-dom'
/*
*页面名称：测试计划管理页面
* 入口：点击导航中的测试计划管理进入（ios入口进入数据为ios测试计划，android入口进入数据为android测试计划）
*/

const { Header, Content, Footer } = Layout;

export default class TestPlaneManage extends React.Component {
    render() {
        return(
            <Content>
                <div style={{ background: "#fff", padding: 20, minHeight: 450 }}>
                    <div style={{ padding: " 10px 0px 20px 0px" }}>
                        <Button type="primary"><Link to={"testplane"}>+ 新建测试计划</Link></Button>
                    </div>
                    <div style={{ padding: " 0px 0px 15px 0px" }}>
                        <TestPlaneList />
                    </div>
                </div>
            </Content>
        )
    }
}


