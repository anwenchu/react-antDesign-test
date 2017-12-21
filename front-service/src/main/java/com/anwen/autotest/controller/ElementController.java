package com.anwen.autotest.controller;

import com.anwen.autotest.domain.ElementDomain;
import com.anwen.autotest.repository.ElementRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


/**
 * Created by an_wch on 2017/12/13.
 */
@Api(description = "元素管理相关接口")
@RestController
@RequestMapping("/element")
public class ElementController extends AbstractController{

    @Autowired
    private ElementRepository elementRepository;

    /**
     * 新增元素
     *
     * @param element 需要新增的对象
     * @return 返回成功或失败
     */
    @ApiOperation(value = "新增元素", notes = "新增元素")
    @PostMapping(value = "/add")
    public ResponseEntity save(@RequestBody ElementDomain element) {
        element.setIsDelete(0L);
        element.setAvailable(1L);
        return wrapperConsumer((p) -> elementRepository.save(p), element);
    }

    /**
     * 删除元素
     * @param id
     * @return
     */
    @ApiOperation(value = "删除元素", notes = "删除元素")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity delete(@PathVariable(value = "id") Long id) {
        return wrapperConsumer((p) -> elementRepository.delete(p), id);
    }

    /**
     * 修改元素
     *
     * @param element 需要修改元素
     * @return
     */
    @ApiOperation(value = "修改元素", notes = "修改元素")
    @PutMapping(value = "/update")
    public ResponseEntity update(@RequestBody ElementDomain element) {
        element.setIsDelete(0L);
        element.setAvailable(1L);
        return wrapperConsumer((p) -> elementRepository.save(p), element);
    }

    /**
     * 获取元素列表
     * 功能：根据平台信息，默认查询未删除的所有元素
     * @param platform 元素所属平台
     * @return
     */
    @ApiOperation(value = "查询所有元素", notes = "查询所有元素")
    @GetMapping(value = "/list")
    public ResponseEntity list(@RequestParam(value = "platform") String platform) {
        Long isDelete = 0L;
        return wrapperSupplier(() -> elementRepository.findAll(), false);

    }


    /**
     * 查询元素
     * @return
     */
    @ApiOperation(value = "查询元素", notes = "查询元素")
    @GetMapping(value = "/{id}")
    public ResponseEntity detail(@PathVariable(name = "id") Long id) {
        return wrapperSupplier(() -> elementRepository.findOne(id), false);
    }

    /**
     * 条件查询
     * 功能：默认查询未删除的所有元素
     * @param platform 元素所属平台
     * @return
     */
    @ApiOperation(value = "条件查询", notes = "条件查询")
    @GetMapping(value = "/search")
    public ResponseEntity search(@RequestParam(value = "platform") String platform,String elementText,String elementId,Long available) {
        Long isDelete = 0L;
        // available为0时查找所有
        if (available==0) {
            if ((null == elementText )&&(null == elementId))
                return wrapperSupplier(() -> elementRepository.findElementDomainByIsDeleteAndPlatform(isDelete, platform), false);
            else if ((null != elementText )&&(null == elementId))
                return wrapperSupplier(() -> elementRepository.findElementDomainByIsDeleteAndPlatformAndElementId(isDelete, platform, elementId), false);
            else if ((null == elementText )&&(null != elementId))
                return wrapperSupplier(() -> elementRepository.findElementDomainByIsDeleteAndPlatformAndElementText(isDelete, platform, elementText), false);
            else
                return wrapperSupplier(() -> elementRepository.findElementDomainByIsDeleteAndPlatformAndElementTextAndElementId(isDelete, platform,elementText, elementId), false);

        }else {
            if ((null == elementText )&&(null == elementId))
                return wrapperSupplier(() -> elementRepository.findElementDomainByIsDeleteAndPlatformAndAvailable(isDelete, platform, available), false);
            else if ((null != elementText )&&(null == elementId))
                return wrapperSupplier(() -> elementRepository.findElementDomainByIsDeleteAndPlatformAndAvailableAndElementId(isDelete, platform, available, elementId), false);
            else if ((null == elementText )&&(null != elementId))
                return wrapperSupplier(() -> elementRepository.findElementDomainByIsDeleteAndPlatformAndAvailableAndElementText(isDelete, platform, available, elementText), false);
            else
                return wrapperSupplier(() -> elementRepository.findElementDomainByIsDeleteAndPlatformAndAvailableAndElementTextAndElementId(isDelete, platform, available, elementText, elementId), false);
        }

    }

}
