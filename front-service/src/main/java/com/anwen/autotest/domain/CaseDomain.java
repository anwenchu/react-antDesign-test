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
@Table(name = "at_testcase")
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
    //元素所属平台：android、ios
    @Column(name = "platform", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String platform;
    //删除状态
    @Column(name = "is_delete", columnDefinition = "int(x) COMMENT 'xx'")
    private Long isDelete;



    public static final String FIELD_DIRECTORY_ID = "directoryId";
    public static final String FIELD_PLATFORM = "platform";
    public static final String FIELD_TEARDOWN_CASE_ID = "teardownCaseId";
    public static final String FIELD_SETUP_CASE_ID = "setupCaseId";
    public static final String FIELD_CASE_TITLE = "caseTitle";
    public static final String FIELD_IS_DELETE = "isDelete";

}
