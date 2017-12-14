import React from "react";
import "antd/dist/antd.css";
import { Table,Divider,Popconfirm } from 'antd';
/*
*测试用例管理页面（TestCaseManage）的用例列表模块
* 数据：取at_testCase表里的数据，根据所选用例目录取
*/




export default class CaseManageList extends React.Component {

    state = {
        data : [{
            key: '1',
            caseNo: '1',
            caseTile: '测试用例标题1',
            caseStatus: '通过',
        }, {
            key: '2',
            caseNo: '2',
            caseTile: '测试用例标题2，测试用例标题2',
            caseStatus: '失败',
        }],
    };
    columns = [{
        title: '编号',
        dataIndex: 'caseNo',
    }, {
        title: '用例标题',
        dataIndex: 'caseTile',
        render: text => <a href="#">{text}</a>,
    }, {
        title: '状态',
        dataIndex: 'caseStatus',
    }, {
        title: '操作',
        dataIndex: 'action',
        render: (text, record) => (
            <span>
                <Popconfirm title="Delete?" onConfirm={e => this.onDelete(record.key, e)}>
                    <a href="#">删除</a>
                </Popconfirm>
                <Divider type="vertical" />
                <a href="#">订阅警报</a>
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


