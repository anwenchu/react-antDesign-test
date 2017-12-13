package com.anwen.autotest.controller;

import com.anwen.autotest.enums.ExceptionEnum;
import com.anwen.autotest.exception.AbstractException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Supplier;

/**
 * 抽象Controller
 * Created by an_wch on 2017/12/13.
 */
@Slf4j
public class AbstractController {

    /**
     * 通用带请求参数和返回值函数式方法
     *
     * @param function 逻辑函数
     * @param param 函数参数
     * @param paging 是否分页了
     * @param <T> 函数请求参数类型
     * @param <R> 函数返回类型
     * @return
     */
    public <T, R> ResponseEntity wrapper(Function<T, R> function, T param, Boolean paging) {
        try {
            R r = function.apply(param);
            Object val = r;
            if (paging) {
//                val = new PageInfo<>((List<T>) r);
            }
            return ResponseEntity.ok(val);
        }
        catch (AbstractException abstractException) {
            log.error("controller 内部异常：{}", abstractException.getMessage(), abstractException);
            return error(abstractException);
        }
        catch (Exception e) {
            log.error("controller 内部异常：{}", e.getMessage(), e);
            return error();
        }
    }

    /**
     * 通用带请求参数不带返回值函数式方法
     *
     * @param function 逻辑函数
     * @param param 函数参数
     * @param <P> 函数请求参数类型
     * @return
     */
    public <P> ResponseEntity wrapperConsumer(Consumer<P> function, P param) {
        try {
            function.accept(param);
            return ok();
        }
        catch (AbstractException abstractException) {
            log.error("controller 内部异常：{}", abstractException.getMessage(), abstractException);
            return error(abstractException);
        }
        catch (Exception e) {
            log.error("controller 内部异常：{}", e.getMessage(), e);
            return error();
        }
    }

    /**
     * 通用带返回值不带请求参数的函数式方法
     *
     * @param function 逻辑函数
     * @param paging 是否分页了
     * @param <T> 函数请求参数类型
     * @return
     */
    public <T> ResponseEntity wrapperSupplier(Supplier<T> function, Boolean paging) {
        try {
            T t = function.get();
            Object val = t;
            if (paging) {
//                val = new PageInfo<>((List<T>) t);
            }
            return ok(val);
        }
        catch (AbstractException abstractException) {
            log.error("controller 内部异常：{}", abstractException.getMessage(), abstractException);
            return error(abstractException);
        }
        catch (Exception e) {
            log.error("controller 内部异常：{}", e.getMessage(), e);
            return error();
        }
    }

    /**
     * 返回 http 200
     *
     * @return
     */
    public ResponseEntity ok() {
        return new ResponseEntity(HttpStatus.OK);
    }

    /**
     * 返回http 200 并携带数据
     *
     * @param body 数据
     * @param <T>
     * @return
     */
    public <T> ResponseEntity ok(T body) {
        return ResponseEntity.ok(body);
    }

    /**
     * 返回 http 500 携带默认错误信息
     *
     * @return
     */
    public ResponseEntity error() {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .body(ExceptionEnum.PORTAL_EXCEPTION);
    }

    /**
     * 返回http 500 携带指定错误信息
     *
     * @param body
     * @param <T>
     * @return
     */
    public <T> ResponseEntity error(T body) {
        int status = HttpStatus.INTERNAL_SERVER_ERROR.value();
        if (body instanceof AbstractException) {
//            status = ((AbstractException) body).getCode();
            ExceptionEnum exceptionEnum = ExceptionEnum.PORTAL_EXCEPTION;
            exceptionEnum.setCode(((AbstractException) body).getCode());
            exceptionEnum.setMessage(((AbstractException) body).getMessage());
            body = (T) exceptionEnum;
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR.value()).body(body);
    }

    /**
     * 返回指定 http状态 携带指定信息
     *
     * @param status
     * @param body
     * @param <T>
     * @return
     */
    public <T> ResponseEntity error(HttpStatus status, T body) {
        return ResponseEntity.status(status.value()).body(body);
    }
}

