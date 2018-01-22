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
@Table(name = "at_testcasestep")
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
    //执行结果
    @Column(name = "result", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String result;
    //步骤编号
    @Column(name = "step_no", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String stepNo;
    //页面id
    @Column(name = "page_id", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String pageId;
    //元素id
    @Column(name = "element_id", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String elementId;
    //1级行为
    @Column(name = "action1_default", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String action1Default;
    //2级行为
    @Column(name = "action2_default", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String action2Default;
    //3级行为
    @Column(name = "action3_default", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String action3Default;

}
