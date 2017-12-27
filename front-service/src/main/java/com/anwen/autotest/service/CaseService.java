package com.anwen.autotest.service;

import com.anwen.autotest.domain.CaseDomain;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

/**
 * Created by an_wch on 2017/12/23.
 */
public interface CaseService {

    /**
     * 动态查询
     *
     * @param specification
     * @return
     */
    List<CaseDomain> findAll(Specification<CaseDomain> specification);


    /**
     * 动态查询
     *
     * @param vo
     * @return
     */
    List<CaseDomain> findAll(CaseDomain vo);

}
