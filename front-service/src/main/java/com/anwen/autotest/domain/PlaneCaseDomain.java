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
@Table(name = "at_testplanecase")
@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
public class PlaneCaseDomain {

    @Id
    @GeneratedValue
    private Long id;
    //用例id
    @Column(name = "case_id", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String caseId;
    //用例次数
    @Column(name = "case_count", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String caseCount;
    //测试计划id
    @Column(name = "plane_id", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String planeId;
    //测试排序
    @Column(name = "order_no", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String orderNo;
}
