package com.anwen.autotest.repository;

import com.anwen.autotest.domain.CaseStepDomain;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by an_wch on 2017/12/13.
 */
public interface CaseStepRepository extends JpaRepository<CaseStepDomain, Long> {
}
