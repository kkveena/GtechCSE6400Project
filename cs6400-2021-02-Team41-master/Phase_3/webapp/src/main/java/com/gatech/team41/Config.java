package com.gatech.team41;

import com.gatech.team41.interceptor.LoginHandler;
import com.gatech.team41.repository.Login;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.sql.DataSource;
@Configuration
@ComponentScan("com.gatech.team41")
public class Config implements WebMvcConfigurer {
    private static final Logger logger = LoggerFactory.getLogger(Config.class);
    
    @Autowired
    private LoginHandler loginHandler;
    @Bean
    public DataSource mysqlDataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("com.mysql.jdbc.Driver");
        dataSource.setUrl("jdbc:mysql://db:3306/willmart_schema");
        dataSource.setUsername("root");
        dataSource.setPassword("pass");
        return dataSource;
    }
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        logger.info(String.format("registry.addInterceptor:%s", "loginHandler"));
        registry.addInterceptor(loginHandler).addPathPatterns("/**").excludePathPatterns("/login");
    }
}