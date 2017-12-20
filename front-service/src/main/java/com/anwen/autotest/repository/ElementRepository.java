package com.anwen.autotest.repository;

import com.anwen.autotest.domain.ElementDomain;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by an_wch on 2017/12/13.
 */
public interface ElementRepository extends JpaRepository<ElementDomain, Long> {
    List<ElementDomain> findElementDomainByIsDelete(Long isDelete);
    List<ElementDomain> findElementDomainByIsDeleteAndPlatformAndAvailable(Long isDelete,String platform,Long available);
    List<ElementDomain> findElementDomainByIsDeleteAndPlatformAndAvailableAndElementId(Long isDelete,String platform,Long available,String elementId);
    List<ElementDomain> findElementDomainByIsDeleteAndPlatformAndAvailableAndElementText(Long isDelete,String platform,Long available,String elementText);
    List<ElementDomain> findElementDomainByIsDeleteAndPlatformAndAvailableAndElementTextAndElementId(Long isDelete,String platform,Long available,String elementText,String elementId);

    List<ElementDomain> findElementDomainByIsDeleteAndPlatform(Long isDelete,String platform);
    List<ElementDomain> findElementDomainByIsDeleteAndPlatformAndElementId(Long isDelete,String platform,String elementId);
    List<ElementDomain> findElementDomainByIsDeleteAndPlatformAndElementText(Long isDelete,String platform,String elementText);
    List<ElementDomain> findElementDomainByIsDeleteAndPlatformAndElementTextAndElementId(Long isDelete,String platform,String elementText,String elementId);


}
