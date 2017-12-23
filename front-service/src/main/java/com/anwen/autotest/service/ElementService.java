package com.anwen.autotest.service;

import com.anwen.autotest.domain.ElementDomain;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

/**
 * Created by an_wch on 2017/12/23.
 */
public interface ElementService {

    /**
     * 动态查询
     *
     * @param specification
     * @return
     */
    List<ElementDomain> findAll(Specification<ElementDomain> specification);


    /**
     * 动态查询
     *
     * @param vo
     * @return
     */
    List<ElementDomain> findAll(ElementDomain vo);

}
