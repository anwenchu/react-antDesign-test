import React from "react";
import { version, Layout, Popconfirm, Divider,Row, Col ,Table, Button} from "antd";
import "antd/dist/antd.css";
import {promiseAjax} from "../common/an";
/*
*页面名称：测试结果页面
* 入口：测试计划列表进入，查看每条用例的执行结果
*/

const { Header, Content, Footer } = Layout;


export default class TestCaseResult extends React.Component {

    state = {
        data : [],
        platform:'',
        dirId:'',
    };
    columns = [{
        title: '执行顺序',
        dataIndex: 'caseOrder',
        width: 70
    }, {
        title: '用例编号',
        dataIndex: 'caseId',
        width: 70
    }, {
        title: '用例标题',
        dataIndex: 'caseTitle',
        width: 350
    }, {
        title: '执行结果',
        dataIndex: 'caseResult',
        width: 80
    }];

    // react 生命周期函数  自己百度
    componentDidMount() {
        // 页面渲染完成，进行一次查询
        this.search()
    }


    /**
     * 查询，获取用例列表信息
     */
    search = () => {

        var planeId = this.props.location.planeId;
        console.log("this.props:",planeId);
        // 用例列表接口
        promiseAjax.get(`/planecase/result?planeId=${planeId}`).then(data => {
            if (data){
                this.setState({
                    data: data,
                });
            }
        });


    }


    render() {

        return(
            <Layout>
                <Content style={{ padding: " 0px 0px 0px 20px" }}>
                    <div style={{ background: "#fff", padding: 50, minHeight: 960 }}>
                        <div className="gutter-example" style={{ padding: " 0px 0px 30px 0px" }}>
                            <div style={{ padding: " 0px 0px 15px 15px" ,textAlign:"center",fontSize:20}}>
                                测试结果
                            </div>
                            <div style={{ padding: " 0px 0px 15px 0px" }}>
                                <Table
                                    dataSource={this.state.data}
                                    columns={this.columns}
                                />
                            </div>
                        </div>
                    </div>
                </Content>
            </Layout>
        )
    }
}


