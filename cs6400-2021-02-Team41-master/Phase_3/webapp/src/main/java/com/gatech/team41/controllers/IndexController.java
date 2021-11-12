package com.gatech.team41.controllers;

import com.gatech.team41.service.AggregatorService;
import com.gatech.team41.service.LoginService;
import org.springframework.boot.web.servlet.server.Session;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class IndexController {
    public IndexController(LoginService loginService) {
        this.loginService = loginService;
    }
    private final LoginService loginService;

    @GetMapping("/index")
    public ModelAndView index(Model model) {
        ModelAndView modelAndView;
        HttpSession session = getHttpSession();
        String viewName = "login";
        if (session.getAttribute("loggedIn") != null) {
            model.addAttribute("msg", String.format("Welcome, %s!", ((List<Map<String, Object>>)session.getAttribute("loggedIn")).get(0).get("uId").toString()));
            viewName = "index";
            modelAndView = new ModelAndView(viewName);
        } else {
            model.addAttribute("msg", "Login here.");
            modelAndView = new ModelAndView(new RedirectView(viewName));
        }
        return modelAndView;
    }
    @GetMapping("/login")
    public String login(Model model) {
        model.addAttribute("msg", "Login here:");
        return "login";
    }
    @GetMapping("/logout")
    public RedirectView logout(Model model) {
        getHttpSession().setAttribute("loggedIn", null);
        return new RedirectView("login");
    }

    @PostMapping("/login")
    public RedirectView doLogin(@RequestParam("uid") String uid,
                                @RequestParam(name="pwd", required=false, defaultValue="") String pwd, Model model) {

        String viewName = "index";
        if (!uid.isEmpty() && !pwd.isEmpty() ) {
            List<Map<String, Object>> loggedIn = loginService.getDataForLogin(uid, pwd);
            dummyLogin(loggedIn, uid, pwd);
            if (loggedIn.isEmpty()) {
                model.addAttribute("msg", "Incorrect login.");
                viewName = "login";
            } else {
                HttpSession session = getHttpSession();
                session.setAttribute("loggedIn", loggedIn);
            }
        } else {
            model.addAttribute("msg", "Incorrect login.");
            viewName = "login";
        }
        return new RedirectView(viewName);
    }

    private void dummyLogin(List<Map<String, Object>> loggedIn, String uid, String pwd) {
        if (loggedIn.isEmpty() && uid.equals("anonymous") && pwd.equals("anonymous")) {
            Map<String, Object> anyLoggedIn = new HashMap<>();
            anyLoggedIn.put("uId", "anonymous");
            loggedIn.add(anyLoggedIn);
        }
    }
    private HttpSession getHttpSession() {
        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        HttpSession session = attr.getRequest().getSession(true);
        return session;
    }
}
