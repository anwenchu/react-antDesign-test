package com.anwen.autotest.controller.result.tree;

public class Dir implements ITreeNode {
    private String uuid; //目录id
    private String parentId;  //目录父节点
    private String name;   //目录名称
    public Dir(){

    }
    public Dir(String uuid, String parentId, String name){
        this.uuid = uuid;
        this.parentId = parentId;
        this.name = name;

    }
    @Override
    public String getNodeId() {
        return this.uuid;
    }

    @Override
    public String getNodeName() {
        return this.name;
    }

    @Override
    public String getNodeParentId() {
        return this.parentId;
    }


    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getParentId() {
        return parentId;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


}
