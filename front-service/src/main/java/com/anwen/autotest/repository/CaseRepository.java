package com.anwen.autotest.repository;

import com.anwen.autotest.domain.CaseDomain;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by an_wch on 2017/12/13.
 */
public interface CaseRepository extends JpaRepository<CaseDomain, Long> {
    List<CaseDomain> findCaseDomainByDirectoryIdAndPlatformAndIsDelete(String directoryId,String platform,Long isDelete);
    List<CaseDomain> findCaseDomainByDirectoryIdAndIsDelete(String directoryId,Long isDelete);
}
