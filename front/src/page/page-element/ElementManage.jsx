import React from "react";
import { DatePicker, version, Layout, Menu, Breadcrumb, Divider,Input,Row, Col ,Table, Icon,Dropdown, Button,message} from "antd";
import PageDirectory from './PageDirectory';
import DropdownList from '../common/DropdownList';
import {
    Link
} from 'react-router-dom'
import {promiseAjax} from '../common/an';

/*
*页面名称：页面元素管理
* 入口：点击顶部导航中的元素管理进入（ios元素管理点击进入后数据为ios元素数据，android同理）
*/

const {Content, Sider } = Layout;
const menu = (
    <Menu onClick={handleMenuClick}>
        <Menu.Item key="1">下拉列表内</Menu.Item>
    </Menu>
);


function handleMenuClick(e) {
    message.info('Click on menu item.');
    console.log('click', e);
}

export default class ElementManage extends React.Component{
    // 一个全局状态 改变后会从新渲染页面
    state = {
        elements: [],
        id: '',
        status: '',
        platform : '', //平台信息，前一个页面传值过来，默认为android
    }

    // react 生命周期函数  自己百度
    componentDidMount() {
        // 页面渲染完成，进行一次查询
        this.search()
    }


    columns = [{
        title: '编号',
        dataIndex: 'elementNo',
    }, {
        title: '元素名称',
        dataIndex: 'elementName',
    }, {
        title: '元素类型',
        dataIndex: 'elementCategory',
    }, {
        title: '元素id',
        dataIndex: 'elementId',
    }, {
        title: '元素文本',
        dataIndex: 'elementText',
    }, {
        title: '操作',
        dataIndex: 'action',
        render: (text, record) => (

            <span>
                <a onClick={() => this.handleEdit(record.id)}>编辑</a>
                <Divider type="vertical"/>
                <a  onClick={() => this.handleDelete(record.id)}>删除</a>
            </span>
        ),
    }];
    data = [{
        key: '1',
        elementNo: '1',
        elementName: '元素1',
        elementCategory: '1',
        elementId: 'id',
        elementText: 'android851',
        elementXY: '1',
        elementXpath: 'xxxx',
        elementDes: 'android851',
    }];



    search = () => {
        //ajax get请求  url 路径
        const status = this.state.status;
        var platform;
        if (this.props.location.pathname.indexOf('ios') > 0) {
            this.setState({
                platform: 'ios'
            })
            platform = 'ios'
        } else {
            this.setState({
                platform: 'android'
            })
            platform = 'android'

        }
        promiseAjax.get(`/element/search?status=${status}&platform=${platform}`).then(data => {
            console.log('data: ', data);
            if (data && data.length) {
                // 将数据存入state  渲染页面
                this.setState({
                    elements: data,
                    status: '',
                });
            }
        });
    }


    /**
     * 删除
     * @param id
     */

    handleDelete = (id) => {
        promiseAjax.del(`/element/${id}`).then(() => {
            // todo: low一点 重新查询 可以优化
            this.search();
        });
    }



    /**
     *
     * @param id
     */
    handleEdit = (id) => {

        const platfrominfo = this.state.platform;
        const editPath = {
            pathname: '/addelement',
            query: 'edit',
            id,
            platform:platfrominfo,
        }
        console.log("elemanage-handleEdit-editPath:",editPath);
        console.log("elemanage-handleEdit-history1:",this.props.history);
        this.props.history.push(editPath);
        console.log("elemanage-handleEdit-history2:",this.props.history);

    }

    selectStatus = (status) => {
        this.setState({
            status
        })
    }

    /**
     *
     * @param id
     */
    handleClick = (key) => {
        const platfrominfo = this.state.platform;
        console.log("elemanage-handleClick-state:",this.state.platform);
        const editPath = {
            pathname : '/addelement',
            platform : platfrominfo,
        }
        console.log("elemanage-handleClick-history1:",this.props.history);
        this.props.history.push(editPath);
        console.log("elemanage-handleClick-history2:",this.props.history);
    }

    selectStatus = (status) => {
        this.setState({
            status
        })
    }

    render() {

        const platforminfo = this.state.platform;
        return (
            <Layout>
                <Sider width={260} style={{ background: "#F0F2F5"}}>
                    <div style={{ background: "#fff", padding: 10, minHeight: 960 }}>
                        <PageDirectory platform={platforminfo}/>
                    </div>
                </Sider>
                <Content style={{ padding: "0px 0px 0px 20px" }}>
                    <div style={{ background: "#fff", padding: 50, minHeight: 960 }}>
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
                                        <Button type="primary" onClick={this.handleClick}><Link to={'/addelement'}> + 新建</Link></Button>
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
                                    dataSource={this.state.elements}/>
                            </div>
                        </div>
                    </div>
                </Content>
            </Layout>
        )
    }
}




