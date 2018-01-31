package com.anwen.autotest.repository;

import com.anwen.autotest.domain.DirDomain;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by an_wch on 2017/12/13.
 */
public interface DirRepository extends JpaRepository<DirDomain, Long> {
    List<DirDomain> findDirDomainByIsDeleteAndPlatform(Long isDelete,String platform);
    List<DirDomain> findDirDomainByParentIdAndPlatform(String parentId,String platform);
    List<DirDomain> findDirDomainByParentId(String parentId);
}
