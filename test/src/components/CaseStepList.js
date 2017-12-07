import { Table, Icon, Divider,Menu, Dropdown, Button, message } from 'antd';
import DropdownList from './DropdownList';



const data = [{
  key: '1',
  stepNo: '1',
  status: '通过',
}, {
  key: '2',
  stepNo: '2',
  status: '失败',
}];

const CaseStepList = ({ onDelete, products }) => {
  const columns = [{
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
        <a href="#">添加</a>
        <Divider type="vertical" />
        <a href="#">删除</a>
      </span>
    ),
  }];
  return (
    <Table
      dataSource={data}
      columns={columns}
    />
  );
};




CaseStepList.propTypes = {
};

export default CaseStepList;