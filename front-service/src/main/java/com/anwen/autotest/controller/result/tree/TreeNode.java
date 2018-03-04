package com.anwen.autotest.controller.result.tree;

import java.util.ArrayList;
import java.util.List;

import com.alibaba.fastjson.annotation.JSONField;

/**
 * <p>Title: 树节点</p>
 * <p>Description:一棵树由许多包含父子关系的节点组成 </p>
 * @author
 * @date
 */
public class TreeNode {
    //树节点ID
    @JSONField(ordinal=1)
    private String nodeId;
    //树节点名称
    @JSONField(ordinal=2)
    private String nodeName;
    //父节点ID
    @JSONField(ordinal=3)
    private String parentNodeId;
    //节点所在的层级
    //@JSONField(ordinal=5)
    //private int level;
    private TreeNode parent;
    //当前节点的二子节点
    @JSONField(ordinal=6)
    private List<TreeNode> children = new ArrayList<TreeNode>();
    //当前节点的子孙节点
    private List<TreeNode> allChildren = new ArrayList<TreeNode>();

    public TreeNode(ITreeNode obj){
        this.nodeId = obj.getNodeId();
        this.nodeName = obj.getNodeName();
        this.parentNodeId = obj.getNodeParentId();
    }
    public void addChild(TreeNode treeNode){
        this.children.add(treeNode);
    }
    public void removeChild(TreeNode treeNode){
        this.children.remove(treeNode);
    }
    public String getNodeId() {
        return nodeId;
    }
    public void setNodeId(String nodeId) {
        this.nodeId = nodeId;
    }
    public String getNodeName() {
        return nodeName;
    }
    public void setNodeName(String nodeName) {
        this.nodeName = nodeName;
    }
    public String getParentNodeId() {
        return parentNodeId;
    }
    public void setParentNodeId(String parentNodeId) {
        this.parentNodeId = parentNodeId;
    }
    public TreeNode getParent() {
        return parent;
    }
    public void setParent(TreeNode parent) {
        this.parent = parent;
    }
    public List<TreeNode> getChildren() {
        return children;
    }
    public void setChildren(List<TreeNode> children) {
        this.children = children;
    }

    public List<TreeNode> getAllChildren() {
        if(this.allChildren.isEmpty()){
            for(TreeNode treeNode : this.children){
                this.allChildren.add(treeNode);
                this.allChildren.addAll(treeNode.getAllChildren());
            }
        }
        return this.allChildren;
    }
}