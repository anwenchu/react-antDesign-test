import React from "react";
import "antd/dist/antd.css";
import { Table, Icon, Divider,Popconfirm } from 'antd';
import {
    Link
} from 'react-router-dom'

/*
*测试计划管理页面（TestPlaneManage）的测试计划列表模块
* 数据：来自testPlane表
*/



export default class TestPlaneList extends React.Component {

    state = {
        data : [{
            key: '1',
            caseNo: '1',
            caseTile: 'New York No. 1 Lake Park',
            caseStatus: 'android851',
        }, {
            key: '2',
            caseNo: '2',
            caseTile: 'New York No. 1 Lake Park',
            caseStatus: 'ios851',
        }],
    };

    columns = [{
        title: '编号',
        dataIndex: 'caseNo',
    }, {
        title: '计划标题',
        dataIndex: 'caseTile',
        render: text => <a href="#"><Link to={"testplane"}>{text}</Link></a> ,
    }, {
        title: '客户端版本',
        dataIndex: 'caseStatus',
    }, {
        title: '操作',
        dataIndex: 'action',
        render: (text, record) => (
            <span>
                <Popconfirm title="Delete?" onConfirm={e => this.onDelete(record.key, e)}>
                    <a href="#">删除</a>
                </Popconfirm>
            </span>
        ),
    }];

    onDelete(key, e) {
        console.log('Delete', key);
        e.preventDefault();
        const data = this.state.data.filter(item => item.key !== key);
        console.log('Delete', data);
        this.setState({ data });
    }

    render() {
        return (
            <div style={{ margin: 5 }}>
                <Table
                    dataSource={this.state.data}
                    columns={this.columns}
                />
            </div>
        );
    }

};


