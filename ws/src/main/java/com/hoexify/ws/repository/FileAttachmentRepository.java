package com.hoexify.ws.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hoexify.ws.entity.FileAttachment;
import com.hoexify.ws.entity.User;

public interface FileAttachmentRepository extends JpaRepository<FileAttachment, Long>{

	
	List<FileAttachment> findByDateBeforeAndHoaxIsNull (Date date);
	
	List<FileAttachment> findByHoaxUser(User user);
}
