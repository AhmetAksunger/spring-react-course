package com.hoexify.ws.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.hoexify.ws.entity.User;

import jakarta.transaction.Transactional;

public interface UserRepository extends JpaRepository<User, Long>{

	boolean existsByUsername (String username);
	
	User findByUsername(String username);

	Page<User> findByUsernameNot(String username, Pageable page); 

	@Transactional
	void deleteByUsername(String username);
}
