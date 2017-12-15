import React from "react";
import { DatePicker, version, Layout, Menu, Breadcrumb } from "antd";
import "antd/dist/antd.css";

const { Header, Content, Footer } = Layout;

export default class IndexPage extends React.Component {
    render() {
        return (
            <div style={{background: "#fff", padding: 20, minHeight: 450}}>
                这里是使用说明
            </div>
        )
    }
}