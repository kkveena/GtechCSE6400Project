package com.gatech.team41.interceptor;

import com.gatech.team41.repository.Report7;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@Component
public class LoginHandler implements HandlerInterceptor {
    private static final Logger logger = LoggerFactory.getLogger(LoginHandler.class);
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException {
        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        HttpSession session = attr.getRequest().getSession(true);
        if (session.getAttribute("loggedIn") == null) {
            response.setStatus(403);
            response.sendRedirect("/login");
            return false;
        }
        return true;
    }
}
