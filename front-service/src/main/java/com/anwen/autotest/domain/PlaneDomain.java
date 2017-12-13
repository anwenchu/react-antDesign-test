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
 * Created by an_wch on 2017/12/13.
 */
@Entity
@Table(name = "at_testPlane")
@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
public class PlaneDomain {

    @Id
    @GeneratedValue
    private Long id;

    @Column(columnDefinition = "varchar(x) COMMENT 'xx'")
    private Long directoryId;

    @Column(columnDefinition = "varchar(x) COMMENT 'xx'")
    private Long cycleCount;

    @Column(columnDefinition = "varchar(x) COMMENT 'xx'")
    private Long time;

    @Column(columnDefinition = "varchar(x) COMMENT 'xx'")
    private String platform;

    @Column(columnDefinition = "varchar(x) COMMENT 'xx'")
    private String version;

    @Column(columnDefinition = "varchar(x) COMMENT 'xx'")
    private String appUrl;

    @Column(columnDefinition = "varchar(x) COMMENT 'xx'")
    private String testPlaneDes;

    @Column(columnDefinition = "varchar(x) COMMENT 'xx'")
    private String testPlaneName;

    @Column(columnDefinition = "varchar(x) COMMENT 'xx'")
    private String sysVersion;

    @Column(columnDefinition = "varchar(x) COMMENT 'xx'")
    private String deviceName;

    @Column(columnDefinition = "varchar(x) COMMENT 'xx'")
    private String uuid;

}
