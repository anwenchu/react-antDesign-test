import React from "react";
import "antd/dist/antd.css";
import PageDirectory from "./PageDirectory";
import {promiseAjax} from '../common/an';
import { Button, Modal, Form, Input, Row, Col,Select } from 'antd';


/*
 *页面名称：新增弹层
 * 未解决问题：1、表单提交后，没有刷新列表页
 */


const FormItem = Form.Item;
const { TextArea } = Input;

@Form.create()
export default class ElementNew extends React.Component {

    state = {
        visible: false,
        data:[],
    };

    showModal = () => {
        var platform = this.props.platform;
        promiseAjax.get(`/page/list?platform=${platform}`).then(data => {
            if (data && data.length!==0) {
                this.setState({ data: data });
            }
        });
        this.setState({ visible: true });
    }
    handleCancel = () => {
        this.setState({ visible: false });
    }
    handleCreate = () => {
        const form = this.props.form;
        var platform = this.props.platform;
        form.validateFields((err, values) => {
            values.platform = platform;
            if (!err) {
                promiseAjax.post('/element/add', values).then(() => {
                    form.resetFields();
                    this.setState({ visible: false });
                });
            }
        });
    }



    render() {
        const data=this.state.data;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                span: 6 ,
            },
            wrapperCol: {
                span: 16 ,
            },
        };
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>+ 新建</Button>
                <Modal
                    visible={this.state.visible}
                    title="新建页面元素"
                    okText="保存"
                    cancelText="取消"
                    onCancel={this.handleCancel}
                    onOk={this.handleCreate}
                >
                    <Form >
                        <FormItem
                            {...formItemLayout}
                            label="页面名称">
                            {getFieldDecorator('pageId', {
                                rules: [{required: true, message: '请选择页面名称!'}],
                            })(
                                <Select
                                    style={{width: '100%'}}
                                    placeholder="请选择状态"
                                    notFoundContent="暂无数据"
                                >
                                    {data.map(d => <Select.Option key={d.id}>{d.pageName}</Select.Option>)}
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="元素名称">
                            {getFieldDecorator('elementName', {
                                rules: [{required: true, message: '请输入元素名称!'}],
                            })(
                                <Input placeholder="请输入元素名称"/>
                            )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="元素类型"
                        >
                            {getFieldDecorator('elementCategory', {
                                rules: [{required: true, message: '请输入元素类型!'}],
                            })(
                                <Input placeholder="请输入元素类型"/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="元素id"
                        >
                            {getFieldDecorator('elementId', {
                                rules: [{required: true, message: '请输入元素id!'}],
                            })(
                                <Input placeholder="请输入元素id"/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="元素文本"
                        >
                            {getFieldDecorator('elementText', {
                                rules: [{required: true, message: '请输入元素文本!'}],
                            })(
                                <Input placeholder="请输入元素文本"/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="元素坐标"
                        >
                            {getFieldDecorator('elementBounds', {
                                rules: [{required: true, message: '请输入元素坐标!'}],
                            })(
                                <Input placeholder="请输入元素坐标"/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="元素xpath"
                        >
                            {getFieldDecorator('elementXpath', {
                                rules: [{required: true, message: '请输入元素xpath!'}],
                            })(
                                <Input placeholder="请输入元素xpath"/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="描述"
                        >
                            {getFieldDecorator('elementDesc', {
                                rules: [{required: false, message: '请输入元素描述!'}],
                            })(
                                <TextArea placeholder="请输入元素描述" autosize={{ minRows: 2, maxRows: 6 }} />
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}
