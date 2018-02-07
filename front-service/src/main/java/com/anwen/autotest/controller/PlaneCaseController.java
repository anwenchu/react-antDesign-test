package com.anwen.autotest.controller;

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
     * @param planeCase 需要新增的测试用例数据集
     * @return 返回成功或失败
     */
    @ApiOperation(value = "新增测试计划用例", notes = "新增测试计划用例")
    @PostMapping(value = "/add")
    public ResponseEntity save(@RequestBody List<PlaneCaseDomain> planeCase, Long caseId, String caseCount, String planeId, String orderNo) {

        //查询出该计划下的所有用例
        List<PlaneCaseDomain> cases = planeCaseRepository.findPlaneCaseDomainByPlaneId(planeCase.get(0).getPlaneId());
        System.out.print(cases.size());
        int flag = 0;
        for (PlaneCaseDomain caseCommit:planeCase){
            for (PlaneCaseDomain caseInfo:cases){
                if (caseCommit.getCaseId()==caseInfo.getCaseId()) {
                    // 当计划中有该条用例时，修改
                    flag = 1;
                    caseCommit.setId(caseInfo.getId());
                    planeCaseRepository.save(caseCommit);
                }
            }
            // 当计划中没有该条用例时，新增
            if (flag==0) {
                planeCaseRepository.save(caseCommit);
            }
        }
        // 删除掉删除的数据
        int isDelete = 0;
        for (PlaneCaseDomain caseInfo:cases){
            for (PlaneCaseDomain caseCommit:planeCase){
                if (caseCommit.getCaseId()==caseInfo.getCaseId()) {
                    isDelete = 1;
                    break;
                }
            }
            if (isDelete == 0){
                planeCaseRepository.delete(caseInfo.getId());
            }
        }
        return wrapperSupplier(() -> "success", false);
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


    /**
     * 条件查询
     * @return
     */
    @ApiOperation(value = "查询指定计划中的用例数据", notes = "查询指定计划中的用例数据")
    @GetMapping(value = "/search")
    public ResponseEntity search(@RequestParam(value = "planeId") String planeId) {
        return wrapperSupplier(() -> planeCaseRepository.findPlaneCaseDomainByPlaneId(planeId), false);
    }


}
