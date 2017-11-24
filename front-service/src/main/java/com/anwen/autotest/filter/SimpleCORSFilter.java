package com.anwen.autotest.filter;

import org.springframework.stereotype.Component;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created By anwen
 */
@Component
public class SimpleCORSFilter implements Filter {

    /**
     * 跨域处理
     *
     * @param req
     * @param res
     * @param chain
     * @throws IOException
     * @throws ServletException
     */
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {
        HttpServletResponse response = (HttpServletResponse) res;
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods",
                "GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS, TRACE");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Headers",
                "Content-Type, Accept, X-Requested-With, remember-me");
        chain.doFilter(req, res);
    }

    /**
     * @param filterConfig
     * @see javax.servlet.Filter#init(javax.servlet.FilterConfig)
     */
    public void init(FilterConfig filterConfig) {

    }

    /**
     * @see javax.servlet.Filter#destroy()
     */
    public void destroy() {

    }

}
