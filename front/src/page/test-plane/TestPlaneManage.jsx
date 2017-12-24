import React from "react";
import { version, Layout, Popconfirm, Divider,Row, Col ,Table, Button} from "antd";
import "antd/dist/antd.css";
import {
    Link
} from 'react-router-dom'
import {promiseAjax} from "../common/an";
/*
*页面名称：测试计划管理页面
* 入口：点击导航中的测试计划管理进入（ios入口进入数据为ios测试计划，android入口进入数据为android测试计划）
*/

const { Header, Content, Footer } = Layout;


export default class TestPlaneManage extends React.Component {


    state = {
        testPlane:[],
    };

    columns = [{
        title: '编号',
        dataIndex: 'id',
    }, {
        title: '计划标题',
        dataIndex: 'testPlaneName',
        render: text => <a href="#"><Link to={"/addplane"}>{text}</Link></a> ,
    }, {
        title: '客户端版本',
        dataIndex: 'appVersion',
    }, {
        title: '操作',
        dataIndex: 'action',
        render: (text, record) => (
            <span>
                <Popconfirm title="Delete?" onConfirm={e => this.handleDelete(record.id, e)}>
                    <a href="#">删除</a>
                </Popconfirm>
            </span>
        ),
    }];


    // 获取平台信息
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
        //ajax get请求  url 路径
        var platform = this.getPlatform();

        promiseAjax.get(`/plane/list?platform=${platform}`).then(data => {
            if (data) {
                //添加元素的顺序编号，在前端展示
                for(var i=0;i<data.length;i++)
                    data[i]["elementNo"] = (i+1).toString();
                // 将数据存入state  渲染页面
                this.setState({
                    testPlane: data,
                });
            }
        });
    }


    // react 生命周期函数
    componentDidMount() {
        //初始化数据
        this.search()
    }


    /**
     * 删除
     * @param id
     */

    handleDelete = (id) => {
        promiseAjax.del(`/plane/delete/${id}`).then(() => {
            // todo: low一点 重新查询 可以优化
            this.search();
        });
    }



    render() {
        const platform = this.getPlatform();
        return(
            <Content>
                <div style={{ background: "#fff", padding: 20, minHeight: 450 }}>
                    <div style={{ padding: " 10px 0px 20px 0px" }}>
                        <Button type="primary" ><Link to={{platform:platform,pathname:"/addplane"}}>+ 新建测试计划</Link></Button>
                    </div>
                    <div style={{ padding: " 0px 0px 15px 0px" }}>
                        <Table
                            dataSource={this.state.testPlane}
                            columns={this.columns}
                        />
                    </div>
                </div>
            </Content>
        )
    }
}


