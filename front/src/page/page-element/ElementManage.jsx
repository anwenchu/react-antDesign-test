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
        platform : '', //平台信息，前一个页面传值过来，默认为android
        available : '0', //按状态查询标记,0:全部元素，1：可用，2：不可用
        elementId : '',  //按照元素id查询标志
        elementText : '', //按照元素文本查询标志
        pageId : '',//当前所选中的所属页面

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
    search = () => {
        console.log("search---pageId:",this.state.pageId);
        //ajax get请求  url 路径
        var platform = this.getPlatform();
        this.setState({
            platform: platform,
        })
        var available = this.state.available;
        var elementId = this.state.elementId;
        var elementText = this.state.elementText;
        var urlPath = `/element/search?platform=${platform}&available=${available}`;
        if (elementId!=='')
            urlPath = urlPath + `&elementId=${elementId}`;
        if (elementText!=='')
            urlPath = urlPath + `&elementText=${elementText}`;
        promiseAjax.get(urlPath).then(data => {
            console.log('data: ', data);
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
        promiseAjax.del(`/element/delete/${id}`).then(() => {
            // todo: low一点 重新查询 可以优化
            this.search();
        });
    }



    /**
     * 编辑
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
        this.props.history.push(editPath);
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

    selectStatus = (key) => {
        const available = key;
        this.setState({
            available:available,
        })
    }

    selectPage = (key) => {
        const pageId = key;
        this.setState({
            pageId:pageId,
        })
        this.search();
        console.log("selectPage---pageId:",pageId);

    }

    render() {
        const platform = this.getPlatform();
        return (
            <Layout>
                <Sider width={260} style={{ background: "#F0F2F5"}}>
                    <div style={{ background: "#fff", padding: 10, minHeight: 960 }}>
                        <PageDirectory platform={platform} selectPage={this.selectPage}/>
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




