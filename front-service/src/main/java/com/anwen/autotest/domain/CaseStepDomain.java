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
@Table(name = "at_testCaseStep")
@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
public class CaseStepDomain {

    @Id
    @GeneratedValue
    private Long id;
    //用例id
    @Column(name = "case_id", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String caseId;
    //父节点
    @Column(name = "parent_id", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String parentId;
    //行为id
    @Column(name = "action_id", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String actionId;
    //二级行为id
    @Column(name = "subaction_id", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String subactionId;
    //输入文本
    @Column(name = "subtext", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String subtext;
    //执行结果
    @Column(name = "result", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String result;
    //步骤编号
    @Column(name = "step_no", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String stepNo;
}
