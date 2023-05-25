package com.hoexify.ws.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "hoaxes")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Hoax {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(length = 1000)
	private String content;
	
	private Date timeStamp;
	
	@ManyToOne
	private User user;
	
	@OneToOne(mappedBy = "hoax", orphanRemoval = true)
	private FileAttachment fileAttachment;
}
