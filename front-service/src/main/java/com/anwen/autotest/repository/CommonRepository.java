//package com.anwen.autotest.repository;
//
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.jpa.domain.Specification;
//import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
//import org.springframework.data.repository.NoRepositoryBean;
//import org.springframework.data.repository.PagingAndSortingRepository;
//
//import java.util.Date;
//
///**
// * Created by an_wch on 2017/12/13.
// */
//@NoRepositoryBean
//public interface CommonRepository<T> extends PagingAndSortingRepository<T, Long>, JpaSpecificationExecutor<T>, AbstractRepository<T, Long> {
//
//
//    @Override
//    default Page<T> findAllCommon(Pageable pageable) {
//        return this.findAll(pageable);
//    }
//
//    @Override
//    default Page<T> findAllCommon(Object spec, Pageable pageable) {
//        return this.findAll((Specification) spec, pageable);
//    }
//
//
//    @Override
//    default T saveCommon(T entity) {
//        return this.save(entity);
//    }
//
//    @Override
//    default boolean existsCommon(Long aLong) {
//        return this.exists(aLong);
//    }
//
//    @Override
//    default T findOneCommon(Long aLong) {
//        return this.findOne(aLong);
//    }
//
//    @Override
//    default long countCommon() {
//        return this.count();
//    }
//
//    @Override
//    default void deleteCommon(Long aLong) {
//        this.delete(aLong);
//    }
//
//
//}
