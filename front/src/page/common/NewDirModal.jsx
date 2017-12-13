import React from "react";
import "antd/dist/antd.css";
import { Modal, Button ,Input} from 'antd';

export default class NewDirModal extends React.Component {
    state = {
        visible: false,
        confirmLoading: false,
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = () => {
        this.setState({
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 2000);
    }
    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    }
    render() {
        const { visible, confirmLoading } = this.state;
        return (
            <div>
                <Button onClick={this.showModal} size={"small"}>新建</Button>
                <Modal title="新建目录"
                       visible={visible}
                       onOk={this.handleOk}
                       confirmLoading={confirmLoading}
                       onCancel={this.handleCancel}
                >
                    <Input placeholder="请输入目录名称"></Input>
                </Modal>
            </div>
        );
    }
}
