package com.kkosunnae.deryeogage.global.interceptor;

import com.kkosunnae.deryeogage.global.util.JwtUtil;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
@RequiredArgsConstructor
@Component
public class JwtInterceptor implements HandlerInterceptor {
    private static final String HEADER_AUTH = "accessToken";

    private final JwtUtil jwtUtil;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (request.getMethod().equals("OPTIONS"))
            return true;

        String token = request.getHeader(HEADER_AUTH);


        if (token != null) {
            if (jwtUtil.validateToken(token)) { // JWT 토큰이 유효하면
                return true;
            }

        }
        // 토큰이 없음
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write("{\"message\":\"유효하지 않은 접근입니다.\"}");
        return false;

    }
}
