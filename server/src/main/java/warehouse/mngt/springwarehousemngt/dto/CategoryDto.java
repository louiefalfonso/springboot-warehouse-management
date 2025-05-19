package warehouse.mngt.springwarehousemngt.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import warehouse.mngt.springwarehousemngt.entity.Category;
import warehouse.mngt.springwarehousemngt.entity.Product;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CategoryDto {

    private Long id;

    private String categoryName;

    private String categoryCode;

    private String categoryDescription;

    private String categoryStatus;

    private List<Product> products;
}
