import React from "react";
import {Layout,Form, Input, Cascader, Divider, Row, Col, Checkbox, Button, Table} from "antd";
import "antd/dist/antd.css";
import {promiseAjax} from '../common/an';
import {
    Link
} from 'react-router-dom'
/*
 *页面名称：新建、编辑测试计划页面
 * 入口：测试计划管理页面点击新建测试计划进入
 */

const {Header, Content, Footer} = Layout;

const FormItem = Form.Item;
const { TextArea } = Input;

@Form.create()
export default class TestPlane extends React.Component {
    state = {
        caseDir:[],
        caseData:[],
        selectedRowKeys:[],
    };
    columns = [{
        title: '用例编号',
        dataIndex: 'id',
    }, {
        title: '用例标题',
        dataIndex: 'caseTitle',
        render: text => <a href="#"><Link to={"/addtestcase"}>{text}</Link></a>,
    }, {
        title: '执行次数',
        dataIndex: 'count',
        render: () => <Input placeholder="1" />
    }, {
        title: '操作',
        dataIndex: 'action',
        render: (text, record) => (
            <span>
                    <a href="#" onClick={e => this.upMove(record.key,e)}>上移</a>
                    <Divider type="vertical" />
                    <a href="#" onClick={e => this.downMove(record.key,e)}>下移</a>
                </span>
        ),
    }];
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


    getData(data){
        return data.map((item) => {
            var str = {};
            str.value = item.nodeId;
            str.label = item.nodeName;
            if (item.children.length !== 0) {
                str.children = this.getData(item.children);
                return str;

            }else {
                return str;
            }
        });
    }

    /**
     * 查询用例目录
     * @param all
     */
    search = () => {
        const platform = this.props.location.platform;
        //ajax get请求  url 路径
        promiseAjax.get(`/dir/list?platform=${platform}`).then(data => {
            if (null != data) {
                // 将数据存入state  渲染页面
                data = data.children;
                var data = this.getData(data);
                console.log("serch-getdata:",data);
                this.setState({
                    caseDir : data,
                });
            }
        });
    }

