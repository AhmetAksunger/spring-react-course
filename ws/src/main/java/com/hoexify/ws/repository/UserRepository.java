package com.hoexify.ws.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hoexify.ws.entity.User;

public interface UserRepository extends JpaRepository<User, Long>{

	boolean existsByUsername (String username);
	
}
