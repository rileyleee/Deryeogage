package com.kkosunnae.deryeogage.global.config;
import com.kkosunnae.deryeogage.global.interceptor.JwtInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
@EnableWebMvc
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {


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

    private final JwtInterceptor jwtInterceptor;
    @Override
    public void addInterceptors (InterceptorRegistry registry) { //로그인하지 않아도 들어갈 수 있는 uri 등록
        registry.addInterceptor(jwtInterceptor)
                .addPathPatterns("/**")
                .excludePathPatterns("/swagger-ui/index.html","/users/oauth", "/board");
    }

    //CORS 에러를 해결하기 위해서 컨트롤러에서 세분화 하여 처리할 수도 있지만
    //전역설정처럼 여기서 한방에 처리할 수도 있음..
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedOrigins("*").allowedMethods("GET", "POST", "PATCH","DELETE", "PUT");
    }
    
}