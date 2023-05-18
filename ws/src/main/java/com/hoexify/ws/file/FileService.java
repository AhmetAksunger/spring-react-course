package com.hoexify.ws.file;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.UUID;

import org.apache.tika.Tika;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.hoexify.ws.configuration.AppConfiguration;

@Service
public class FileService {

	@Autowired
	private AppConfiguration appConfiguration;
	
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
	
}
