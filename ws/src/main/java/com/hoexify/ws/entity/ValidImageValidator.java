package com.hoexify.ws.entity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.hoexify.ws.file.FileService;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

@Component
public class ValidImageValidator implements ConstraintValidator<ValidImage, String>{

	@Autowired
	private FileService fileService;
	
	@Override
	public boolean isValid(String image, ConstraintValidatorContext context) {
		
		if(image == null || image.isBlank() || image.isEmpty()) {
			return true;
		}
		
		String fileType = fileService.detectType(image);
				
		if(fileType.equals("image/jpg") || fileType.equals("image/png")|| fileType.equals("image/jpeg")) {
			return true;
		}else {
			return false;	
		}
	}

	
	
	
}
