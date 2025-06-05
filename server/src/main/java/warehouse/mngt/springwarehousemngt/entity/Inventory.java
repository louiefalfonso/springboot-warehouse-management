package warehouse.mngt.springwarehousemngt.entity;

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
@Table(name = "inventories")
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String inventoryCode;

    private int quantity;

    private String condition;

    private String value;

    private String location;

    private int reorderPoint;

    private BigDecimal unitCost;

    private String remarks;

    private String inventoryManager;

    @ManyToOne
    private Product product;

    @ManyToOne
    private Warehouse warehouse;

    private boolean deleted = false;

}
