import React from "react";
import { Form, Input, Row, Col, Button,Layout, Menu, message} from "antd";
import "antd/dist/antd.css";
import PageDirectory from "./PageDirectory";
import {promiseAjax} from '../common/an';

/*
 *页面名称：新建编辑元素页面
 * 入口：点击元素管理页面的新建按钮进入
 */
const FormItem = Form.Item;
const { TextArea } = Input;

const {Content, Sider} = Layout;

@Form.create()
export default class ElementNew extends React.Component {

    state = {
        isEdit: false,
        element: [],
    };
    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                if (this.state.isEdit) {
                    values.id = this.state.element.id;
                }
                promiseAjax.post('/element/add', values).then(() => {
                    this.props.history.goBack();
                });
            }
        });
    }

    // react 生命周期函数
    componentDidMount() {
        // 如果是修改 回显数据
        const id = this.props.location.id;
        if (this.props.location.query === 'edit') {
            promiseAjax.get(`/element/${id}`).then((data) => {
                this.setState({
                    element: data,
                    isEdit: true,
                })
            });
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                span: 6 ,
            },
            wrapperCol: {
                span: 12 ,
            },
        };
        const element = this.state.element;
        return (
            <Layout>
                <Sider width={260} style={{background: "#F0F2F5"}}>
                    <div style={{background: "#fff", padding: 10, minHeight: 960}}>
                        <PageDirectory />
                    </div>
                </Sider>
                <Content style={{padding: "0px 0px 0px 20px"}}>
                    <div style={{background: "#fff", padding: 50, minHeight: 960}}>
                        <div className="gutter-example" style={{padding: " 0px 0px 30px 0px"}}>
                            <div style={{padding: " 0px 0px 15px 0px"}}>
                                新建元素
                            </div>
                            <div style={{padding: " 0px 0px 15px 0px"}}>
                                <Form onSubmit={this.handleSubmit}>
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
                                    <FormItem>
                                        <Row gutter={16} align={"middle"} justify={"center"}>
                                            <Col className="gutter-row" span={2} offset={8}>
                                                <Button onClick={()=>{this.props.history.goBack()}}>取消</Button>
                                            </Col>
                                            <Col className="gutter-row" span={2} offset={2}>
                                                <Button type="primary" htmlType="submit" >保存</Button>
                                            </Col>
                                        </Row>
                                    </FormItem>
                                </Form>
                            </div>
                        </div>
                    </div>
                </Content>
            </Layout>
        )
    }
}



