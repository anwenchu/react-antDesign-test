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
    //目录id
    @Column(columnDefinition = "varchar(x) COMMENT 'xx'")
    private Long directoryId;
    //循环次数
    @Column(columnDefinition = "varchar(x) COMMENT 'xx'")
    private Long cycleCount;
    //执行时间
    @Column(columnDefinition = "varchar(x) COMMENT 'xx'")
    private Long time;
    //平台客户端类型
    @Column(columnDefinition = "varchar(x) COMMENT 'xx'")
    private String platform;
    //客户端版本号
    @Column(columnDefinition = "varchar(x) COMMENT 'xx'")
    private String version;
    //测试appuirl
    @Column(columnDefinition = "varchar(x) COMMENT 'xx'")
    private String appUrl;
    //测试计划描述
    @Column(columnDefinition = "varchar(x) COMMENT 'xx'")
    private String testPlaneDes;
    //测试计划名称
    @Column(columnDefinition = "varchar(x) COMMENT 'xx'")
    private String testPlaneName;
    //系统版本
    @Column(columnDefinition = "varchar(x) COMMENT 'xx'")
    private String sysVersion;
    //设备名称
    @Column(columnDefinition = "varchar(x) COMMENT 'xx'")
    private String deviceName;
    //（ios）设备uuid
    @Column(columnDefinition = "varchar(x) COMMENT 'xx'")
    private String uuid;

}
