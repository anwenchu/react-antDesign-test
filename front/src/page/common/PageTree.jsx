import React from 'react';
import { Tree,Button,Row, Col ,Modal,Input } from 'antd';
import {promiseAjax} from "./an";

/*
* 元素管理页面的tree组件，跟用例管理页面目录不同，这个添加目录关系只有一级，添加目录为一级目录
* 数据：来自page表（这个目录只有一级，展示出来每个页面即可）
*/

const TreeNode = Tree.TreeNode;


export default class PageTree extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible1: false,
            visible2: false,
            visible3: false,
            selectedKeys: [],
            data : [{
                title: '1-aaa',
                key: '1',
            }, {
                title: '2-aaaa',
                key: '2',
            }, {
                title: '30-aaa',
                key: '30',
            }],
        }
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
        if (this.state.selectedKeys.length != 0)
        {
            const data = [...this.state.data];
            // 根据key获取目录名称
            var i = 0;
            while (i<data.length) {

                if (data[i].key === this.state.selectedKeys[0])
                    break;
                i++;

            }
            var value = document.getElementById("dirName1");
            console.log(' showModalEdit:',value);
            //value.value = data[i].title;
        }

    }

    showModalDel = () => {
        this.setState({
            visible3: true,
        });
    }

    handleOkNew = (e) => {
        //promiseAjax.del(`/page/${id}`).then(() => {
        //    // todo: low一点 重新查询 可以优化
        //    this.search();
        //});
        const data = [...this.state.data];
        var nameText = document.getElementById('dirName').value;
        if (nameText !== '')
            //输入目录名称后插入数据
            data.push(
                {
                    title : nameText,
                    key : (data.length + 1).toString()
                }
            );
        this.setState({
            data: data,
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
            data: data,
            visible2: false,
        });
    }
    handleCancelEdit = (e) => {
        this.setState({
            visible2: false,
        });
    }

    handleOkDel = (e) => {
        //promiseAjax.del(`/page/${id}`).then(() => {
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
        promiseAjax.get('/page/list').then(data => {
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


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
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
                                <Input id="dirName" placeholder="请输入目录名称"/>
                            </Modal>
                        </Col>
                        <Col span={2} offset={4}>
                            <Button onClick={this.showModalEdit} size={"small"}>编辑</Button>
                            <Modal title="重命名目录"
                                   visible={this.state.visible2}
                                   onOk={this.handleOkEdit}
                                   onCancel={this.handleCancelEdit}
                            >
                                <Input id="dirName1" />
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
