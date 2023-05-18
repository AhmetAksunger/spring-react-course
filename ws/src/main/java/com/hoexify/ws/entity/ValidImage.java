package com.hoexify.ws.entity;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Target({FIELD})
@Retention(RUNTIME)
@Constraint(validatedBy = {ValidImageValidator.class })
public @interface ValidImage {

	String message() default "unsupported file";

	Class<?>[] groups() default { };

	Class<? extends Payload>[] payload() default { };
	
}
