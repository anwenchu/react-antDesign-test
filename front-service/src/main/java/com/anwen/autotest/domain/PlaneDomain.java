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
@Table(name = "at_testplane")
@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
public class PlaneDomain {

    @Id
    @GeneratedValue
    private Long id;
    //目录id
    @Column(name = "directory_Id", columnDefinition = "varchar(x) COMMENT 'xx'")
    private Long directoryId;
    //循环次数
    @Column(name = "testplane_count", columnDefinition = "int(x) COMMENT 'xx'")
    private Long testPlaneCount;
    //执行时间
    @Column(name = "testplane_runtime", columnDefinition = "int(x) COMMENT 'xx'")
    private Long testPlaneRuntime;
    //平台客户端类型
    @Column(name = "platform", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String platform;
    //客户端版本号
    @Column(name = "app_version", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String appVersion;
    //测试appuirl
    @Column(name = "app_url", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String appUrl;
    //测试计划描述
    @Column(name = "testplane_des", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String testPlaneDes;
    //测试计划名称
    @Column(name = "testplane_name", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String testPlaneName;
    //系统版本
    @Column(name = "sys_version", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String sysVersion;
    //设备名称
    @Column(name = "device_name", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String deviceName;
    //（ios）设备uuid
    @Column(name = "device_uuid", columnDefinition = "varchar(x) COMMENT 'xx'")
    private String deviceUUID;
    //删除状态
    @Column(name = "is_delete", columnDefinition = "int(x) COMMENT 'xx'")
    private Long isDelete;

}
