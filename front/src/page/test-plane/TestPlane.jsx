import React from "react";
import {Layout} from "antd";
import "antd/dist/antd.css";
import TestPlaneForm from "./TestPlaneForm";
/*
 *页面名称：新建、编辑测试计划页面
 * 入口：测试计划管理页面点击新建测试计划进入
 */

const {Header, Content, Footer} = Layout;

export default class TestPlane extends React.Component {
    render() {
        return (
            <Content >
                <div style={{background: "#fff", padding: 24, minHeight: 430}}>
                    <div style={{padding: "40px"}}>
                        <TestPlaneForm />
                    </div>
                </div>
            </Content>
        )
    }
}
