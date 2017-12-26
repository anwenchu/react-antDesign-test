package com.anwen.autotest.controller;

import ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy;
import com.anwen.autotest.domain.PlaneCaseDomain;
import com.anwen.autotest.repository.PlaneCaseRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


/**
 * Created by an_wch on 2017/12/13.
 */
@Api(description = "测试计划用例列表理相关接口")
@RestController
@RequestMapping("/planecase")
public class PlaneCaseController extends AbstractController{

    @Autowired
    private PlaneCaseRepository planeCaseRepository;

    /**
     * 批量新增测试用例
     *
     * @param planecase 需要新增的测试用例数据集
     * @return 返回成功或失败
     */
    @ApiOperation(value = "新增测试计划用例", notes = "新增测试计划用例")
    @PostMapping(value = "/add")
    public ResponseEntity save(@RequestBody List<PlaneCaseDomain> planecase, String caseId, String caseCount, String planeId, String order) {

        System.out.print(planecase);
        //String[] roleIds = request.getParameterValues("");

        return wrapperSupplier(() -> planeCaseRepository.findAll(), false);
    }

    /**
     * 批量删除测试用例数据集
     * @param id
     * @return
     */
    @ApiOperation(value = "删除测试用例", notes = "删除测试用例")
    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable(value = "id") Long id) {
        return wrapperConsumer((p) -> planeCaseRepository.delete(p), id);
    }


    /**
     * 查询所有测试用例数据
     * @return
     */
    @ApiOperation(value = "查询所有测试用例数据", notes = "查询所有测试用例数据")
    @GetMapping(value = "/list")
    public ResponseEntity list() {
        return wrapperSupplier(() -> planeCaseRepository.findAll(), false);
    }


}
