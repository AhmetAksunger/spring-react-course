package com.hoexify.ws.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hoexify.ws.file.FileService;

@RestController
public class FileController {

	@Autowired
	private FileService fileService;
	
	@PostMapping("/api/1.0/hoax-attachments")
	Map<String, String> saveHoaxAttachment(MultipartFile file) {
		String fileName = fileService.saveHoaxAttachment(file);
		Map<String,String> response = new HashMap<>();
		response.put("name", fileName);
		return response;
	}
}
