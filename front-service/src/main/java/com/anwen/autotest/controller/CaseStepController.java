package com.anwen.autotest.controller;

import com.anwen.autotest.domain.CaseStepDomain;
import com.anwen.autotest.repository.CaseStepRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;


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
     * @param caseStep 需要新增的对象
     * @return 返回成功或失败
     */
    @ApiOperation(value = "新增元素", notes = "新增元素")
    @PostMapping(value = "/add")
    public ResponseEntity save(@RequestBody List<CaseStepDomain> caseStep, String caseId, String result, String stepNo,
                               String pageId, String elementId, String action1Default, String action2Default,
                               String action3Default,String isAction2,String isAction3,String action2Type,String action3Type) {
        // 批量插入数据
        for (int i=0;i<caseStep.size();i++) {
            System.out.print(caseStep.get(i)+"\r\n");
            caseStepRepository.save(caseStep.get(i));
        }
        // 编辑保存时，删除步骤
        if(caseStep.get(0).getId()!=null) {
            // 查询所有用例步骤
            List<CaseStepDomain> results = caseStepRepository.findCaseStepDomainByCaseId(caseStep.get(0).getCaseId());
            boolean flag;
            for(int i=0;i<results.size();i++){
                flag = false;
                for(int j=0;j<caseStep.size();j++){
                    if (results.get(i).getId()==caseStep.get(j).getId()){
                        flag = true;
                    }
                }
                // 删除
                if (flag!=true){
                    System.out.print("--i:"+i+",id:"+results.get(i).getId());
                    caseStepRepository.delete(results.get(i).getId());
                }
            }
        }
        return wrapperSupplier(() -> "success", false);
    }

    /**
     * 删除元素
     * @param id
     * @return
     */
    @ApiOperation(value = "删除元素", notes = "删除元素")
    @DeleteMapping("/delete/{id}")
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
     * 查询所有用例步骤
     * @return
     */
    @ApiOperation(value = "查询所有用例步骤", notes = "查询所有用例步骤")
    @GetMapping(value = "/list")
    public ResponseEntity list() {
        return wrapperSupplier(() -> caseStepRepository.findAll(), false);
    }

    /**
     * 查询步骤
     * @return
     */
    @ApiOperation(value = "查询步骤", notes = "查询步骤")
    @GetMapping(value = "/{id}")
    public ResponseEntity detail(@PathVariable(name = "id") Long id) {
        return wrapperSupplier(() -> caseStepRepository.findOne(id), false);
    }

    /**
     * 条件查询
     * @return
     */
    @ApiOperation(value = "条件查询", notes = "条件查询")
    @GetMapping(value = "/search")
    public ResponseEntity search(@RequestParam(value = "caseId") String caseId) {
        List<CaseStepDomain> results = caseStepRepository.findCaseStepDomainByCaseId(caseId);
        // 按照步骤序号进行升序排序
        Collections.sort(results, new Comparator<CaseStepDomain>() {
            @Override
            public int compare(CaseStepDomain r1, CaseStepDomain r2) {
                return new Double(r1.getStepNo()).compareTo(new Double(r2.getStepNo()));
            }
        });

        return wrapperSupplier(() -> results, false);

    }

}
