package com.hoexify.ws.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.hoexify.ws.entity.Hoax;

import jakarta.transaction.Transactional;

public interface HoaxRepository extends JpaRepository<Hoax, Long>{

	Page<Hoax> findAllByOrderByTimeStampDesc(Pageable page);
	
	Page<Hoax> findAllByUserUsernameOrderByTimeStampDesc(String username,Pageable page);
	
	Page<Hoax> findByIdLessThanEqualOrderByTimeStampDesc(long id, Pageable page);
	
	Page<Hoax> findByIdLessThanEqualAndUserUsernameOrderByTimeStampDesc(long id, String username, Pageable page);

	long countByIdGreaterThan(long id);
	
	@Transactional
	void deleteByUserUsername(String username);
}
