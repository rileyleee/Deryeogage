package com.kkosunnae.deryeogage.global.config;
import com.kkosunnae.deryeogage.global.interceptor.JwtInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {
    private final JwtInterceptor jwtInterceptor;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/swagger-ui/**")
                .addResourceLocations("classpath:/META-INF/resources/webjars/springfox-swagger-ui/")
                .resourceChain(false);
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/swagger-ui/")
                .setViewName("forward:/swagger-ui/index.html");
    }

    @Override
    public void addInterceptors (InterceptorRegistry registry) { //로그인하지 않아도 들어갈 수 있는 uri 등록
        registry.addInterceptor(jwtInterceptor)
                .addPathPatterns("/api/**")
                .excludePathPatterns(
                        "/swagger-ui/**",
                        "/swagger-ui.html",
                        "/swagger-resources/**",
                        "/v3/api-docs/**",
                        "/webjars/**",
                        "/api/users/oauth",
                        "/api/boards/list",
                        "/api/boards/each/**"); //추천 url도 담아야 해?

            
    }

    //CORS 에러를 해결하기 위해서 컨트롤러에서 세분화 하여 처리할 수도 있지만
    //전역설정처럼 여기서 한방에 처리할 수도 있음..
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000","http://127.0.0.1:5500/","https://i9b307.p.ssafy.io/") // 프론트엔드 서버의 도메인을 명시
                .allowedMethods("GET", "POST", "PATCH", "DELETE", "PUT", "OPTIONS")
                .allowCredentials(true) // 인증 정보 포함 여부 (withCredentials: true일 때 필요)
                .maxAge(3600); // 캐시 지속 시간 설정 (선택 사항)
    }
}