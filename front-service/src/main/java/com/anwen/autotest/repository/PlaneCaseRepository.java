package com.anwen.autotest.repository;

import com.anwen.autotest.domain.PlaneCaseDomain;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by an_wch on 2017/12/13.
 */
public interface PlaneCaseRepository extends JpaRepository<PlaneCaseDomain, Long> {
    List<PlaneCaseDomain> findPlaneCaseDomainByPlaneId(String planeId);
}
