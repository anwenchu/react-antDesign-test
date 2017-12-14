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
@Table(name = "at_action")
@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
public class ActionDomain {

    @Id
    @GeneratedValue
    private Long id;
    //操作名称
    @Column(name = "action_name", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String actionName;
    //父节点
    @Column(name = "parent_id", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String parentId;
}
