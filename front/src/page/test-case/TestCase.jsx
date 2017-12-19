import React from "react";
import { version, Layout, Menu, Select, Divider,Input,Row, Col ,Table, Icon,Dropdown, Button,message} from "antd";
import "antd/dist/antd.css";
import Directory from './Directory';
import TableRC from 'rc-table';
import Animate from 'rc-animate';
import 'rc-table/assets/index.css';
import 'rc-table/assets/animation.css';;
import DropdownList from '../common/DropdownList';

/*
*页面名称：新建、保存用例页面
* 入口：点击测试管理页面中的新建进入
*/


const { Header, Content, Footer, Sider } = Layout;
const AnimateBody = (props) =>
    <Animate transitionName="move" component="tbody" {...props} />;
const Option = Select.Option;
const provinceData = ['访客页', '登录页'];
const cityData ={
    访客页: ['登录按钮', '注册按钮', 'qq登录入口'],
    登录页: ['账号文本框', '密码文本框', '登录按钮'],
};

export default class TestCase extends React.Component {
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
                <Select size={"small"} defaultValue={provinceData[0]} style={{ width: 110 }} onChange={e => this.onProvinceChange(record.key,e)}>
                    {this.state.provinceOptions}
                </Select>
            ),
            width: 120
        }, {
            title: '操作对象',
            dataIndex: 'element',
            key: 'element',
            render: (text, record) => (
                <Select size={"small"} value={this.state.secondCityList[parseInt(record.key)-1]} style={{ width: 110 }} onChange={e =>this.onSecondCityChange(record.key,e)}>
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
        this.state = {
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
    }

    componentDidMount() {
        // 页面渲染完成，进行一次查询

        this.provinceOptions()
        this.cityOptions();
    }

    onProvinceChange(key,value){
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
            <Layout>
                <Sider width={260} style={{background: "#F0F2F5"}}>
                    <div style={{background: "#fff", padding: 10, minHeight: 960}}>
                        <Directory/>
                    </div>
                </Sider>
                <Content style={{padding: "0px 0px 0px 20px"}}>
                    <div style={{background: "#fff", padding: 50, minHeight: 960}}>
                        <div className="gutter-example" style={{padding: " 0px 0px 30px 0px"}}>
                            <div style={{padding: " 0px 0px 15px 0px"}}>
                                <Row gutter={16} align="middle">
                                    <Col className="gutter-row" span={3}>
                                        <div className="gutter-box">用例标题：</div>
                                    </Col>
                                    <Col className="gutter-row" span={21}>
                                        <div className="gutter-box">
                                            <Input placeholder="请输入用例标题"/>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <div>
                                <Row gutter={16} align="middle">
                                    <Col className="gutter-row" span={4}>
                                        <div className="gutter-box">前置用例依赖：</div>
                                    </Col>
                                    <Col className="gutter-row" span={6}>
                                        <div className="gutter-box">
                                            <Input placeholder="请输入用例编号"/>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div className="caseStepList">
                            <div style={{margin: 5}}>
                                <TableRC
                                    columns={this.columns}
                                    data={this.state.data}
                                    components={{
                                        body: {wrapper: AnimateBody},
                                    }}
                                />
                            </div>
                        </div>
                        <div className="gutter-example">
                            <div style={{padding: " 30px 0px 0px 0px"}}>
                                <Row gutter={16} align="middle">
                                    <Col className="gutter-row" span={4}>
                                        <div className="gutter-box">后置用例依赖：</div>
                                    </Col>
                                    <Col className="gutter-row" span={6}>
                                        <div className="gutter-box">
                                            <Input placeholder="请输入用例编号"/>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <div style={{padding: " 30px 0px 0px 0px"}}>
                                <Row gutter={16} align="middle">
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
}


