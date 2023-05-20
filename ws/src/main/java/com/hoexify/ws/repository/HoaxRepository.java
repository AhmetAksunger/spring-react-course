package com.hoexify.ws.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.hoexify.ws.entity.Hoax;

public interface HoaxRepository extends JpaRepository<Hoax, Long>{

	Page<Hoax> findAllByOrderByTimeStampDesc(Pageable page);
	
	Page<Hoax> findAllByUserUsernameOrderByTimeStampDesc(String username,Pageable page);
}
