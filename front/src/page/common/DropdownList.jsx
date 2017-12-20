import React from "react";
import { Form, Icon, Divider,Menu, Dropdown, Button, Select } from 'antd';
/*
*各个页面用到的下拉列表
*/
const Option = Select.Option;
const FormItem = Form.Item;

export default class DropdownList extends React.Component{
    handleMenuClick = (key) => {
        console.log('click----', key);
        this.props.selectStatus(key);
    }
    render() {
        return(
            <Select
                style={{width: '100%'}}
                placeholder="请选择状态"
                notFoundContent="暂无数据"
                onSelect={this.handleMenuClick}
            >
                <Option key="0">全部</Option>
                <Option key="1">可用</Option>
                <Option key="2">不可用</Option>
            </Select>
        )
    }
};
