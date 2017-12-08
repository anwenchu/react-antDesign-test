import React from "react";
import {Layout} from "antd";
import "antd/dist/antd.css";
import TestForm from "./TestForm";

const {Header, Content, Footer} = Layout;

export default class TestPlane extends React.Component {
    render() {
        return (

            <div style={{background: "#fff", padding: 24, minHeight: 280}}>
                <div style={{padding: "40px"}}>
                    <TestForm />
                </div>
            </div>

        )

    }
}
