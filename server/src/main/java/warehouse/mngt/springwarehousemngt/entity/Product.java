package warehouse.mngt.springwarehousemngt.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String productName;

    private String productNumber;

    private String description;

    private String sku;

    private String productBrand;

    @Column(nullable = false)
    private int quantity;

    @Column(nullable = false)
    private BigDecimal price;

    @ManyToOne
    @JoinColumn(name = "supplier_id", nullable = false)
    private Supplier supplier;

    private boolean deleted = false;

    public Product(long l, String productName, String productNumber, String description, int i, BigDecimal bigDecimal, String supplier, String sku, String productBrand) {
    }

    public Product(long l, String productName, String productNumber, String description, int quantity, BigDecimal price, Supplier supplier, String sku, String productBrand) {
    }
}
