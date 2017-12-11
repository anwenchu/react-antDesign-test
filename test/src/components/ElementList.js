import { Table, Icon, Divider } from 'antd';

/*
*元素列表
*/

const data = [{
  key: '1',
  elementNo: '1',
  elementName: 'New York No. 1 Lake Park',
  elementCategory: '1',
  elementId: 'New York No. 1 Lake Park',
  elementText: 'android851',
  elementXY: '1',
  elementXpath: 'New York No. 1 Lake Park',
  elementDes: 'android851',
}, {
  key: '2',
  elementNo: '1',
  elementName: 'New York No. 1 Lake Park',
  elementCategory: '1',
  elementId: 'New York No. 1 Lake Park',
  elementText: 'android851',
  elementXY: '1',
  elementXpath: 'New York No. 1 Lake Park',
  elementDes: 'android851',
}];

const ElementList = () => {
  const columns = [{
    title: '编号',
    dataIndex: 'elementNo',
  }, {
    title: '元素名称',
    dataIndex: 'elementName',
  }, {
    title: '元素类型',
    dataIndex: 'elementCategory',
  }, {
    title: '元素id',
    dataIndex: 'elementId',
  }, {
    title: '元素文本',
    dataIndex: 'elementText',
  }, {
    title: '元素坐标',
    dataIndex: 'elementXY',
  }, {
    title: '元素xpath',
    dataIndex: 'elementXpath',
  }, {
    title: '元素描述',
    dataIndex: 'elementDes',
  }, {
    title: '操作',
    dataIndex: 'action',
    render: (text, record) => (
      <span>
        <a href="#">编辑</a>
        <Divider type="vertical" />
        <a href="#">删除</a>
      </span>
    ),
  }];

  return (
    <Table columns={columns} dataSource={data} />
  );
};



ElementList.propTypes = {
};

export default ElementList;
