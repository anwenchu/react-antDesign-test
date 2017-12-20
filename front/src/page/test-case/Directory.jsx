import React from 'react'
import "antd/dist/antd.css";
import { Tree, Divider,Input,Row,Col,Button,Icon,Modal,Form } from 'antd';
import {promiseAjax} from "../common/an";
/*
*测试用例管理页面（TestCaseManage）的用例目录
* 数据：来自directory表
*/

const TreeNode = Tree.TreeNode;

@Form.create()
class Directory extends React.Component {

    state = {
        expandedKeys: ['0-0', '0-0-0', '0-0-0-0'],
        visible1: false,
        visible2: false,
        visible3: false,
        selectedKeys: [],
        data : [],
        platform : "",
        pageName : "",
    }


    // 显示新建对话框
    showModalNew = () => {
        this.setState({
            visible1: true,
        });
    }

    // 显示编辑对话框
    showModalEdit = () => {
        const data = [...this.state.data];
        var i = 0;
        while (i<data.length){
            if (data[i].key === this.state.selectedKeys[0].toString())
                break;
            i++
        }
        this.setState({
            pageName : data[i].title,
            visible2: true,
        });
    }

    // 显示删除对话框
    showModalDel = () => {
        this.setState({
            visible3: true,
        });
    }

    /**
     * 新建
     * @param
     */
    handleOkNew = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            values["platform"] = this.state.platform;
            values["isDelete"] = 1;
            if (!err) {
                promiseAjax.post('/dir/add', values).then(() => {
                    this.search();
                    this.setState({
                        visible1: false,
                    });
                });
            }
        });

        //const data = [...this.state.data];
        //var nameText = document.getElementById('dirName').value;
        //if (nameText !== '')
        //    //输入目录名称后插入数据
        //    data.push(
        //        {
        //            title : nameText,
        //            key : (data.length + 1).toString()
        //        }
        //    );
        //this.setState({
        //    data: data,
        //    visible1: false,
        //});
    }
    // 取消新建
    handleCancelNew = (e) => {
        this.setState({
            visible1: false,
        });
    }

    /**
     * 编辑
     * @param
     */
    handleOkEdit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            values["platform"] = this.state.platform;
            values["isDelete"] = 1;
            if (!err) {
                values.id = this.state.selectedKeys[0];
                promiseAjax.post('/dir/add', values).then(() => {
                    this.search();
                    this.setState({
                        visible2: false,
                    });
                });
            }
        });
    }

    // 取消编辑
    handleCancelEdit = (e) => {
        this.setState({
            visible2: false,
        });
    }


    /**
     * 删除
     * @param id
     */
    handleOkDel = (e) => {
        var id = this.state.selectedKeys[0]
        promiseAjax.del(`/dir/${id}`).then(() => {
            // todo: low一点 重新查询 可以优化
            this.search();
        });
        this.setState({
            visible3: false,
        });
        //const data = this.state.data.filter(item => item.key !== this.state.selectedKeys[0]);
        //this.setState({
        //    data: data,
        //    visible3: false,
        //});
    }

    handleCancelDel = (e) => {
        this.setState({
            visible3: false,
        });
    }


    // react 生命周期函数
    componentDidMount() {
        //初始化数据
        this.search()
    }

    /**
     * 查询
     * @param all
     */
    search = () => {
        const platform = "android";//this.props.platform;
        console.log("path.tree:",platform);
        this.setState({
            platform: platform,
        });
        //ajax get请求  url 路径
        promiseAjax.get(`/dir/search?platform=${platform}`).then(data => {
            if (null != data) {
                var data = data.children;
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
                    <TreeNode title={item.nodeName} key={item.nodeId} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} />;
        });
    }


    render() {
        const loop = data => data.map((item) => {
            if (item.children && item.children.length) {
                return <TreeNode key={item.nodeId} title={item.nodeId}>{loop(item.children)}</TreeNode>;
            }
            return <TreeNode key={item.nodeId} title={item.nodeId} />;
        });
        return (
            <div>
                <Divider>用例查找</Divider>
                <div style={{ padding: " 15px" }}> 用例编号：</div>
                <div style={{ padding: " 0px 15px 0px 15px" }}>
                    <Input placeholder="请输入用例编号" />
                </div>
                <div style={{ padding: " 15px" }}> 用例标题：</div>
                <div style={{ padding: " 0px 15px 15px 15px" }}>
                    <Input placeholder="请输入用例标题" />
                </div>
                <Divider>用例管理</Divider>
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

Directory.propTypes = {
};

export default Directory;
