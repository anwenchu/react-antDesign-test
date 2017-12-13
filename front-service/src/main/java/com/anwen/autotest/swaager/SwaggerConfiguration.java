package com.anwen.autotest.swaager;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * EnableSwagger2配置
 * Created by an_wch on 2017/12/13.
 */
@Configuration
@EnableSwagger2
@ConfigurationProperties(prefix = SwaggerConfiguration.PREFIX)
public class SwaggerConfiguration {
    /**
     *
     */
    public static final String PREFIX = "swagger2";

    /**
     *
     */
    private String basePackage;

    /**
     *
     */
    private String title;

    /**
     *
     */
    private String contactName;

    /**
     *
     */
    private String contactUrl;

    /**
     *
     */
    private String version;

    /**
     * api
     *
     * @return
     */
    @Bean
    public Docket api() {

        return new Docket(DocumentationType.SWAGGER_2).apiInfo(info()).select()
                .apis(RequestHandlerSelectors.basePackage(basePackage)).paths(PathSelectors.any())
                .build();
    }

    /**
     * info
     *
     * @return
     */
    private ApiInfo info() {

        return new ApiInfoBuilder().title(title).contact(new Contact(contactName, contactUrl, null))
                .version(version).build();
    }

    public void setBasePackage(String basePackage) {
        this.basePackage = basePackage;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setContactName(String contactName) {
        this.contactName = contactName;
    }

    public void setContactUrl(String contactUrl) {
        this.contactUrl = contactUrl;
    }

    public void setVersion(String version) {
        this.version = version;
    }
}
