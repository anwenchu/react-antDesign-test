import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import { DatePicker, version, Layout, Menu, Breadcrumb } from "antd";
import "antd/dist/antd.css";
import HeaderMenu from '../common/HeaderMenu';

const { Header, Content, Footer } = Layout;

export default class IndexPage extends React.Component {
    render() {
        return (

                <div style={{background: "#fff", padding: 24, minHeight: 280}}>
                  使用说明
                </div>
        )

    }
}