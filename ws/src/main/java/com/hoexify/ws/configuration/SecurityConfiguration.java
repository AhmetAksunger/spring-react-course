package com.hoexify.ws.configuration;

import java.io.IOException;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfiguration {

	  @Bean
	  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		  
		  http.headers().frameOptions().disable();
		  
		  http.exceptionHandling().authenticationEntryPoint(new AuthenticationEntryPoint() {
			
			@Override
			public void commence(HttpServletRequest request, HttpServletResponse response,
					AuthenticationException authException) throws IOException, ServletException {
				response.sendError(HttpStatus.UNAUTHORIZED.value(), HttpStatus.UNAUTHORIZED.getReasonPhrase());
				
			}
		});

		  http
		  	.httpBasic().disable()
		    .csrf().disable()
		    .cors().and()
		    .authorizeHttpRequests()
		    .requestMatchers(HttpMethod.PUT,"/api/1.0/users/{username}").authenticated()
		    .requestMatchers(HttpMethod.POST,"/api/1.0/hoaxes").authenticated()
		    .requestMatchers(HttpMethod.POST,"/api/1.0/hoax-attachments").authenticated()
		    .requestMatchers(HttpMethod.POST,"/api/1.0/logout").authenticated()
		    .and()
		    .authorizeHttpRequests()
		    .anyRequest().permitAll();
		  http.httpBasic(Customizer.withDefaults());

		  http.addFilterBefore(tokenFilter(), UsernamePasswordAuthenticationFilter.class);
		return http.build();

	    
	  }

	  @Bean
	  public PasswordEncoder passwordEncoder() {
	    return new BCryptPasswordEncoder();
	  }
	  
	  @Bean
	  public TokenFilter tokenFilter() {
		  return new TokenFilter();
	  }
}
