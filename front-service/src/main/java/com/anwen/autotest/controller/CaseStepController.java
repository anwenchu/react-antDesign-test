package com.anwen.autotest.controller;

import com.anwen.autotest.domain.CaseStepDomain;
import com.anwen.autotest.repository.CaseStepRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


/**
 * Created by an_wch on 2017/12/13.
 */
@Api(description = "用例步骤相关接口")
@RestController
@RequestMapping("/casestep")
public class CaseStepController extends AbstractController{

    @Autowired
    private CaseStepRepository caseStepRepository;

    /**
     * 新增元素
     *
     * @param element 需要新增的对象
     * @return 返回成功或失败
     */
    @ApiOperation(value = "新增元素", notes = "新增元素")
    @PostMapping(value = "/add")
    public ResponseEntity save(@RequestBody CaseStepDomain element) {
        return wrapperConsumer((p) -> caseStepRepository.save(p), element);
    }

    /**
     * 删除元素
     * @param id
     * @return
     */
    @ApiOperation(value = "删除元素", notes = "删除元素")
    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable(value = "id") Long id) {
        return wrapperConsumer((p) -> caseStepRepository.delete(p), id);
    }

    /**
     * 修改元素
     *
     * @param element 需要修改元素
     * @return
     */
    @ApiOperation(value = "修改元素", notes = "修改元素")
    @PutMapping(value = "/update")
    public ResponseEntity update(@RequestBody CaseStepDomain element) {
        return wrapperConsumer((p) -> caseStepRepository.save(p), element);
    }

    /**
     * 查询所有元素
     * @return
     */
    @ApiOperation(value = "查询所有元素", notes = "查询所有元素")
    @GetMapping(value = "/list")
    public ResponseEntity list() {
        return wrapperSupplier(() -> caseStepRepository.findAll(), false);
    }

    /**
     * 查询元素
     * @return
     */
    @ApiOperation(value = "查询元素", notes = "查询元素")
    @GetMapping(value = "/{id}")
    public ResponseEntity detail(@PathVariable(name = "id") Long id) {
        return wrapperSupplier(() -> caseStepRepository.findOne(id), false);
    }


}