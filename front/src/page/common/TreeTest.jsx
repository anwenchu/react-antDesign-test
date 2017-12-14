import React from "react";
import "antd/dist/antd.css";
import { Button, Icon, Modal, Input, Tree, Select, Form, Col,Menu} from 'antd';
const TreeNode = Tree.TreeNode;

export default class TreeTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            treeData: [
                { title: 'Expand to load', key: '0' },
                { title: 'Expand to load', key: '1' },
                { title: 'Tree Node', key: '2', isLeaf: true },
            ],
            rightClickNodeTreeItem: {},
        }
    }
    onLoadData = (treeNode) => {
        return new Promise((resolve) => {
            if (treeNode.props.children) {
                resolve();
                return;
            }
            setTimeout(() => {
                treeNode.props.dataRef.children = [
                    { title: 'Child Node', key: `${treeNode.props.eventKey}-0` },
                    { title: 'Child Node', key: `${treeNode.props.eventKey}-1` },
                ];
                this.setState({
                    treeData: [...this.state.treeData],
                });
                resolve();
            }, 1000);
        });
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
            return <TreeNode {...item} dataRef={item} />;
        });
    }
    onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    }
    treeNodeonRightClick(e) {
        this.setState({
            rightClickNodeTreeItem: {
                pageX: e.event.pageX,
                pageY: e.event.pageY,
                id: e.node.props['data-key'],
                categoryName: e.node.props['data-title']
            }
        });
    }
    getNodeTreeRightClickMenu() {
        const {pageX, pageY} = {...this.state.rightClickNodeTreeItem};
        const tmpStyle = {
            position: 'absolute',
            left: `${pageX - 220}px`,
            top: `${pageY - 70}px`
        };
        const menu = (
            <Menu
                onClick={this.handleMenuClick}
                style={tmpStyle}

            >
                <Menu.Item key='2'><Icon type='plus-circle-o'/>{'加下级'}</Menu.Item>
                <Menu.Item key='4'><Icon type='edit'/>{'修改'}</Menu.Item>
                <Menu.Item key='3'><Icon type='minus-circle-o'/>{'删除目录'}</Menu.Item>
            </Menu>
        );
        return (this.state.rightClickNodeTreeItem == null) ? '' : menu;
    }

    render() {

        return (
            <div>
                <Tree
                    showLine
                    defaultExpandedKeys={['0-0-0']}
                    onSelect={this.onSelect}
                    onRightClick={this.treeNodeonRightClick}
                    loadData={this.onLoadData}
                >
                    {this.renderTreeNodes(this.state.treeData)}
                </Tree>
                {this.getNodeTreeRightClickMenu()}
            </div>
        );
    }
}
