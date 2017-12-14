import React from 'react';
import { Tree,Button,Row, Col ,Modal } from 'antd';
import NewDirModal from './NewDirModal';
import EditDirModal from './EditDirModal';
import {promiseAjax} from "./an";



const TreeNode = Tree.TreeNode;
const confirm = Modal.confirm;


export default class DirTree extends React.Component {
    state = {
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
    // 确认删除
    showConfirmDel = (id) => {
        confirm({
            title: '是否要删除所选目录?',
            content: '点击确定按钮，删除所选目录。',
            onOk() {
                promiseAjax.del(`/dir/${id}`).then(() => {
                    // todo: low一点 重新查询 可以优化
                    this.search();
                });
                return new Promise((resolve, reject) => {
                    setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                }).catch(() => console.log('Oops errors!'));
            },
            onCancel() {},
        });
    }

    onSelect = (selectedKeys) => {
        this.state.selectedKeys = selectedKeys;
        this.setState({ selectedKeys });
        this.DeltraverseTree(this.state.data)
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
                            <NewDirModal />
                        </Col>
                        <Col span={2} offset={4}>
                            <EditDirModal />
                        </Col>
                        <Col span={2} offset={4}>
                            <Button size={"small"} onClick={() => this.handleDelete(this.state.selectedKeys)}>删除</Button>
                        </Col>
                    </Row>
                </div>

            </div>
        );
    }
}
