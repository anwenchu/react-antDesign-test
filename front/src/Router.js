import React from 'react'
import {
    BrowserRouter,
    Route,
    Link
} from 'react-router-dom'
import TestPlane from './page/common/TestPlane';
import IndexPage from './page/common/IndexPage';
import { DatePicker, version, Layout, Menu, Breadcrumb } from "antd";
import HeaderMenu from '../src/page/common/HeaderMenu';

const { Header, Content, Footer } = Layout;

export default class Router extends React.Component {

        render() {
            return (
                <BrowserRouter>
                    <Layout className="layout">
                        <HeaderMenu />
                        <Content style={{padding: " 50px"}}>
                            <div>
                                <Route exact path="/TestPlane" component={TestPlane}/>
                                <Route path="/IndexPage" component={IndexPage}/>
                                {/*<Route path="/topics" component={Topics}/>*/}
                            </div>
                        </Content>
                        <Footer style={{textAlign: "center"}}>
                            Ant Design ©2017 Created by Ant UED
                        </Footer>
                    </Layout>

                </BrowserRouter>
            )
        }

}