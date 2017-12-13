import React from 'react'
import { Tree, Divider,Input,Row,Col,Button,Icon } from 'antd';
import NewDirModal from '../common/NewDirModal';
import DelDirModal from '../common/DelDirModal';
/*
*测试用例管理页面（TestCaseManage）的用例目录
* 数据：来自directory表
*/


const TreeNode = Tree.TreeNode;

const x = 3;
const y = 2;
const z = 1;
const gData = [];

const generateData = (_level, _preKey, _tns) => {
  const preKey = _preKey || '0';
  const tns = _tns || gData;

  const children = [];
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({ title: key, key });
    if (i < y) {
      children.push(key);
    }
  }
  if (_level < 0) {
    return tns;
  }
  const level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
};
generateData(z);

class Directory extends React.Component {
  state = {
    gData,
    expandedKeys: ['0-0', '0-0-0', '0-0-0-0'],
  }

  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  }

  render() {
    const loop = data => data.map((item) => {
      if (item.children && item.children.length) {
        return <TreeNode key={item.key} title={item.key}>{loop(item.children)}</TreeNode>;
      }
      return <TreeNode key={item.key} title={item.key} />;
    });
    return (
      <div>
        <Divider>用例查找</Divider>
        <div style={{ padding: " 15px" }}> 用例编号：</div>
        <div style={{ padding: " 0px 15px 0px 15px" }}>
          <Input placeholder="请输入用例编号" />
        </div>
        <div style={{ padding: " 15px" }}> 用例标题：</div>
        <div style={{ padding: " 0px 15px 15px 15px" }}>
          <Input placeholder="请输入用例标题" />
        </div>
        <Divider>用例管理</Divider>
          <Tree
              showLine
              defaultExpandedKeys={['0-0-0']}
              onSelect={this.onSelect}
          >
              <TreeNode title="parent 1" key="0-0">
                  <TreeNode title="parent 1-0" key="0-0-0">
                      <TreeNode title="leaf" key="0-0-0-0" />
                      <TreeNode title="leaf" key="0-0-0-1" />
                      <TreeNode title="leaf" key="0-0-0-2" />
                  </TreeNode>
                  <TreeNode title="parent 1-1" key="0-0-1">
                      <TreeNode title="leaf" key="0-0-1-0" />
                  </TreeNode>
                  <TreeNode title="parent 1-2" key="0-0-2">
                      <TreeNode title="leaf" key="0-0-2-0" />
                      <TreeNode title="leaf" key="0-0-2-1" />
                  </TreeNode>
              </TreeNode>
          </Tree>
        <div>
            <Row gutter={16} align="middle" >
                <Col className="gutter-row" offset={6} span={2}>
                    <NewDirModal />
                </Col>
                <Col className="gutter-row" offset={6} span={2}>
                    <DelDirModal />
                </Col>
            </Row>
        </div>
      </div>
    );
  }
}

Directory.propTypes = {
};

export default Directory;
