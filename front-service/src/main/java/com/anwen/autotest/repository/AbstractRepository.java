//package com.anwen.autotest.repository;
//
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//
///**
// * Created by an_wch on 2017/12/13.
// */
//public interface AbstractRepository<T,ID> {
//    Page<T> findAllCommon(Pageable pageable);
//
//    Page<T> findAllCommon(Object spec ,Pageable pageable);
//
//    T saveCommon(T entity);
//
//    boolean existsCommon(ID id);
//
//    T findOneCommon(ID id);
//
//    long countCommon();
//
//    void deleteCommon(ID id);
//}
//
