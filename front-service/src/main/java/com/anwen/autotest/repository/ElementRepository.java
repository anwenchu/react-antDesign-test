package com.anwen.autotest.repository;

import com.anwen.autotest.domain.ElementDomain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;


/**
 * Created by an_wch on 2017/12/13.
 */
public interface ElementRepository extends JpaRepository<ElementDomain, Long>, JpaSpecificationExecutor {

}
