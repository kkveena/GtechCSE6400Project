package com.gatech.team41.service;

import com.gatech.team41.repository.AggregatorRepository;
import com.gatech.team41.repository.LoginRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class LoginService {
    public LoginService(LoginRepository loginRepository) {
        this.loginRepository = loginRepository;
    }

    private final LoginRepository loginRepository;

    public List<Map<String, Object>> getDataForLogin(String uId, String pwd) {
        return loginRepository.getDataForLogin(uId, pwd);
    }
}
