import { Table, Icon, Divider } from 'antd';



const data = [{
  key: '1',
  caseNo: '1',
  caseTile: 'New York No. 1 Lake Park',
  caseStatus: 'android851',
}, {
  key: '2',
  caseNo: '2',
  caseTile: 'New York No. 1 Lake Park',
  caseStatus: 'ios851',
}];

const TestPlaneList = () => {
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

  return (
    <Table columns={columns} dataSource={data} />
  );
};



TestPlaneList.propTypes = {
};

export default TestPlaneList;