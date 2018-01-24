package com.anwen.autotest.controller;

import com.anwen.autotest.repository.ActionRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Created by an on 2017/12/24.
 */
@Api(description = "action相关接口")
@RequestMapping("/action")
@Slf4j
@RestController
public class ActionController extends AbstractController{


    @Autowired
    private ActionRepository actionRepository;

    /**
     * 查询action
     * @return
     */
    @ApiOperation(value = "查询action", notes = "查询action")
    @GetMapping(value = "/findByParentId")
    public ResponseEntity findByParentId(@RequestParam(value = "parentId") String parentId) {
        return wrapperSupplier(() -> actionRepository.findActionDomainByParentId(parentId), false);
    }


    /**
     * 查询某一个操作
     * @return
     */
    @ApiOperation(value = "查询目录", notes = "查询目录")
    @GetMapping(value = "/{id}")
    public ResponseEntity detail(@PathVariable(name = "id") Long id) {
        return wrapperSupplier(() -> actionRepository.findOne(id), false);
    }

}
