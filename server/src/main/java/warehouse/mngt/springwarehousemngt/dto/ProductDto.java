package warehouse.mngt.springwarehousemngt.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import warehouse.mngt.springwarehousemngt.entity.Category;
import warehouse.mngt.springwarehousemngt.entity.Supplier;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductDto {

    private Long id;

    private String productName;

    private String productNumber;

    private String description;

    private int quantity;

    private String sku;

    private String productBrand;

    private BigDecimal price;

    private Supplier supplier;

    private Category category;

    // for unit test
    public ProductDto(long l, String productName, String productNumber, String description, int i, BigDecimal bigDecimal, String supplier, String sku, String productBrand) {
    }
}
