package com.anwen.autotest.service.impl;

import com.anwen.autotest.domain.ElementDomain;
import com.anwen.autotest.repository.ElementRepository;
import com.anwen.autotest.service.ElementService;
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
public class ElementServiceImpl implements ElementService{

    @Autowired
    private ElementRepository elementRepository;

    @Override
    public List<ElementDomain> findAll(Specification<ElementDomain> specification) {
        return elementRepository.findAll(specification);
    }

    @Override
    public List<ElementDomain> findAll(ElementDomain vo) {
        Specification<ElementDomain> specification = this.getSpecificationByTaskQueryVo(vo);
        return this.findAll(specification);
    }


    private Specification<ElementDomain> getSpecificationByTaskQueryVo(ElementDomain vo) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (Objects.nonNull(vo.getPlatform())) {
                predicates.add(cb.like(root.get(ElementDomain.FIELD_PLATFORM), vo.getPlatform() + "%"));
            }
            if (Objects.nonNull(vo.getAvailable())) {
                predicates.add(cb.equal(root.get(ElementDomain.FIELD_AVAILABLE), vo.getAvailable()));
            }
            if (Objects.nonNull(vo.getElementId())) {
                predicates.add(cb.like(root.get(ElementDomain.FIELD_ELEMENT_ID), vo.getElementId()));
            }
            if (Objects.nonNull(vo.getElementText())) {
                predicates.add(cb.like(root.get(ElementDomain.FIELD_ELEMENT_TEXT), vo.getElementText()));
            }
            // 只能查看未删除的
            predicates.add(cb.equal(root.get(ElementDomain.FIELD_IS_DELETE),0));
            return query.where(predicates.toArray(new Predicate[predicates.size()]))
                    .getRestriction();
        };
    }
}
