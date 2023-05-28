package com.hoexify.ws.business;

import org.hibernate.proxy.HibernateProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hoexify.ws.dto.AuthResponse;
import com.hoexify.ws.dto.CredentialsRequest;
import com.hoexify.ws.dto.UserLoginResponse;
import com.hoexify.ws.entity.User;
import com.hoexify.ws.error.AuthenticationException;
import com.hoexify.ws.error.AuthorizationException;
import com.hoexify.ws.mapper.ModelMapperService;
import com.hoexify.ws.repository.UserRepository;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.transaction.Transactional;

@Service
public class AuthService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private ModelMapperService mapperService;
	
	public AuthResponse authenticate(CredentialsRequest credentials) {
		
		User user = userRepository.findByUsername(credentials.getUsername());	
		if(user == null) {
			throw new AuthenticationException();
		}
		
		boolean matches = passwordEncoder.matches(credentials.getPassword(), user.getPassword());
		if(matches) {
			AuthResponse authResponse = new AuthResponse();
			
			authResponse.setUser(mapperService.forResponse().map(user, UserLoginResponse.class));
			
			String token = Jwts.builder().setSubject("" + user.getId()).signWith(SignatureAlgorithm.HS512, "my-app-secret").compact();
			authResponse.setToken(token);
			
			return authResponse;
		}else {
			throw new AuthenticationException();
		}
		
	}

	@Transactional
	public UserDetails getUserDetails(String token) {
		JwtParser parser = Jwts.parser().setSigningKey("my-app-secret");
		
		try {
			parser.parse(token);
			Claims claims = parser.parseClaimsJws(token).getBody();
			long userId = Long.valueOf(claims.getSubject());
			User user = userRepository.findById(userId).orElseThrow();
			return user;
		} catch (Exception e) {
			System.err.println(e.getMessage());
		}
		
		return null;
	}
}
