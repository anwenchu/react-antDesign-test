import React from 'react';
import ReactDOM from 'react-dom';
import Table from 'rc-table';
import Animate from 'rc-animate';
import 'rc-table/assets/index.css';
import 'rc-table/assets/animation.css';
import PropTypes from 'prop-types';
import "antd/dist/antd.css";
import { Icon, Divider,Menu, Dropdown, Button, Popconfirm } from 'antd';
import DropdownList from '../common/DropdownList';

const AnimateBody = (props) =>
    <Animate transitionName="move" component="tbody" {...props} />;

export default class TestA extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: '编号',
            dataIndex: 'stepNo',
            key: 'stepNo',
            width: 50
        }, {
            title: '页面',
            dataIndex: 'page',
            key: 'page',
            render: (text, record) => (
                <DropdownList />
            ),
            width: 120
        }, {
            title: '操作对象',
            dataIndex: 'element',
            key: 'element',
            render: (text, record) => (
                <DropdownList />
            ),
            width: 120
        }, {
            title: '步骤描述',
            dataIndex: 'step',
            key: 'step',
            render: (text, record) => (
                <DropdownList />
            ),
            width: 250
        }, {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: 50
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a onClick={e => this.onAdd(record.key,e)} href="#">添加</a>
                    <Divider type="vertical" />
                    <a onClick={e => this.onDelete(record.key, e)} href="#">删除</a>
                </span>
            ),
        }];
        this.state = {
            data: [{
                key: '1',
                stepNo: '1',
                status: '通过',
            }, {
                key: '2',
                stepNo: '2',
                status: '失败',
            }],
        };
    }

    onDelete(key, e) {
        console.log('Delete', key);
        e.preventDefault();
        const data = this.state.data.filter(item => item.key !== key);
        this.setState({ data });
    }

    onAdd(key, e) {

        const data = [...this.state.data];
        var key_i = parseInt(key)
        var stepNo = key_i + 1
        var el = {
            stepNo: stepNo.toString(),
            key: stepNo.toString(),
        }

        data.splice(key_i, 0, el);
        for (var i=0;i<data.length;i++)
        {
            if (i>key_i)
            {
                data[i].stepNo = (parseInt(data[i].stepNo) + 1).toString();
                data[i].key = data[i].stepNo;

            }
        }

        this.setState({ data });
    }

    render() {
        return (
            <div style={{ margin: 5 }}>
                <Table
                    columns={this.columns}
                    data={this.state.data}
                    components={{
                        body: { wrapper: AnimateBody },
                    }}
                />
            </div>
        );
    }
}
