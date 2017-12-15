import React from 'react'
import "antd/dist/antd.css";
import { Tree, Divider,Input,Row,Col,Button,Icon ,From} from 'antd';
import DirTree from '../common/DirTree';
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
                <DirTree />
            </div>
        );
    }
}

Directory.propTypes = {
};

export default Directory;
