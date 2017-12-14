import React from 'react';
import { Tree,Button,Row, Col  } from 'antd';
import NewDirModal from './NewDirModal';
import EditDirModal from './EditDirModal';
import DelDirModal from './DelDirModal';
import {promiseAjax} from "./an";
const TreeNode = Tree.TreeNode;


export default class DirTree extends React.Component {
    state = {
        expandedKeys: ['0-0-0', '0-0-1'],
        autoExpandParent: true,
        checkedKeys: ['0-0-0'],
        selectedKeys: [],
        data : [{
            title: 'android自动化用例',
            key: '0-0',
        }],
    }

    traverseTree(node){
        if (!node) {
            return;
        }

        traverseNode(node);
        if (node.children && node.children.length > 0) {
            var i = 0;
            for (i = 0; i < node.children.length; i++) {
                this.traverseTree(node.children[i]);
            }
        }
    }

    onDelete() {
        console.log('Delete', this.state.selectedKeys);
        const data = this.state.data.filter(item => item.key !== this.state.selectedKeys);
        console.log('Delete', data);
        this.setState({ data });
    }
    onSelect = (selectedKeys) => {
        console.log('onSelect', selectedKeys);
        this.state.selectedKeys = selectedKeys
        this.setState({ selectedKeys });
        console.log('onSelect', this.state.selectedKeys);
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
    search = () => {
        //ajax get请求  url 路径
        promiseAjax.get('/dir/list').then(data => {
            console.log(data);
            if (data && data.length) {
                // 将数据存入state  渲染页面
                this.setState({
                    elements: data,
                });
            }
        });
    }


    render() {
        return (
            <div>
                <Tree
                    onExpand={this.onExpand}
                    expandedKeys={this.state.expandedKeys}
                    autoExpandParent={this.state.autoExpandParent}
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
                            <DelDirModal />
                        </Col>
                    </Row>
                </div>

            </div>
        );
    }
}
