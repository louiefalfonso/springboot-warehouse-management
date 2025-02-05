package warehouse.mngt.springwarehousemngt.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import warehouse.mngt.springwarehousemngt.entity.Product;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SupplierDto {

    private Long id;

    private String supplierName;

    private String supplierCode;

    private String supplierCompany;

    private String supplierEmail;

    private String contactInfo;

    private String status;

    private String contactAddress;

    private List<Product> products;
}
