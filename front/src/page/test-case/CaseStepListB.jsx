import React from 'react';
import ReactDOM from 'react-dom';
import Table from 'rc-table';
import Animate from 'rc-animate';
import 'rc-table/assets/index.css';
import 'rc-table/assets/animation.css';
import PropTypes from 'prop-types';
import "antd/dist/antd.css";
import { Icon, Divider,Menu, Dropdown, Button, Select } from 'antd';
import DropdownList from '../common/DropdownList';

const AnimateBody = (props) =>
    <Animate transitionName="move" component="tbody" {...props} />;
const Option = Select.Option;
const provinceData = ['Zhejiang', 'Jiangsu'];
const cityData ={
    Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
    Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
};

export default class CaseStepListB extends React.Component {

//    constructor(props) {
//        super(props);
        columns = [{
            title: '编号',
            dataIndex: 'stepNo',
            key: 'stepNo',
            width: 50
        }, {
            title: '页面',
            dataIndex: 'page',
            key: 'page',
            render: (text, record) => (
                <Select defaultValue={provinceData[0]} style={{ width: 90 }} onChange={e => this.onProvinceChange(record.key,e)}>
                    {this.state.provinceOptions}
                </Select>
            ),
            width: 120
        }, {
            title: '操作对象',
            dataIndex: 'element',
            key: 'element',
            render: (text, record) => (
                <Select value={this.state.secondCityList[parseInt(record.key)-1]} style={{ width: 90 }} onChange={e =>this.onSecondCityChange(record.key,e)}>
                    {this.state.cityOptions}
                </Select>
            ),
            width: 120
        }, {
            title: '步骤描述',
            dataIndex: 'step',
            key: 'step',
            render: (text, record) => (
                <DropdownList />
            ),
            width: 400
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
        state = {
            data: [{
                key: '1',
                stepNo: '1',
                status: '通过',
            }],
            secondCity: cityData[provinceData[0]][0],
            provinceOptions: [],
            cityOptions: [],
            citiesList:[cityData[provinceData[0]]],
            secondCityList:[cityData[provinceData[0]][0]],

        };
 //   }

    componentDidMount() {
        // 页面渲染完成，进行一次查询

        this.provinceOptions()
        this.cityOptions();
    }

    onProvinceChange(key,value){
        console.log('onProvinceChange-value:', value);
        console.log('onProvinceChange-key:', key);
        var key_i =  parseInt(key);
        var citiesList = [...this.state.citiesList];
        var secondCityList = [...this.state.secondCityList];
        citiesList[key_i-1] = cityData[value];
        secondCityList[key_i-1] = cityData[value][0]
        this.setState({
            cities: cityData[value],
            secondCity: cityData[value][0],
            citiesList : citiesList,
            secondCityList : secondCityList,

        });
    }

    onSecondCityChange (key,value) {
        var key_i =  parseInt(key);
        var secondCityList = [...this.state.secondCityList];
        secondCityList[key_i-1] = value;
        this.setState({
            secondCity: value,
            secondCityList : secondCityList,
        });
    }
    cityOptions () {
        const cityOptions = cityData[provinceData[0]].map(city => <Option key={city}>{city}</Option>);
        this.setState({
            cityOptions : cityOptions,
        });
    }
    provinceOptions(key){
        console.log('provinceOptions-key:', key);
        const data = provinceData.map(province => <Option key={province}>{province}</Option>);
        this.setState({
            provinceOptions: data
        });
    }

    onDelete(key, e) {
        console.log('Delete', key);
        e.preventDefault();
        const data = this.state.data.filter(item => item.key !== key);
        this.setState({ data });
    }

    onAdd(key, e) {

        const data = [...this.state.data];
        const citiesList = [...this.state.data];
        const secondCityList = [...this.state.data];
        citiesList.push(cityData[provinceData[0]]);
        secondCityList.push(cityData[provinceData[0]][0]);
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
