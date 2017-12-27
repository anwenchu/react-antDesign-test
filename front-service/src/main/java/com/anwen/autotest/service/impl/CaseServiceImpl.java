package com.anwen.autotest.service.impl;

import com.anwen.autotest.domain.CaseDomain;
import com.anwen.autotest.repository.CaseRepository;
import com.anwen.autotest.service.CaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * Created by an_wch on 2017/12/23.
 */
@Service
public class CaseServiceImpl implements CaseService{

    @Autowired
    private CaseRepository caseRepository;

    @Override
    public List<CaseDomain> findAll(Specification<CaseDomain> specification) {
        return caseRepository.findAll(specification);
    }

    @Override
    public List<CaseDomain> findAll(CaseDomain vo) {
        Specification<CaseDomain> specification = this.getSpecificationByTaskQueryVo(vo);
        return this.findAll(specification);
    }


    private Specification<CaseDomain> getSpecificationByTaskQueryVo(CaseDomain vo) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (Objects.nonNull(vo.getPlatform())) {
                predicates.add(cb.like(root.get(CaseDomain.FIELD_PLATFORM), vo.getPlatform() + "%"));
            }
            if (Objects.nonNull(vo.getCaseTitle())) {
                predicates.add(cb.equal(root.get(CaseDomain.FIELD_CASE_TITLE), vo.getCaseTitle()));
            }
            if (Objects.nonNull(vo.getDirectoryId())) {
                predicates.add(cb.like(root.get(CaseDomain.FIELD_DIRECTORY_ID), vo.getDirectoryId()));
            }
            if (Objects.nonNull(vo.getSetupCaseId())) {
                predicates.add(cb.like(root.get(CaseDomain.FIELD_SETUP_CASE_ID), vo.getSetupCaseId()));
            }
            if (Objects.nonNull(vo.getTeardownCaseId())) {
                predicates.add(cb.equal(root.get(CaseDomain.FIELD_TEARDOWN_CASE_ID), vo.getTeardownCaseId()));
            }
            // 只能查看未删除的
            predicates.add(cb.equal(root.get(CaseDomain.FIELD_IS_DELETE),0));
            return query.where(predicates.toArray(new Predicate[predicates.size()]))
                    .getRestriction();
        };
    }
}
