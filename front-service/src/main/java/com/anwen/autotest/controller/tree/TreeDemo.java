package com.anwen.autotest.controller.tree;

import java.util.ArrayList;
import java.util.List;

import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SimplePropertyPreFilter;

public class TreeDemo {

    public static void main(String[] args) {
        Tree tree = new Tree(genOrgList());
        TreeNode treeNode = tree.getTreeNode("2");

        SimplePropertyPreFilter filter = new SimplePropertyPreFilter(); // 构造方法里，也可以直接传需要序列化的属性名字
        filter.getExcludes().add("parent");
        filter.getExcludes().add("allChildren");
        String data = JSONObject.toJSONString(treeNode, filter);
        System.out.println(data);

    }

    public static List<ITreeNode> genOrgList(){
        List<ITreeNode> list = new ArrayList<ITreeNode>();

        Dir org = new Dir("2", "1", "北京市1");
        list.add(org);
        org = new Dir("3", "2", "市辖区");
        list.add(org);
        org = new Dir("4", "3", "东城区");
        list.add(org);
        org = new Dir("18", "2", "县");
        list.add(org);
        org = new Dir("19", "18", "密云县");
        list.add(org);
        org = new Dir("20", "18", "延庆县");
        list.add(org);
        org = new Dir("21", "3", "西城区");
        list.add(org);
        return list;
    }

}