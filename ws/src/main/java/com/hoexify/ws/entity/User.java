package com.hoexify.ws.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@NotNull(message = "{hoexify.username.NotNull.message}")
	@NotEmpty
	@Size(min = 4, max = 20)
	@UniqueUsername(message = "{hoexify.username.UniqueUsername.message}")
	private String username;
	
	@NotNull
	@NotEmpty
	@Size(min = 4, max = 20)
	private String displayName;
	
	@NotNull
	@NotEmpty
	@Size(min = 5)
	@Pattern(regexp="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$", message = "{hoexify.password.Pattern.message}")
	private String password;
	
}
