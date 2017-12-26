package com.anwen.autotest.controller;

import com.anwen.autotest.domain.PlaneDomain;
import com.anwen.autotest.repository.PlaneRepository;
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
@Api(description = "计划管理相关接口")
@RestController
@RequestMapping("/plane")
public class PlaneController extends AbstractController{

    @Autowired
    private PlaneRepository planeRepository;

    /**
     * 新增计划
     *
     * @param plane 需要新增的对象
     * @return 成功后返回当前插入的记录
     */
    @ApiOperation(value = "新增计划", notes = "新增计划")
    @PostMapping(value = "/add")
    public ResponseEntity save(@RequestBody PlaneDomain plane) {
        plane.setIsDelete(0L);  // 新加元素删除状态默认都是0
        planeRepository.save(plane);
        List<PlaneDomain> planeList = new ArrayList<PlaneDomain>();
        planeList.add(plane);
        return wrapperSupplier(() -> planeList, false);
    }

    /**
     * 删除元素
     * @param id
     * @return
     */
    @ApiOperation(value = "删除计划", notes = "删除计划")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity delete(@PathVariable(value = "id") Long id) {
        return wrapperConsumer((p) -> planeRepository.delete(p), id);
    }

    /**
     * 修改元素
     *
     * @param plane 需要修改计划
     * @return
     */
    @ApiOperation(value = "修改计划", notes = "修改计划")
    @PutMapping(value = "/update")
    public ResponseEntity update(@RequestBody PlaneDomain plane) {
        return wrapperConsumer((p) -> planeRepository.save(p), plane);
    }

    /**
     * 查询所有计划
     * @return
     */
    @ApiOperation(value = "查询所有计划", notes = "查询所有计划")
    @GetMapping(value = "/list")
    public ResponseEntity list(@RequestParam(value = "platform") String platform) {
        Long isDelete = 0L;//0:未删除，默认查询所有未删除的页面
        //return wrapperSupplier(() -> planeRepository.findAll(), false);
        return wrapperSupplier(() -> planeRepository.findPlaneDomainByIsDeleteAndPlatform(isDelete,platform), false);
    }

    /**
     * 查询计划
     * @return
     */
    @ApiOperation(value = "查询计划", notes = "查询计划")
    @GetMapping(value = "/{id}")
    public ResponseEntity detail(@PathVariable(name = "id") Long id) {
        return wrapperSupplier(() -> planeRepository.findOne(id), false);
    }



}
