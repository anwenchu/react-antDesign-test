import React from 'react';
import { Tree,Button,Row, Col ,Modal,Input } from 'antd';
import {promiseAjax} from "./an";



const TreeNode = Tree.TreeNode;
const confirm = Modal.confirm;


export default class DirTree extends React.Component {
    state = {
        visible1: false,
        visible2: false,
        visible3: false,
        selectedKeys: [],
        data : [{
            title: '1',
            key: '1',
            children: [
                { title: '4', key: '4' },
                { title: '5', key: '5' },
                { title: '6', key: '6' },
            ],
        }, {
            title: '2',
            key: '2',
        }, {
            title: '30',
            key: '30',
        }],
    }

    showModalNew = () => {
        this.setState({
            visible1: true,
        });
    }
    showModalEdit = () => {
        this.setState({
            visible2: true,
        });
    }
    showModalDel = () => {
        this.setState({
            visible3: true,
        });
    }

    handleOkNew = (e) => {

        this.setState({
            visible1: false,
        });
    }
    handleCancelNew = (e) => {
        this.setState({
            visible1: false,
        });
    }
    handleOkEdit = (e) => {

        this.setState({
            visible2: false,
        });
    }
    handleCancelEdit = (e) => {
        this.setState({
            visible2: false,
        });
    }

    handleOkDel = (e) => {
        //promiseAjax.del(`/dir/${id}`).then(() => {
        //    // todo: low一点 重新查询 可以优化
        //    this.search();
        //});
        const data = this.state.data.filter(item => item.key !== this.state.selectedKeys[0]);
        this.setState({
            data: data,
            visible3: false,
        });
    }

    handleCancelDel = (e) => {
        this.setState({
            visible3: false,
        });
    }
    // 查询目录数据
    search = () => {
        //ajax get请求  url 路径
        promiseAjax.get('/dir/list').then(data => {
            console.log(data);
            if (data && data.length) {
                // 将数据存入state  渲染页面
                this.setState({
                    data: data,
                });
            }
        });
    }


    onSelect = (selectedKeys) => {
        console.log(' onSelect:',selectedKeys);
        this.state.selectedKeys = selectedKeys;
        this.setState({ selectedKeys });
    }



    renderTreeNodes = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} />;
        });
    }



    render() {
        return (
            <div>
                <Tree
                    showLine
                    defaultExpandedKeys={['0-0-0']}
                    onSelect={this.onSelect}
                    selectedKeys={this.state.selectedKeys}
                >
                    {this.renderTreeNodes(this.state.data)}
                </Tree>
                <div style={{ padding: " 5px" }}>
                    <Row>
                        <Col span={2} offset={4}>
                            <Button onClick={this.showModalNew} size={"small"}>新建</Button>
                            <Modal title="新建目录"
                                   visible={this.state.visible1}
                                   onOk={this.handleOkNew}
                                   onCancel={this.handleCancelNew}
                            >
                                <Input />
                            </Modal>
                        </Col>
                        <Col span={2} offset={4}>
                            <Button onClick={this.showModalEdit} size={"small"}>编辑</Button>
                            <Modal title="重命名目录"
                                   visible={this.state.visible2}
                                   onOk={this.handleOkEdit}
                                   onCancel={this.handleCancelEdit}
                            >
                                <Input />
                            </Modal>
                        </Col>
                        <Col span={2} offset={4}>
                            <Button size={"small"} onClick={this.showModalDel}>删除</Button>
                            <Modal
                                title="删除目录"
                                visible={this.state.visible3}
                                onOk={this.handleOkDel}
                                onCancel={this.handleCancelDel}
                            >
                                <p>确认要删除目录吗？</p>
                            </Modal>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}
