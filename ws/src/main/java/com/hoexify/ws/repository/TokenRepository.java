package com.hoexify.ws.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hoexify.ws.entity.Token;

public interface TokenRepository extends JpaRepository<Token, String>{

}
