import React from "react";
import { DatePicker, version, Layout, Menu, Breadcrumb } from "antd";
import "antd/dist/antd.css";

const { Header, Content, Footer } = Layout;

export default class IndexPage extends React.Component {
    render() {
        return (
            <div style={{background: "#fff", padding: 20, minHeight: 450}}>
                <div style={{padding: " 30px 0px 0px 30px"}}>
                    <h2>快速上手</h2>
                </div>
                <div style={{padding: " 0px 0px 0px 30px"}}>
                    <p>点击查看 <a href={"https://moji.wemomo.com/wiki/36805"} target={"_blank"}>web平台使用手册</a> 可以帮助你快速了解平台功能，编写第一个例子，创建第一个测试计划。</p>
               </div>
                <div style={{padding: " 30px 0px 0px 30px"}}>
                    <h2>执行你的测试计划</h2>
                </div>
                <div style={{padding: " 0px 0px 0px 30px"}}>
                  <p>点击查看 <a href={"https://moji.wemomo.com/wiki/36869"} target={"_blank"}>如何在移动客户端执行你的用例</a> </p>
                </div>
                <div style={{padding: " 30px 0px 0px 30px"}}>
                    <h2>进一步了解测试用例的编写</h2>
                </div>
                <div style={{padding: " 0px 0px 0px 30px"}}>
                    <p>点击查看 <a href={"https://moji.wemomo.com/wiki/36841"} target={"_blank"}>支持哪些用户行为</a></p>
                </div>
             </div>
        )
    }
}