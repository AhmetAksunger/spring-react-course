package com.hoexify.ws.file;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.Date;
import java.util.UUID;

import org.apache.tika.Tika;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.hoexify.ws.configuration.AppConfiguration;
import com.hoexify.ws.entity.FileAttachment;
import com.hoexify.ws.entity.User;
import com.hoexify.ws.repository.FileAttachmentRepository;

@Service
@EnableScheduling
public class FileService {

	@Autowired
	private AppConfiguration appConfiguration;
	
	@Autowired
	private FileAttachmentRepository fileAttachmentRepository;
	
	public String writeBase64EncodedStringToFile(String image) throws IOException {
				
		String fileName = generateRandomName();
		File target = new File(appConfiguration.getUploadPath() + "/" + fileName);
		OutputStream outputStream = new FileOutputStream(target);
		
		byte[] base64decoded = Base64.getDecoder().decode(image);
				
		outputStream.write(base64decoded);
		return fileName;
	}
	
	public String generateRandomName() {
		return UUID.randomUUID().toString().replaceAll("-", "");
	}

	public void deleteFile(String oldImageName) {

		if(oldImageName == null) {
			return;
		}
		
		String filePath = appConfiguration.getUploadPath() + "/" + oldImageName;
		
		try {
			Files.deleteIfExists(Paths.get(filePath));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public String detectType(String image) {
		
		byte[] base64decoded = Base64.getDecoder().decode(image);
		Tika tika = new Tika();
		return tika.detect(base64decoded);
	}

	public FileAttachment saveHoaxAttachment(MultipartFile multipartFile) {

		String fileName = generateRandomName();
		File target = new File(appConfiguration.getUploadPath() + "/" + fileName);
		OutputStream outputStream;
		try {
			outputStream = new FileOutputStream(target);
			outputStream.write(multipartFile.getBytes());

		} catch (Exception e) {
		}
		
		FileAttachment attachment = new FileAttachment();
		attachment.setName(fileName);
		attachment.setDate(new Date());
		
		return fileAttachmentRepository.save(attachment);
		
	}
	
	//this function will run each 24 hours
	@Scheduled(fixedRate = 24* 60 * 60 * 1000)
	public void cleanupStorage() {
		//deleting attachments that are not related with any hoax and are from 24 hours ago
		Date twentyFourHoursAgo = new Date(System.currentTimeMillis() - 24 * 60 * 60 * 1000);
		var filesToBeDeleted = fileAttachmentRepository.findByDateBeforeAndHoaxIsNull(twentyFourHoursAgo);
		
		for (FileAttachment fileAttachment : filesToBeDeleted) {
			deleteFile(fileAttachment.getName());
			fileAttachmentRepository.deleteById(fileAttachment.getId());
		}
	}

	public void deleteAllStoredFileForUser(User user) {
		
		//deleting the profile image from the storage
		if(user.getImage() != null) {
			deleteFile(user.getImage());	
		}
		
		//deleting all of the user's hoaxes' file attachments
		var fileAttachmentsToBeRemoved = fileAttachmentRepository.findByHoaxUser(user);
	
		for (FileAttachment fileAttachment : fileAttachmentsToBeRemoved) {
			deleteFile(fileAttachment.getName());
		}
	}
	
}
