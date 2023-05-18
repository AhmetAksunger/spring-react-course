package com.hoexify.ws.dto;

import com.hoexify.ws.entity.ValidImage;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdateRequest {
	
	@NotNull(message = "{hoexify.username.NotNull.message}")
	@NotEmpty
	@Size(min = 4, max = 20)
	private String displayName;
	
	@ValidImage(message = "{hoexify.image.ValidImage.message}")
	private String image;
}
