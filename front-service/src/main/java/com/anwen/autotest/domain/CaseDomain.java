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
@Table(name = "at_testCase")
@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
public class CaseDomain {

    @Id
    @GeneratedValue
    private Long id;
    //用例标题
    @Column(name = "case_title", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String caseTitle;
    //前置用例id
    @Column(name = "setup_case_id", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String setupCaseId;
    //后置用例id
    @Column(name = "teardown_case_id", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String teardownCaseId;
    //后置用例id
    @Column(name = "directory_id", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String directoryId;
    //选中状态
    @Column(name = "is_select", columnDefinition = "int(x) COMMENT 'xx'")
    private Long isSelect;
    //执行次数
    @Column(name = "run_count", columnDefinition = "int(x) COMMENT 'xx'")
    private Long runCount;
    //元素所属平台：android、ios
    @Column(name = "platform", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String platform;
    //用例类别
    @Column(name = "case_category", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String caseCategory;
    //删除状态
    @Column(name = "is_delete", columnDefinition = "int(x) COMMENT 'xx'")
    private Long isDelete;
}
