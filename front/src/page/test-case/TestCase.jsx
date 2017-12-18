import React from "react";
import { DatePicker, version, Layout, Menu, Breadcrumb, Divider,Input,Row, Col ,Table, Icon,Dropdown, Button,message} from "antd";
import "antd/dist/antd.css";
import Directory from './Directory';
import CaseStepListB from './CaseStepListB';
import CaseStepListA from './CaseStepListA';

/*
*页面名称：新建、保存用例页面
* 入口：点击测试管理页面中的新建进入
*/


const { Header, Content, Footer, Sider } = Layout;

const TestCase = ({ dispatch, CaseStep }) => {
    function handleDelete(id) {
        dispatch({
            type: 'products/delete',
            payload: id,
        });
    }
    return(
        <Layout>
            <Sider width={260} style={{ background: "#F0F2F5" }}>
                <div style={{ background: "#fff", padding: 10, minHeight: 960 }}>
                    <Directory />
                </div>
            </Sider>
            <Content style={{ padding: "0px 0px 0px 20px" }}>
                <div style={{ background: "#fff", padding: 50, minHeight: 960 }}>
                    <div className="gutter-example" style={{ padding: " 0px 0px 30px 0px" }}>
                        <div style={{ padding: " 0px 0px 15px 0px" }}>
                            <Row gutter={16} align="middle" >
                                <Col className="gutter-row" span={3}>
                                    <div className="gutter-box" >用例标题：</div>
                                </Col>
                                <Col className="gutter-row" span={21}>
                                    <div className="gutter-box" >
                                        <Input placeholder="请输入用例标题" />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div>
                            <Row gutter={16} align="middle">
                                <Col className="gutter-row" span={4}>
                                    <div className="gutter-box" >前置用例依赖：</div>
                                </Col>
                                <Col className="gutter-row" span={6}>
                                    <div className="gutter-box" >
                                        <Input placeholder="请输入用例编号" />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className="caseStepList">
                        <CaseStepListB />
                    </div>
                    <div className="gutter-example">
                        <div>
                            <Row gutter={16} align="middle">
                                <Col className="gutter-row" span={4}>
                                    <div className="gutter-box" >后置用例依赖：</div>
                                </Col>
                                <Col className="gutter-row" span={6}>
                                    <div className="gutter-box" >
                                        <Input placeholder="请输入用例编号" />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div style={{ padding: " 30px 0px 0px 0px" }}>
                            <Row gutter={16} align="middle" >
                                <Col className="gutter-row" offset={20} span={2}>
                                    <Button type="primary">保存</Button>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </Content>
        </Layout>
    );
}

export default TestCase;

