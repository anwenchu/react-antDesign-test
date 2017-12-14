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
@Table(name = "at_page")
@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
public class PageDomain {

    @Id
    @GeneratedValue
    private Long id;
    //页面名称
    @Column(name = "page_name", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String pageName;
    //父节点
    @Column(name = "platform", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String platform;
    //页面是否可用，0不可用，1可用
    @Column(name = "available", columnDefinition = "int(x) COMMENT 'xx'")
    private Long available;
    //删除状态
    @Column(name = "is_delete", columnDefinition = "int(x) COMMENT 'xx'")
    private Long isDelete;
}
