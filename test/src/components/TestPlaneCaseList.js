import { Table,Divider,Input } from 'antd';
/*
*新建测试计划页面表单中的用例列表模块
*/

const columns = [{
  title: '编号',
  dataIndex: 'caseNo',
}, {
  title: '用例标题',
  dataIndex: 'caseTile',
  render: text => <a href="#">{text}</a>,
}, {
  title: '执行次数',
  dataIndex: 'count',
  render: () => <Input placeholder="1" />
}, {
  title: '操作',
  dataIndex: 'action',
  render: (text, record) => (
    <span>
      <a href="#">上移</a>
      <Divider type="vertical" />
      <a href="#">下移</a>
    </span>
  ),
}];
const data = [{
  key: '1',
  caseNo: 'John Brown',
  caseTile: 'New York No. 1 Lake Park',
  count: '通过',
}, {
  key: '2',
  caseNo: 'John Brown',
  caseTile: 'New York No. 1 Lake Park',
  count: '失败',
}];

const TestPlaneCaseList = () => {
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
    <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
  );
};



TestPlaneCaseList.propTypes = {
};

export default TestPlaneCaseList;
