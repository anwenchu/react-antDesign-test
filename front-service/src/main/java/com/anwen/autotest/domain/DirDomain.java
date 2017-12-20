package com.anwen.autotest.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * 元素管理
 * Created by an_wch on 2017/12/13.
 */
@Entity
@Table(name = "at_directory")
@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
public class DirDomain {

    @Id
    @GeneratedValue
    private Long id;
    //目录名称
    @Column(name = "directory_name", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String directoryName;
    //父节点
    @Column(name = "parent_id", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String parentId;
    //删除状态
    @Column(name = "is_delete", columnDefinition = "int(x) COMMENT 'xx'")
    private Long isDelete;
    //目录所属平台：android、ios
    @Column(name = "platform", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String platform;
}
