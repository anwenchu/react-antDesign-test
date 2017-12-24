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
    };
    columns = [{
        title: '编号',
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


    // 根据选择的目录展示用例信息
    onChange(value) {
        console.log("onChange-value:",value);
        const platform = this.props.location.platform;
        //ajax get请求  url 路径
        promiseAjax.get(`/testcase/search?platform=${platform}&directoryId=${value[value.length-1]}`).then(data => {
            if (null != data) {
                // 将数据存入state  渲染页面
                console.log("onChange-data",data);
                this.setState({
                    caseData : data,
                });
            }
        });
    }



    upMove(key,e) {

        const data = [...this.state.data];
        e.preventDefault();
        var key_i = parseInt(key);

        if (key_i > 1)
        {
            var temp = data[key_i-2];
            data[key_i-2] = data[key_i-1];
            data[key_i-1] = temp;

            var tempKey = data[key_i-2].key;
            data[key_i-2].key = data[key_i-1].key;
            data[key_i-1].key = tempKey;
        }
        this.setState({ data });
    }

    downMove(key, e) {

        const data = [...this.state.data];
        e.preventDefault();
        var key_i = parseInt(key);

        if (key_i < data.length)
        {
            var temp = data[key_i];
            data[key_i] = data[key_i-1];
            data[key_i-1] = temp;

            var tempKey = data[key_i].key;
            data[key_i].key = data[key_i-1].key;
            data[key_i-1].key = tempKey;
        }
        this.setState({ data });

    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const datasource = this.state.caseDir;
        const casesource = this.state.caseData;
        console.log("render-casesource",casesource);

        const formItemLayout = {
            labelCol: {
                span: 6 ,
            },
            wrapperCol: {
                span: 12 ,
            },
        };

        // rowSelection object indicates the need for row selection
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked

            }),
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
                                        <Cascader placeholder="请选择" options={datasource} onChange={this.onChange.bind(this)}/>
                                    )}
                                </FormItem>
                                <FormItem>
                                    <Table rowSelection={rowSelection} columns={this.columns} dataSource={casesource}/>
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
