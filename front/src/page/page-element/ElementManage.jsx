import React from "react";
import {Layout, Modal, Form,Select,Divider,Input,Row, Col ,Table, Button,message} from "antd";
import PageDirectory from './PageDirectory';
import DropdownList from '../common/DropdownList';
import {promiseAjax} from '../common/an';
import ElementNew from './ElementNew';
import ElementEdit from './ElementEdit';
/*
*页面名称：页面元素管理
* 入口：点击顶部导航中的元素管理进入（ios元素管理点击进入后数据为ios元素数据，android同理）
*/

const {Content, Sider } = Layout;
const FormItem = Form.Item;
const { TextArea } = Input;

@Form.create()
export default class ElementManage extends React.Component{
    // 一个全局状态 改变后会从新渲染页面
    state = {
        elements: [],
        id: '',
        platform : '', //平台信息，前一个页面传值过来，默认为android
        available : '0', //按状态查询标记,0:全部元素，1：可用，2：不可用
        pageId : '',
        queryTerm: [],
        visible: false,
        data:[], //存储页面信息
        element:[], //记录元素信息
        isEdit: '0',//0:新增，1：编辑
    }

    // react 生命周期函数  自己百度
    componentDidMount() {
        // 页面渲染完成，进行一次查询
        this.search()
    }


    columns = [{
        title: '编号',
        dataIndex: 'elementNo',
        width:50,
    }, {
        title: '元素名称',
        dataIndex: 'elementName',
        width:100,
    }, {
        title: '元素类型',
        dataIndex: 'elementCategory',
        width:100,
    }, {
        title: '元素id',
        dataIndex: 'elementId',
        width:150,
    }, {
        title: '元素文本',
        dataIndex: 'elementText',
        width:150,
    }, {
        title: '操作',
        dataIndex: 'action',
        render: (text, record) => (
            <span>
                <Row>
                    <Col span={9}>
                        <a onClick={() => this.editModal(record)}>编辑</a>
                    </Col>
                    <Col span={15}>
                        <Divider type="vertical"/>
                        <a onClick={() => this.handleDelete(record.id)}>删除</a>
                    </Col>
                </Row>
            </span>
        ),
        width:80,
    }];



    getPlatform(){
        var platform;
        if (this.props.location.pathname.indexOf('ios') > 0) {
            platform = 'ios'
        } else {
            platform = 'android'
        }
        return platform;
    }

    /**
     * 查询，获取元素列表信息
     */
    search = (pageId) => {
        var platform = this.getPlatform();
        this.setState({
            platform: platform,
        })
        var available = this.state.available === '0' ? '' : this.state.available;

        var elementId = this.state.queryTerm.elementId == undefined ? '' : this.state.queryTerm.elementId;
        var elementText = this.state.queryTerm.elementText == undefined ? '' : this.state.queryTerm.elementText;

        var urlPath = `/element/search?platform=${platform}&available=${available}`;
        if (elementId!=='')
            urlPath = urlPath + `&elementId=${elementId}`;
        if (elementText!=='')
            urlPath = urlPath + `&elementText=${elementText}`;
        if (null !== pageId && typeof pageId === 'string') {
            urlPath = urlPath + `&pageId=${pageId}`;
        }
        promiseAjax.get(urlPath).then(data => {
            if (data) {
                //添加元素的顺序编号，在前端展示
                for(var i=0;i<data.length;i++)
                    data[i]["elementNo"] = (i+1).toString();
                // 将数据存入state  渲染页面
                this.setState({
                    elements: data,
                });
            }
        });
    }


    /**
     * 删除
     * @param id
     */

    handleDelete = (id) => {
        const pageId = this.state.pageId;
        promiseAjax.del(`/element/delete/${id}`).then(() => {
            // todo: low一点 重新查询 可以优化
            this.search(pageId);
        });
    }


    selectStatus = (key) => {
        const available = key;
        this.setState({
            available:available,
        })
    }

    selectPage = (key) => {
        this.search(key);
        this.setState({
            pageId:key,
        })

    }

