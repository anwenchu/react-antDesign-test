import React from "react";
import { Tree, Divider,Input } from 'antd';
import PageTree from '../common/PageTree';
/*
* 元素管理页面的目录，跟用例管理页面目录不同，这个添加目录关系只有一级，添加目录为一级目录
* 数据：来自page表（这个目录只有一级，展示出来每个页面即可）
*/

export default class PageDirectory extends React.Component {

    render() {
        const loop = data => data.map((item) => {
            if (item.children && item.children.length) {
                return <TreeNode key={item.key} title={item.key}>{loop(item.children)}</TreeNode>;
            }
            return <TreeNode key={item.key} title={item.key} />;
        });
        return (
            <div>
                <Divider>元素查找</Divider>
                <div style={{ padding: " 15px" }}> 元素id：</div>
                <div style={{ padding: " 0px 15px 0px 15px" }}>
                    <Input placeholder="请输入元素id" />
                </div>
                <div style={{ padding: " 15px" }}> 元素文本：</div>
                <div style={{ padding: " 0px 15px 15px 15px" }}>
                    <Input placeholder="请输入元素文本" />
                </div>
                <Divider>元素管理</Divider>
                <PageTree />
            </div>
        );
    }
}


