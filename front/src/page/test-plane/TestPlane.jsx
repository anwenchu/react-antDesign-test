import React from "react";
import {Layout,Form, Input, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete} from "antd";
import "antd/dist/antd.css";
import TestPlaneCaseList from './TestPlaneCaseList';
import {promiseAjax} from '../common/an';
/*
 *页面名称：新建、编辑测试计划页面
 * 入口：测试计划管理页面点击新建测试计划进入
 */

const {Header, Content, Footer} = Layout;

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const { TextArea } = Input;
const residences = [{
    value: '冒烟基本功能用例',
    label: '冒烟基本功能用例',
    children: [{
        value: '首页',
        label: '首页',
        children: [{
            value: '附近的人',
            label: '附近的人',
        }],
    }],
}, {
    value: '公共用例',
    label: '公共用例',
    children: [{
        value: '注册登录',
        label: '注册登录',
    }],
}];

@Form.create()
export default class TestPlane extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        caseDir:[],
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    // react 生命周期函数
    componentDidMount() {
        //初始化数据
        this.search()
    }

    /**
     * 查询用例目录
     * @param all
     */
    search = () => {
        const platform = this.props.platform;
        this.setState({
            platform: platform,
        });
        //ajax get请求  url 路径
        promiseAjax.get(`/dir/list?platform=${platform}`).then(data => {
            if (null != data) {
                var data = data.children;
                // 将数据存入state  渲染页面
                this.setState({
                    caseDir : data,
                });
            }
        });
    }



    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;

        const formItemLayout = {
            labelCol: {
                span: 6 ,
            },
            wrapperCol: {
                span: 12 ,
            },
        };

        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));
        return (
            <Content >
                <div style={{background: "#fff", padding: 24, minHeight: 430}}>
                    <div style={{padding: "40px"}}>
                        <div style={{textAlign:"center",fontSize:20} } >测试计划</div>
                        <div style={{padding:20}}>
                            <Form onSubmit={this.handleSubmit}>

                                <FormItem
                                    {...formItemLayout}
                                    label="标题"
                                >
                                    {getFieldDecorator('title', {
                                        rules: [{required: true, message: '请输入标题!'}],
                                    })(
                                        <Input placeholder="请输入标题"/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="描述"
                                >
                                    <TextArea placeholder="请输入描述" autosize={{ minRows: 2, maxRows: 6 }} />
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="执行次数"
                                >
                                    <Input placeholder="1"/>
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="app地址"
                                >
                                    {getFieldDecorator('appurl', {
                                        rules: [{ required: true, message: '请输入app地址!' }],
                                    })(
                                        <Input placeholder="请输入app地址"/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="客户端版本号"
                                >
                                    {getFieldDecorator('appversion', {
                                        rules: [{required: true, message: '请输入客户端版本号!'}],
                                    })(
                                        <Input placeholder="请输入app地址"/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="系统版本"
                                >
                                    {getFieldDecorator('sysversion', {
                                        rules: [{required: true, message: '请输入系统版本!',}],
                                    })(
                                        <Input placeholder="请输入系统版本"/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="设备名称"
                                >
                                    {getFieldDecorator('devicename', {
                                        rules: [{required: true, message: '请输入设备名称!',}],
                                    })(
                                        <Input placeholder="请输入设备名称"/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="uuis（ios）"
                                >
                                    <Input placeholder="请输入uuid"/>
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="选择用例目录"
                                >
                                    {getFieldDecorator('residence', {
                                        rules: [{ type: 'array', required: true, message: '请选择用例组目录!' }],
                                    })(
                                        <Cascader placeholder="请选择" options={residences} />
                                    )}
                                </FormItem>
                                <FormItem>
                                    <TestPlaneCaseList />
                                </FormItem>
                                <FormItem>
                                    <Row gutter={16} align={"middle"} justify={"center"}>
                                        <Col className="gutter-row" span={2} offset={8}>
                                            <Button onClick={()=>{this.props.history.goBack()}}>取消</Button>
                                        </Col>
                                        <Col className="gutter-row" span={2} offset={4}>
                                            <Button type="primary" htmlType="submit">保存</Button>
                                        </Col>
                                    </Row>
                                </FormItem>
                            </Form>
                        </div>
                    </div>
                </div>
            </Content>
        )
    }
}