    getQueryTerm = (queryTerm) => {
        console.log('getQueryTerm: ', queryTerm);
        this.setState({
            queryTerm,
        })
    }

    showModal = () => {
        var platform = this.getPlatform();
        promiseAjax.get(`/page/list?platform=${platform}`).then(data => {
            if (data && data.length!==0) {
                this.setState({ data: data });
            }
        });
        this.setState({ visible: true });
    }
    editModal = (record) => {
        var platform = this.getPlatform();
        console.log("record:",record);
        promiseAjax.get(`/page/list?platform=${platform}`).then(data => {
            if (data && data.length!==0) {
                this.setState({ data: data });
            }
        });
        this.setState({
            visible: true,
            element: record,
            isEdit: '1',
        });
    }
    handleCancel = () => {
        this.setState({ visible: false });
    }
    handleCreate = () => {
        const form = this.props.form;
        const pageId = this.state.pageId;
        const element = this.state.element;
        var platform = this.getPlatform();
        form.validateFields((err, values) => {
            if (!err) {
                values.platform = platform;
                if (this.state.isEdit==='1'){
                    values.id = element.id;
                }
                promiseAjax.post('/element/add', values).then(() => {
                    form.resetFields();
                    this.setState({ visible: false });
                    message.info('保存元素成功！');
                    // 创建成功后刷新页面
                    this.search(pageId);
                    this.props.form.resetFields();
                });
            }
        });
    }

    render() {
        const platform = this.getPlatform();
        const data=this.state.data;
        const element = this.state.element;
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
            <Layout>
                <Sider width={260} style={{ background: "#F0F2F5"}}>
                    <div style={{ background: "#fff", padding: 10, minHeight: 1200 }}>
                        <PageDirectory platform={platform} getForm={this.props.form} getQueryTerm={this.getQueryTerm} selectPage={this.selectPage}/>
                    </div>
                </Sider>
                <Content style={{ padding: "0px 0px 0px 20px" }}>
                    <div style={{ background: "#fff", padding: 50, minHeight: 1200 }}>
                        <div className="gutter-example" style={{ padding: " 0px 0px 30px 0px" }}>
                            <div style={{ padding: " 0px 0px 45px 0px" }}>
                                <Row gutter={16} align="middle" >
                                    <Col className="gutter-row" span={2}>
                                        <div className="gutter-box" >状态：</div>
                                    </Col>
                                    <Col className="gutter-row" span={6}>
                                        <DropdownList selectStatus={this.selectStatus} />
                                    </Col>
                                    <Col className="gutter-row" span={4}>
                                        <Button type="primary" onClick={this.search}>查找</Button>
                                    </Col>
                                </Row>
                            </div>
                            <div style={{ padding: " 0px 0px 15px 0px" }}>
                                <Row gutter={16} align="middle" >
                                    <Col className="gutter-row" span={3}>
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
                                                        initialValue:element == null ? '' : element.pageId,
                                                        rules: [{required: true, message: '请选择页面名称!'}],
                                                    })(
                                                        <Select
                                                            style={{width: '100%'}}
                                                            placeholder="请选择页面"
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
                                                    })(
                                                        <Input placeholder="请输入元素xpath"/>
                                                    )}
                                                </FormItem>
                                                <FormItem
                                                    {...formItemLayout}
                                                    label="元素index"
                                                >
                                                    {getFieldDecorator('elementIndex', {
                                                        initialValue: element == null ? '' : element.elementIndex,
                                                    })(
                                                        <Input placeholder="请输入元素index"/>
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
                                    </Col>
                                    <Col className="gutter-row" span={3}>
                                        <Button >批量操作</Button>
                                    </Col>
                                    <Col className="gutter-row" span={3}>
                                        <Button type="dashed">...</Button>
                                    </Col>
                                </Row>
                            </div>
                            <div style={{ padding: " 0px 0px 15px 0px" }}>
                                <Table
                                    columns={this.columns}
                                    rowKey={(record) => record.id}
                                    dataSource={this.state.elements}
                                />
                            </div>
                        </div>
                    </div>
                </Content>
            </Layout>
        )
    }
}




