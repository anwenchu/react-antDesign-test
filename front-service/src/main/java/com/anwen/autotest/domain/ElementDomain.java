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

    @Column(name = "page_id", columnDefinition = "int(x) COMMENT 'xx'")
    private Long pageId;

    @Column(name = "available", columnDefinition = "int(x) COMMENT 'xx'")
    private Long available;

    @Column(name = "element_name", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String elementName;

    @Column(name = "element_category", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String elementCategory;

    @Column(name = "element_text", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String elementText;

    @Column(name = "element_desc", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String elementDesc;

    @Column(name = "element_xpath", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String elementXpath;

    @Column(name = "element_id", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String elementId;

    @Column(name = "element_bounds", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String elementBounds;

    @Column(name = "platform", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String platform;

}
