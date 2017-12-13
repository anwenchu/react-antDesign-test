import React from "react";
import "antd/dist/antd.css";
import { Modal, Button } from 'antd';


const confirm = Modal.confirm;

export default class DelDirModal extends React.Component {

    showConfirm() {
        confirm({
            title: '是否要删除所选目录?',
            content: '点击确定按钮，删除所选目录。',
            onOk() {
                return new Promise((resolve, reject) => {
                    setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                }).catch(() => console.log('Oops errors!'));
            },
            onCancel() {},
        });
    }
    render() {
        return (
            <div>
                 <Button size={"small"} onClick={this.showConfirm}>删除</Button>
            </div>
        );
    }
}