    /**
     * 新建测试计划
     * @param all
     */
    handleSubmit = (e) => {
        e.preventDefault();
        const form = this.props.form;
        var platform = this.props.location.platform;

        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.platform = platform;
                values.directoryId = values.directoryId.toString();
                console.log("handleSubmit-values:",values);
                //ajax post请求  url 路径
                promiseAjax.post('/plane/add', values).then(data => {
                    if (null != data) {
                        //插入测试计划的用例数据
                        var caseValue;
                        promiseAjax.post('/plane/add', caseValue).then(data => {
                            if (null != data) {
                                //form.resetFields();
                                this.props.history.goBack();
                            }
                        });
                    }
                });
            }
        });
    }


    // 根据选择的目录展示用例信息
    onChange(value) {
        console.log("onChange-value:",value);
        const platform = this.props.location.platform;
        //ajax get请求  url 路径
        promiseAjax.get(`/testcase/search?platform=${platform}&directoryId=${value[value.length-1]}`).then(data => {
            if (null != data) {
                // 将数据存入state  渲染页面
                console.log("onChange-data",data);
                // 增加排序字段
                for(var i=0;i<data.length;i++)
                    data[i]["order"] = (i+1).toString();
                this.setState({
                    caseData : data,
                });
            }
        });
    }



    upMove(order,e) {

        const data = [...this.state.caseData];
        console.log("render-upMove-key",order);
        console.log("render-upMove-data-before",data);
        e.preventDefault();
        var order_i = parseInt(order);

        if (order_i > 1)
        {
            var temp = data[order_i-2];
            data[order_i-2] = data[order_i-1];
            data[order_i-1] = temp;

            var tempKey = data[order_i-2].order;
            data[order_i-2].order = data[order_i-1].order;
            data[order_i-1].order = tempKey;
        }
        console.log("render-upMove-data-after",data);
        this.setState({
            caseData :data,
        });
    }

    downMove(order, e) {

        const data = [...this.state.caseData];
        e.preventDefault();
        var order_i = parseInt(order);

        if (order_i < data.length)
        {
            var temp = data[order_i];
            data[order_i] = data[order_i-1];
            data[order_i-1] = temp;

            var tempKey = data[order_i].order;
            data[order_i].order = data[order_i-1].order;
            data[order_i-1].order = tempKey;
        }
        this.setState({
            caseData:data,
        });

    }

    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        const { caseData,caseDir, selectedRowKeys } = this.state;
        // 选择复选框
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const formItemLayout = {
            labelCol: {
                span: 6 ,
            },
            wrapperCol: {
                span: 12 ,
            },
        };




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
                                    {getFieldDecorator('testPlaneName', {
                                        rules: [{
                                            required: true, message: '请输入标题!',
                                        },{
                                            max:50,message: '最多允许输入50个字符!',
                                        }],

                                    })(
                                        <Input placeholder="请输入标题"/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="描述"
                                >
                                    {getFieldDecorator('testPlaneDes', {
                                        rules: [{
                                            max:50, message: '最多允许输入50个字符!',
                                        }],

                                    })(
                                        <TextArea placeholder="请输入描述" autosize={{ minRows: 2, maxRows: 6 }} />
                                    )}

                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="执行次数"
                                >
                                    {getFieldDecorator('testPlaneCount', {
                                        rules: [{
                                            pattern: "^[0-9]*$", message: '只允许输入数字!',
                                        },{
                                            max: 11, message: '输入超出范围!',
                                        }],

                                    })(
                                        <Input placeholder="1"/>
                                    )}

                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="执行时间(分钟)"
                                >
                                    {getFieldDecorator('testPlaneRuntime', {
                                        rules: [{
                                            pattern: "^[0-9]*$", message: '只允许输入数字!',
                                        },{
                                            max: 11, message: '输入超出范围!',
                                        }],

                                    })(
                                        <Input placeholder="请输入执行时间"/>
                                    )}

                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="app地址"
                                >
                                    {getFieldDecorator('appUrl', {
                                        rules: [{
                                            required: true, message: '请输入app地址!',
                                        },{
                                            max:50,message: '最多允许输入100个字符!',
                                        }],
                                    })(
                                        <Input placeholder="请输入app地址"/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="客户端版本号"
                                >
                                    {getFieldDecorator('appVersion', {
                                        rules: [{
                                            required: true, message: '请输入客户端版本号!',
                                        },{
                                            max:50,message: '最多允许输入50个字符!',
                                        }],
                                    })(
                                        <Input placeholder="请输入客户端版本号"/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="系统版本"
                                >
                                    {getFieldDecorator('sysVersion', {
                                        rules: [{
                                            required: true, message: '请输入系统版本!',
                                        },{
                                            max:50,message: '最多允许输入50个字符!',
                                        }],
                                    })(
                                        <Input placeholder="请输入系统版本"/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="设备名称"
                                >
                                    {getFieldDecorator('deviceName', {
                                        rules: [{
                                            required: true, message: '请输入uuid!',
                                        },{
                                            max:50,message: '最多允许输入50个字符!',
                                        }],
                                    })(
                                        <Input placeholder="请输入设备名称"/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="uuis（ios）"
                                >
                                    {getFieldDecorator('deviceUUID', {
                                        rules: [{
                                            max:50,message: '最多允许输入50个字符!',
                                        }],
                                    })(
                                        <Input placeholder="请输入uuid"/>
                                    )}

                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="选择用例目录"
                                >
                                    {getFieldDecorator('directoryId', {
                                        rules: [{ type: 'array', required: true, message: '请选择用例组目录!' }],
                                    })(
                                        <Cascader placeholder="请选择" options={caseDir} onChange={this.onChange.bind(this)}/>
                                    )}
                                </FormItem>
                                <FormItem>
                                    <Table rowSelection={rowSelection} columns={this.columns} dataSource={caseData}/>
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
