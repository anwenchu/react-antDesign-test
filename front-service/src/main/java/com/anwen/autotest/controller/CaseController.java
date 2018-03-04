package com.anwen.autotest.controller;

import com.anwen.autotest.domain.CaseDomain;
import com.anwen.autotest.repository.CaseRepository;
import com.anwen.autotest.repository.DirRepository;
import com.anwen.autotest.service.CaseService;
import com.sun.org.apache.xerces.internal.dom.ChildNode;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.anwen.autotest.domain.DirDomain;

import java.util.ArrayList;
import java.util.List;
import java.lang.String;


/**
 * Created by an_wch on 2017/12/13.
 */
@Api(description = "用例相关接口")
@RestController
@RequestMapping("/testcase")
public class CaseController extends AbstractController{

    @Autowired
    private CaseRepository caseRepository;

    @Autowired
    private DirRepository dirRepository;

    @Autowired
    private CaseService caseService;

    /**
     * 新增用例
     *
     * @param testcase 需要新增的对象
     * @return 返回成功或失败
     */
    @ApiOperation(value = "新增用例", notes = "新增用例")
    @PostMapping(value = "/add")
    public ResponseEntity save(@RequestBody CaseDomain testcase) {
        testcase.setIsDelete(0L);
        caseRepository.save(testcase);
        List<CaseDomain> testcaseList = new ArrayList<CaseDomain>();
        testcaseList.add(testcase);
        return wrapperSupplier(() -> testcaseList, false);
    }

    /**
     * 删除用例
     * @param id 需要删除目录的id
     * @return
     */
    @ApiOperation(value = "删除目录", notes = "删除目录")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity delete(@PathVariable(value = "id") Long id) {
        CaseDomain testcase = caseRepository.findOne(id);
        testcase.setIsDelete(1L);
        return wrapperSupplier(() -> caseRepository.save(testcase), false);
        //return wrapperConsumer((p) -> caseRepository.delete(p), id);
    }

    /**
     * 修改用例
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
     * 查询所有用例
     * @return
     */
    @ApiOperation(value = "查询所有目录", notes = "查询所有目录")
    @GetMapping(value = "/list")
    public ResponseEntity list(@RequestParam(value = "platform") String platform) {
        Long isDelete = 0L;
        return wrapperSupplier(() -> caseRepository.findCaseDomainByPlatformAndIsDelete(platform,isDelete), false);
    }

    /**
     * 查询某一个用例
     * @return
     */
    @ApiOperation(value = "查询目录", notes = "查询目录")
    @GetMapping(value = "/{id}")
    public ResponseEntity detail(@PathVariable(name = "id") Long id) {
        return wrapperSupplier(() -> caseRepository.findOne(id), false);
    }




    /**
     * 条件查询
     * @return
     */
    @ApiOperation(value = "查询目录", notes = "查询目录")
    @GetMapping(value = "/search")
    public ResponseEntity detail(CaseDomain casedomain) {

        // 如果是根节点，则获取根节点的id
        if (null==casedomain.getDirectoryId()){
            if (casedomain.getPlatform().equals("android")){
                List<DirDomain> androidroot = dirRepository.findDirDomainByParentIdAndPlatform("0","android");
                casedomain.setDirectoryId(androidroot.get(0).getId().toString());
            }else{
                List<DirDomain> iosroot = dirRepository.findDirDomainByParentIdAndPlatform("0","ios");
                casedomain.setDirectoryId(iosroot.get(0).getId().toString());
            }
        }

        List<CaseDomain> caseList = new ArrayList<>();
        List<CaseDomain> resultList = getCaseList(casedomain,caseList);

        return wrapperSupplier(() -> resultList, false);
    }

    public List<CaseDomain> getCaseList(CaseDomain casedomain,List<CaseDomain> caseList)
    {
        // 查询是否有子节点，有子节点则添加子节点结果
        String dirId = casedomain.getDirectoryId();
        List<DirDomain> childNodeList = dirRepository.findDirDomainByParentId(dirId);

        if (childNodeList.size()>=1) {
            // 如果有子节点则查找子节点
            for (DirDomain childNode : childNodeList) {
                casedomain.setDirectoryId(childNode.getId().toString());
                getCaseList(casedomain,caseList);
            }
        } else {
            // 如果没有子节点，获取用例
            caseList.addAll(caseService.findAll(casedomain));
        }
        return caseList;
    }

}

