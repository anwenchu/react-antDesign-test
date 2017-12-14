package com.anwen.autotest.controller;

import com.anwen.autotest.domain.CaseDomain;
import com.anwen.autotest.repository.CaseRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


/**
 * Created by an_wch on 2017/12/13.
 */
@Api(description = "用例相关接口")
@RestController
@RequestMapping("/testcase")
public class CaseController extends AbstractController{

    @Autowired
    private CaseRepository caseRepository;

    /**
     * 新增目录
     *
     * @param dir 需要新增的对象
     * @return 返回成功或失败
     */
    @ApiOperation(value = "新增目录", notes = "新增目录")
    @PostMapping(value = "/add")
    public ResponseEntity save(@RequestBody CaseDomain dir) {
        return wrapperConsumer((p) -> caseRepository.save(p), dir);
    }

    /**
     * 删除目录
     * @param id 需要删除目录的id
     * @return
     */
    @ApiOperation(value = "删除目录", notes = "删除目录")
    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable(value = "id") Long id) {
        return wrapperConsumer((p) -> caseRepository.delete(p), id);
    }

    /**
     * 修改元素
     *
     * @param dir 需要修改的目录
     * @return
     */
    @ApiOperation(value = "修改目录", notes = "修改目录")
    @PutMapping(value = "/update")
    public ResponseEntity update(@RequestBody CaseDomain dir) {
        return wrapperConsumer((p) -> caseRepository.save(p), dir);
    }

    /**
     * 查询所有目录
     * @return
     */
    @ApiOperation(value = "查询所有目录", notes = "查询所有目录")
    @GetMapping(value = "/list")
    public ResponseEntity list() {
        return wrapperSupplier(() -> caseRepository.findAll(), false);

    }

    /**
     * 查询目录
     * @return
     */
    @ApiOperation(value = "查询目录", notes = "查询目录")
    @GetMapping(value = "/{id}")
    public ResponseEntity detail(@PathVariable(name = "id") Long id) {
        return wrapperSupplier(() -> caseRepository.findOne(id), false);
    }


}
