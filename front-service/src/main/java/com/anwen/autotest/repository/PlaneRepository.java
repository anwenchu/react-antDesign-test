package com.anwen.autotest.repository;

import com.anwen.autotest.domain.PlaneDomain;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by an_wch on 2017/12/13.
 */
public interface PlaneRepository extends JpaRepository<PlaneDomain, Long> {
}
