package com.anwen.autotest.controller;

import com.anwen.autotest.domain.PageDomain;
import com.anwen.autotest.repository.PageRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


/**
 * Created by an_wch on 2017/12/13.
 */
@Api(description = "页面相关接口")
@RestController
@RequestMapping("/page")
public class PageController extends AbstractController{

    @Autowired
    private PageRepository pageRepository;

    /**
     * 新增页面
     *
     * @param element 需要新增的对象
     * @return 返回成功或失败
     */
    @ApiOperation(value = "新增页面", notes = "新增页面")
    @PostMapping(value = "/add")
    public ResponseEntity save(@RequestBody PageDomain element) {
        return wrapperConsumer((p) -> pageRepository.save(p), element);
    }

    /**
     * 删除页面
     * @param id
     * @return
     */
    @ApiOperation(value = "删除页面", notes = "删除页面")
    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable(value = "id") Long id) {
        return wrapperConsumer((p) -> pageRepository.delete(p), id);
    }

    /**
     * 修改页面
     *
     * @param element 需要修改页面
     * @return
     */
    @ApiOperation(value = "修改页面", notes = "修改页面")
    @PutMapping(value = "/update")
    public ResponseEntity update(@RequestBody PageDomain element) {
        return wrapperConsumer((p) -> pageRepository.save(p), element);
    }

    /**
     * 查询所有页面
     * @return
     */
    @ApiOperation(value = "查询所有页面", notes = "查询所有页面")
    @GetMapping(value = "/list")
    public ResponseEntity list() {
        return wrapperSupplier(() -> pageRepository.findAll(), false);
    }

    /**
     * 查询页面
     * @return
     */
    @ApiOperation(value = "查询页面", notes = "查询页面")
    @GetMapping(value = "/{id}")
    public ResponseEntity detail(@PathVariable(name = "id") Long id) {
        return wrapperSupplier(() -> pageRepository.findOne(id), false);
    }


}
