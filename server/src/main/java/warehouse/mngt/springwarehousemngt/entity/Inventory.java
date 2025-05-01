package warehouse.mngt.springwarehousemngt.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    @ManyToOne
    private Product product;

    @ManyToOne
    private Warehouse warehouse;

    private int quantity;

    private boolean deleted = false;

}
