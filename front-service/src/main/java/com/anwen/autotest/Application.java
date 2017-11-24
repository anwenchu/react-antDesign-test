package com.anwen.autotest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ImportResource;

/**
 * Created by anwen
 */
@SpringBootApplication
//@ImportResource(value = {"classpath:core/dao/dao-context.xml"})
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class,args);
    }
}
