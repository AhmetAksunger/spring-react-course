package com.hoexify.ws.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hoexify.ws.entity.Hoax;

public interface HoaxRepository extends JpaRepository<Hoax, Long>{

}
