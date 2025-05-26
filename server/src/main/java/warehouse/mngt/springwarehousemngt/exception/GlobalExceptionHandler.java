package warehouse.mngt.springwarehousemngt.exception;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.InvalidDataAccessResourceUsageException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import warehouse.mngt.springwarehousemngt.dto.ResponseDto;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ResponseDto> responseNotFountException(ResourceNotFoundException rs){

        ResponseDto responseDto = new ResponseDto(rs.getMessage(), false, LocalDateTime.now());
        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.BAD_REQUEST);

    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> methodArgumentNotValidException(MethodArgumentNotValidException rs){

        Map<String, String>  error = new HashMap<>();
        rs.getBindingResult().getAllErrors().forEach((err)->{
            String fieldName = ((FieldError) err).getField();
            String massage = err.getDefaultMessage();
            error.put(fieldName, massage);
        });

        return new ResponseEntity<Map<String, String>>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ResponseDto> dataIntegrityViolationException(DataIntegrityViolationException rs){
        String msg="data is already store in database!!"
                +rs.getMostSpecificCause().toString();
        ResponseDto responseModel = new ResponseDto(msg, false, LocalDateTime.now());
        return new ResponseEntity<ResponseDto>(responseModel, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidDataAccessResourceUsageException.class)
    public ResponseEntity<ResponseDto> invalidDataAccessResourceUsageException(InvalidDataAccessResourceUsageException rs){
        ResponseDto responseModel = new ResponseDto(rs.getMessage(), false, LocalDateTime.now());
        return new ResponseEntity<ResponseDto>(responseModel, HttpStatus.BAD_REQUEST);
    }
}

