import { Table, Icon, Divider } from 'antd';

const columns = [{
  title: '编号',
  dataIndex: 'stepNo',
  key: 'stepNo',
  render: text => <a href="#">{text}</a>,
}, {
  title: '页面',
  dataIndex: 'page',
  key: 'page',
}, {
  title: '操作对象',
  dataIndex: 'address',
  key: 'address',
}, {
  title: '步骤描述',
  dataIndex: 'address',
  key: 'address',
}, {
  title: '状态',
  dataIndex: 'address',
  key: 'address',
}, {
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="#">Action 一 {record.name}</a>
      <Divider type="vertical" />
      <a href="#">Delete</a>
      <Divider type="vertical" />
      <a href="#" className="ant-dropdown-link">
        More actions <Icon type="down" />
      </a>
    </span>
  ),
}];

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}];

const CaseStepList = ({ onDelete, products }) => {
  const columns = [{
    title: 'Name',
    dataIndex: 'name',
  }, {
    title: 'Actions',
    render: (text, record) => {
      return (
        <Popconfirm title="Delete?" onConfirm={() => onDelete(record.id)}>
          <Button>Delete</Button>
        </Popconfirm>
      );
    },
  }];
  return (
    <Table
      dataSource={products}
      columns={columns}
    />
  );
};

ReactDOM.render(<Table columns={columns} dataSource={data} />, mountNode);

CaseStepList.propTypes = {
};

export default CaseStepList;