package com.hoexify.ws.mapper;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Service
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ModelMapperManager implements ModelMapperService {

	 	@Autowired
	    private ModelMapper modelMapper;

	    @Override
	    public ModelMapper forResponse() {
	        modelMapper.getConfiguration()
	                .setAmbiguityIgnored(true)
	                .setMatchingStrategy(MatchingStrategies.LOOSE);

	        return modelMapper;
	    }

	    @Override
	    public ModelMapper forRequest() {

	        modelMapper.getConfiguration()
	                .setAmbiguityIgnored(true)
	                .setMatchingStrategy(MatchingStrategies.STANDARD);
	        return modelMapper;
	    }
}
