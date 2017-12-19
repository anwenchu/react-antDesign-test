package com.anwen.autotest.repository;

import com.anwen.autotest.domain.PageDomain;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
/**
 * Created by an_wch on 2017/12/13.
 */
public interface PageRepository extends JpaRepository<PageDomain, Long> {
    List<PageDomain> findElementDomainByIsDeleteAndPlatform(Long isDelete,String platform);
}
