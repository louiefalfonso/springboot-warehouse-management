package warehouse.mngt.springwarehousemngt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ResponseDto {

    private String Messege;
    private boolean status;
    private LocalDateTime DateAndTime;
}
