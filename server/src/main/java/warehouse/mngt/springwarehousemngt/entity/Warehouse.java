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
@Table(name = "warehouses")
public class Warehouse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String warehouseName;

    private String warehouseCode;

    private String officeHours;

    private String warehouseEmail;

    private String warehouseLocation;

    private String warehouseManager;

    private String contactNumber;

    private String description;

}
