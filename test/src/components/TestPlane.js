import { Table,Divider } from 'antd';

const columns = [{
  title: '编号',
  dataIndex: 'caseNo',
}, {
  title: '计划标题',
  dataIndex: 'caseTile',
  render: text => <a href="#">{text}</a>,
}, {
  title: '客户端版本',
  dataIndex: 'caseStatus',
}, {
  title: '操作',
  dataIndex: 'action',
  render: (text, record) => (
    <a href="#">删除</a>
  ),
}];
const data = [{
  key: '1',
  caseNo: 'John Brown',
  caseTile: 'New York No. 1 Lake Park',
  caseStatus: '通过',
}, {
  key: '2',
  caseNo: 'John Brown',
  caseTile: 'New York No. 1 Lake Park',
  caseStatus: '失败',
}];

const CaseManageList = () => {
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



CaseManageList.propTypes = {
};

export default CaseManageList;