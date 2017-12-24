import React from "react";
import "antd/dist/antd.css";
import PageDirectory from "./PageDirectory";
import {promiseAjax} from '../common/an';
import { Button, Modal, Form, Input, Row, Col,Select } from 'antd';


/*
 *页面名称：编辑弹层
 * 未解决问题：1、更新接口使用的是新增接口暂时完成的更新功能
 *          2、表单提交后，没有刷新列表页
 */



const FormItem = Form.Item;
const { TextArea } = Input;

@Form.create()
export default class ElementEidt extends React.Component {

    state = {
        visible: false,
        element:[],
        data:[],
    };

    showModal = () => {
        //  获取所选元素信息
        const item = this.props.item;
        var platform = item.platform;
        // 获取页面下拉列表值
        promiseAjax.get(`/page/list?platform=${platform}`).then(data => {
            if (data && data.length!==0) {
                this.setState({ data: data });
            }
        });
        this.setState({
            element : item,
            visible: true,
        });
    }
    handleCancel = () => {
        this.setState({ visible: false });
    }

    // 修改元素
    handleCreate = () => {
        const form = this.props.form;
        var element = this.state.element;
        var platform = element == null ? '' : element.platform;
        var id = element == null ? '' : element.id;
        form.validateFields((err, values) => {
            values.platform = platform;
            values.id = id;
            if (!err) {
                promiseAjax.put('/element/update', values).then(() => {
                    form.resetFields();
                    this.setState({ visible: false });
                });
            }
        });
    }



    render() {
        const data=this.state.data;
        const { getFieldDecorator } = this.props.form;
        const element = this.state.element;
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
                <a onClick={this.showModal}>编辑</a>
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
                                initialValue:element == null ? '' : element.pageId,
                                rules: [{required: true, message: '请选择页面名称!'}],
                            })(
                                <Select
                                    style={{width: '100%'}}
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
                                initialValue: element == null ? '' : element.elementName,
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
                                initialValue: element == null ? '' : element.elementCategory,
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
                                initialValue: element == null ? '' : element.elementId,
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
                                initialValue: element == null ? '' : element.elementText,
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
                                initialValue: element == null ? '' : element.elementBounds,
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
                                initialValue: element == null ? '' : element.elementXpath,
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
                                initialValue: element == null ? '' : element.elementDesc,
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
