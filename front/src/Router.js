import React from 'react'
import {
    BrowserRouter,
    Route,
    Link
} from 'react-router-dom'
import TestPlane from './page/test-plane/TestPlane';
import IndexPage from './page/home/IndexPage';
import ElementManage from './page/page-element/ElementManage';
import ElementNew from './page/page-element/ElementNew';
import TestCaseManage from './page/test-case/TestCaseManage';
import TestCase from './page/test-case/TestCase';
import TestPlaneManage from './page/test-plane/TestPlaneManage';
import TestPlaneForm from './page/test-plane/TestPlaneForm';
import { DatePicker, version, Layout, Menu, Breadcrumb } from "antd";
import HeaderMenu from '../src/page/common/HeaderMenu';

const { Header, Content, Footer } = Layout;

export default class Router extends React.Component {

        render() {
            return (
                <BrowserRouter>
                    <Layout className="layout">
                        <HeaderMenu />
                        <Content style={{padding: 30 }}>
                            <div>
                                <Route exact path="/testplane" component={TestPlane}/>
                                <Route path="/index" component={IndexPage}/>
                                <Route path="/elementlist/android"  component={ElementManage}/>
                                <Route path="/elementlist/ios" component={ElementManage}/>
                                <Route path="/addelement" component={ElementNew}/>
                                <Route path="/testcasemanage" component={TestCaseManage}/>
                                <Route path="/addtestcase" component={TestCase}/>
                                <Route path="/testplanemanage" component={TestPlaneManage}/>
                                <Route path="/addplane" component={TestPlaneForm}/>
                            </div>
                        </Content>
                        <Footer style={{textAlign: "center"}}>
                            Ant Design ©2017 Created by QA
                        </Footer>
                    </Layout>

                </BrowserRouter>
            )
        }

}