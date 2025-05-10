package warehouse.mngt.springwarehousemngt.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WarehouseDto {

    private Long id;

    private String warehouseName;

    private String warehouseCode;

    private String officeHours;

    private String warehouseLocation;

    private String warehouseManager;

    private String contactNumber;

    private String description;
}
