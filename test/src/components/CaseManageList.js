import { Table,Divider } from 'antd';
/*
*测试用例管理页面（TestCaseManage）的用例列表模块
* 数据：取at_testCase表里的数据，根据所选用例目录取
*/


const columns = [{
  title: '编号',
  dataIndex: 'caseNo',
}, {
  title: '用例标题',
  dataIndex: 'caseTile',
  render: text => <a href="#">{text}</a>,
}, {
  title: '状态',
  dataIndex: 'caseStatus',
}, {
  title: '操作',
  dataIndex: 'action',
  render: (text, record) => (
    <span>
      <a href="#">删除</a>
      <Divider type="vertical" />
      <a href="#">订阅警报</a>
    </span>
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
