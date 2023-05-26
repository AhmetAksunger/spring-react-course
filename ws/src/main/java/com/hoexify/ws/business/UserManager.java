package com.hoexify.ws.business;

import java.io.IOException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hoexify.ws.dto.GetUsersResponse;
import com.hoexify.ws.dto.UserUpdateRequest;
import com.hoexify.ws.entity.FileAttachment;
import com.hoexify.ws.entity.User;
import com.hoexify.ws.error.AuthorizationException;
import com.hoexify.ws.error.NotFoundException;
import com.hoexify.ws.file.FileService;
import com.hoexify.ws.mapper.ModelMapperService;
import com.hoexify.ws.repository.FileAttachmentRepository;
import com.hoexify.ws.repository.UserRepository;

@Service
public class UserManager implements UserService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private ModelMapperService mapperService;
	
	@Autowired
	private FileService fileService;
	
	@Override
	public void save(User user) {
		
		String encryptedPassword = passwordEncoder.encode(user.getPassword());
		user.setPassword(encryptedPassword);
		userRepository.save(user);
		
	}

	@Override
	public Page<GetUsersResponse> getUsers(Pageable page, User user) {
	    Page<User> users;
		
		if (user == null) {
	    	users = userRepository.findAll(page);	
	    }
	    else {
	    	users = userRepository.findByUsernameNot(user.getUsername(),page);
	    }
	    return users.map(userInList -> mapperService.forResponse().map(userInList, GetUsersResponse.class));
	}

	@Override
	public GetUsersResponse getByUsername(String username) {
		User user = userRepository.findByUsername(username);
		if(user == null) {
			throw new NotFoundException();
		}
		
		GetUsersResponse response = mapperService.forResponse().map(user, GetUsersResponse.class);
		return response;
	}

	@Override
	public GetUsersResponse update(UserUpdateRequest updateRequest, String username) {
		
		User user = userRepository.findByUsername(username);
		if(updateRequest.getDisplayName() != null){
			user.setDisplayName(updateRequest.getDisplayName());	
		}
		if(updateRequest.getImage() != null) {
			String oldImageName = user.getImage();
			fileService.deleteFile(oldImageName);
			try {
				String storedFileName = fileService.writeBase64EncodedStringToFile(updateRequest.getImage());
				user.setImage(storedFileName);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		
		}
		
		user = userRepository.save(user);
		
		GetUsersResponse response = mapperService.forResponse().map(user, GetUsersResponse.class);
		return response;
		
	}

	@Override
	public void deleteUser(String username, User loggedInUser) {
		if(!loggedInUser.getUsername().equals(username)) {
			throw new AuthorizationException();
		}
		
		fileService.deleteAllStoredFileForUser(loggedInUser);
		
		userRepository.deleteByUsername(username);
	}

}
