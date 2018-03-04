package com.anwen.autotest.controller.result.bean;

public class PlaneCaseResult {

    private String caseOrder; //用例执行顺序
    private String caseId; //用例id
    private String caseTitle;  //用例标题
    private String caseResult;   //用例结果
    public PlaneCaseResult(){

    }
    public PlaneCaseResult(String caseOrder, String caseId, String caseTitle, String caseResult){
        this.caseOrder = caseOrder;
        this.caseId = caseId;
        this.caseTitle = caseTitle;
        this.caseTitle = caseResult;
    }

    public String getCaseOrder() {
        return caseOrder;
    }

    public String getCaseId() {
        return caseId;
    }

    public String getCaseTitle() {
        return caseTitle;
    }

    public String getCaseResult() {
        return caseResult;
    }

    public void setCaseOrder(String caseOrder) {
        this.caseOrder = caseOrder;
    }

    public void setCaseId(String caseId) {
        this.caseId = caseId;
    }

    public void setCaseTitle(String caseTitle) {
        this.caseTitle = caseTitle;
    }

    public void setCaseResult(String caseResult) {
        this.caseResult = caseResult;
    }
}
