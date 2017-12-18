import React from 'react';
import { Tree,Button,Row, Col ,Modal,Input,Form } from 'antd';
import {promiseAjax} from "./an";

/*
* 元素管理页面的tree组件，跟用例管理页面目录不同，这个添加目录关系只有一级，添加目录为一级目录
* 数据：来自page表（这个目录只有一级，展示出来每个页面即可）
*/

const TreeNode = Tree.TreeNode;
const FormItem = Form.Item;

@Form.create()
export default class PageTree extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible1: false,
            visible2: false,
            visible3: false,
            selectedKeys: [],
            data : [],
            pageName : "",
        }
    }


    // react 生命周期函数
    componentDidMount() {
        //初始化数据
        this.search()
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
            if (!err) {
                promiseAjax.post('/page/add', values).then(() => {
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
            if (!err) {
                values.id = this.state.selectedKeys[0];
                promiseAjax.post('/page/add', values).then(() => {
                    console.log('handleOkEdit-values : ', values);
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
        promiseAjax.del(`/page/${id}`).then(() => {
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


    /**
     * 查询
     * @param all
     */
    search = () => {
        //ajax get请求  url 路径
        promiseAjax.get('/page/list').then(data => {
            if (data && data.length) {
                var datalist = [];
                for (var i = 0;i<data.length;i++) {
                    datalist.push(
                        {
                            key : data[i].id.toString(),
                            title : data[i].pageName,
                        }
                    )
                }
                // 将数据存入state  渲染页面
                this.setState({
                    data: datalist,
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
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                span: 6 ,
            },
            wrapperCol: {
                span: 12 ,
            },
        };

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
                            <Modal title="新建页面"
                                   visible={this.state.visible1}
                                   onOk={this.handleOkNew}
                                   onCancel={this.handleCancelNew}
                            >
                                <Form onSubmit={this.handleSubmit}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="页面名称："
                                    >
                                        {getFieldDecorator('pageName', {
                                            rules: [{ required: true, message: '请输入页面名称!' }],
                                        })(
                                            <Input id="dirName" placeholder="请输入页面名称"/>
                                        )}
                                    </FormItem>
                                </Form>
                            </Modal>
                        </Col>
                        <Col span={2} offset={4}>
                            <Button onClick={this.showModalEdit} size={"small"}>编辑</Button>
                            <Modal title="重命名页面"
                                   visible={this.state.visible2}
                                   onOk={this.handleOkEdit}
                                   onCancel={this.handleCancelEdit}
                            >
                                <Form >
                                    <FormItem
                                        {...formItemLayout}
                                        label="页面名称："
                                    >
                                        {getFieldDecorator('pageName', {
                                            initialValue: this.state.pageName,
                                            rules: [{required: true, message: '请输入页面名称!' }],
                                        })(
                                            <Input id="dirName" />
                                        )}
                                    </FormItem>
                                </Form>
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
