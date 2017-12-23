import React from "react";
import { Table,Divider,Input } from 'antd';
import {
    Link
} from 'react-router-dom'
/*
*新建测试计划页面（TestPlane）表单中的用例列表模块
* 数据：新建测试计划的时候数据来自testCase表，展示为所选的用例目录的下的用例数据；编辑
* 测试计划的时候，数据数据来自testPlaneCase表。保存测试计划的时候，会将用例信息存入testPlaneCase表
*/



export default class TestPlaneCaseList extends React.Component {

    constructor(props) {
        super(props);
        this.columns = [{
            title: '编号',
            dataIndex: 'caseNo',
        }, {
            title: '用例标题',
            dataIndex: 'caseTile',
            render: text => <a href="#"><Link to={"/addtestcase"}>{text}</Link></a>,
        }, {
            title: '执行次数',
            dataIndex: 'count',
            render: () => <Input placeholder="1" />
        }, {
            title: '操作',
            dataIndex: 'action',
            render: (text, record) => (
                <span>
                    <a href="#" onClick={e => this.upMove(record.key,e)}>上移</a>
                    <Divider type="vertical" />
                    <a href="#" onClick={e => this.downMove(record.key,e)}>下移</a>
                </span>
            ),
        }];
        this.state = {
            data : [{
                key: '1',
                caseNo: '用例编号1',
                caseTile: '测试用例11111111',
                count: '通过',
            }, {
                key: '2',
                caseNo: '用例编号2',
                caseTile: '测试用例222222222',
                count: '失败',
            }],
        };
    }
    upMove(key,e) {

        const data = [...this.state.data];
        e.preventDefault();
        var key_i = parseInt(key);

        if (key_i > 1)
        {
            var temp = data[key_i-2];
            data[key_i-2] = data[key_i-1];
            data[key_i-1] = temp;

            var tempKey = data[key_i-2].key;
            data[key_i-2].key = data[key_i-1].key;
            data[key_i-1].key = tempKey;
        }
        this.setState({ data });
    }

    downMove(key, e) {

        const data = [...this.state.data];
        e.preventDefault();
        var key_i = parseInt(key);

        if (key_i < data.length)
        {
            var temp = data[key_i];
            data[key_i] = data[key_i-1];
            data[key_i-1] = temp;

            var tempKey = data[key_i].key;
            data[key_i].key = data[key_i-1].key;
            data[key_i-1].key = tempKey;
        }
        this.setState({ data });

    }

    render() {
        // rowSelection object indicates the need for row selection
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked

            }),
        };

        return (
            <Table rowSelection={rowSelection} columns={this.columns} dataSource={this.state.data}/>
        );
    }
}


