import React from 'react'
import PropTypes from 'prop-types';
import "antd/dist/antd.css";
import { Table, Icon, Divider,Menu, Dropdown, Button, Popconfirm } from 'antd';
import DropdownList from '../common/DropdownList';
/*
*新建测试用例页面（TestCase）的用例步骤模块
* 数据：数据来自testCaseStep表，根据用例id来存储和读取
*/



export default class TestA extends React.Component {

    state = {
        data:[{
            key: '1',
            stepNo: '1',
            status: '通过',
        }, {
            key: '2',
            stepNo: '2',
            status: '失败',
        }],
    };

    onDelete(key, e) {
        console.log('Delete', key);
        e.preventDefault();
        const data = this.state.data.filter(item => item.key !== key);
        this.setState({ data });
    }

    onAdd() {
        const data = [...this.state.data];
        data.push({
            key: Date.now(),
            stepNo: 'new data',

        });
        this.setState({ data });
    }

    columns = [{
        title: '编号',
        dataIndex: 'stepNo',
        key: 'stepNo',
    }, {
        title: '页面',
        dataIndex: 'page',
        key: 'page',
        render: (text, record) => (
            <DropdownList />
        ),
    }, {
        title: '操作对象',
        dataIndex: 'element',
        key: 'element',
        render: (text, record) => (
            <DropdownList />
        ),
    }, {
        title: '步骤描述',
        dataIndex: 'step',
        key: 'step',
        render: (text, record) => (
            <DropdownList />
        ),
    }, {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
    }, {
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <span>
                <a onClick={e => this.onAdd(record.key, e)} href="#">添加</a>
                <Divider type="vertical" />
                <a onClick={e => this.onDelete(record.key, e)} href="#">删除</a>
            </span>
        ),
    }];

    render() {
        return (
            <div style={{ margin: 20 }}>
                <Table
                    dataSource={this.state.data}
                    columns={this.columns}
                />
            </div>
        );
    }

};


