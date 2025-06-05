package warehouse.mngt.springwarehousemngt.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import warehouse.mngt.springwarehousemngt.entity.Product;
import warehouse.mngt.springwarehousemngt.entity.Warehouse;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InventoryDto {

    private Long id;

    private String inventoryCode;

    private int quantity;

    private String value;

    private String location;

    private int reorderPoint;

    private BigDecimal unitCost;

    private String remarks;

    private String inventoryManager;

    private Product product;

    private Warehouse warehouse;


}
