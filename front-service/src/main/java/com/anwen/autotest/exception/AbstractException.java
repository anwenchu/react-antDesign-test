package com.anwen.autotest.exception;

import com.anwen.autotest.enums.ExceptionEnum;

/**
 * Created by an_wch on 2017/12/13.
 */

public class AbstractException extends RuntimeException {
    /**
     * 异常码
     */
    private Integer code;

    /**
     * 异常信息
     */
    private String message;

    /**
     * 构造器
     */
    public AbstractException() {
        super();
    }

    /**
     * 构造器
     */
    public AbstractException(ExceptionEnum exceptionEnum) {
        super(exceptionEnum.getMessage());
        this.code = exceptionEnum.getCode();
        this.message = exceptionEnum.getMessage();
    }

    /**
     * 构造器
     *
     * @param message
     */
    public AbstractException(String message) {
        super(message);
        message = message;
    }

    /**
     * 构造器
     *
     * @param code
     * @param message
     */
    public AbstractException(Integer code, String message) {
        super(message);
        this.code = code;
        this.message = message;
    }

    /**
     * 获取code
     *
     * @return
     */
    public Integer getCode() {
        return code;
    }

    /**
     * 获取message
     *
     * @return
     */
    public String getMessage() {
        return message;
    }
}
