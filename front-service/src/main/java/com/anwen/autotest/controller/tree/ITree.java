package com.anwen.autotest.controller.tree;

import java.util.List;

public interface ITree {
    public List<TreeNode> getTree();
    public List<TreeNode> getRoot();
    public TreeNode getTreeNode(String nodeId);
}