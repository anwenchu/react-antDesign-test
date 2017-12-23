package com.anwen.autotest.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 元素管理
 * Created by an_wch on 2017/12/13.
 */
@Entity
@Table(name = "at_element")
@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
public class ElementDomain {

    @Id
    @GeneratedValue
    private Long id;
    //页面id
    @Column(name = "page_id", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String pageId;
    //页面是否可用，0不可用，1可用
    @Column(name = "available", columnDefinition = "int(x) COMMENT 'xx'")
    private Long available;
    //元素名称
    @Column(name = "element_name", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String elementName;
    //元素分类
    @Column(name = "element_category", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String elementCategory;
    //元素文本
    @Column(name = "element_text", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String elementText;
    //元素描述
    @Column(name = "element_desc", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String elementDesc;
    //元素xpath
    @Column(name = "element_xpath", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String elementXpath;
    //元素id
    @Column(name = "element_id", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String elementId;
    //元素坐标
    @Column(name = "element_bounds", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String elementBounds;
    //元素所属平台：android、ios
    @Column(name = "platform", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String platform;
    //删除状态
    @Column(name = "is_delete", columnDefinition = "int(x) COMMENT 'xx'")
    private Long isDelete;



    public static final String FIELD_AVAILABLE = "available";
    public static final String FIELD_PLATFORM = "platform";
    public static final String FIELD_ELEMENT_TEXT = "elementText";
    public static final String FIELD_ELEMENT_ID = "elementId";
    public static final String FIELD_IS_DELETE = "isDelete";
}
