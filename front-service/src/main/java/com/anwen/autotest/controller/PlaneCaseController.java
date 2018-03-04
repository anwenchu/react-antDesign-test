package com.anwen.autotest.controller;

import com.anwen.autotest.domain.CaseDomain;
import com.anwen.autotest.domain.PlaneCaseDomain;
import com.anwen.autotest.repository.CaseRepository;
import com.anwen.autotest.repository.PlaneCaseRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.anwen.autotest.controller.result.bean.PlaneCaseResult;
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
    @Autowired
    private CaseRepository caseRepository;

    /**
     * 批量新增测试用例
     *
     * @param planeCase 需要新增的测试用例数据集
     * @return 返回成功或失败
     */
    @ApiOperation(value = "新增测试计划用例", notes = "新增测试计划用例")
    @PostMapping(value = "/add")
    public ResponseEntity save(@RequestBody List<PlaneCaseDomain> planeCase, Long caseId, String caseCount, String planeId, String orderNo,String result) {

        //查询出该计划下的所有用例
        List<PlaneCaseDomain> cases = planeCaseRepository.findPlaneCaseDomainByPlaneId(planeCase.get(0).getPlaneId());
        int flag = 0;
        for (PlaneCaseDomain caseCommit : planeCase){
            for (PlaneCaseDomain caseInfo : cases){
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

    /**
     * 条件查询
     * @return
     */
    @ApiOperation(value = "查询指定计划中的用例数据", notes = "查询指定计划中的用例数据")
    @GetMapping(value = "/result")
    public ResponseEntity planeCaseResult(@RequestParam(value = "planeId") String planeId) {
        // 获取测试计划下的所有用例id
        List<PlaneCaseDomain> cases = planeCaseRepository.findPlaneCaseDomainByPlaneId(planeId);
        List<PlaneCaseResult> planeCaseResults = new ArrayList<>();
        for (int i=0; i<cases.size();i++){
            // 根据用例id获取用例标题信息
            CaseDomain caseDomain = caseRepository.findOne(Long.parseLong(cases.get(i).getCaseId()));
            PlaneCaseResult result = new PlaneCaseResult();
            result.setCaseId(caseDomain.getId().toString());
            result.setCaseOrder(Integer.toString(i+1));
            result.setCaseResult(cases.get(i).getResult());
            result.setCaseTitle(caseDomain.getCaseTitle());
            planeCaseResults.add(result);
        }
        return wrapperSupplier(() -> planeCaseResults, false);
    }

}
