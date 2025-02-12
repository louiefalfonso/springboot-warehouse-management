package warehouse.mngt.springwarehousemngt.Repository;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import warehouse.mngt.springwarehousemngt.entity.Product;
import warehouse.mngt.springwarehousemngt.entity.Warehouse;
import warehouse.mngt.springwarehousemngt.repository.WarehouseRepository;

@DataJpaTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class WarehouseRepositoryUnitTests {

    @Autowired
    private WarehouseRepository warehouseRepository;

    @Test
    @DisplayName("Test 1: Create New Warehouse")
    public void createNewWarehouseTest(){
        // Create a new warehouse object
        Warehouse warehouse = Warehouse.builder()
                .warehouseName("Shelby & Co. Tradings")
                .warehouseLocation("Leeds, UK")
                .warehouseManager("Daniel Shelby")
                .contactNumber("024834637920")
                .deleted(false)
                .build();

        // Save the warehouse
        Warehouse savedWarehouse = warehouseRepository.save(warehouse);

        // Verify that the warehouse is saved
        Assertions.assertThat(savedWarehouse.getId()).isGreaterThan(0);
        Assertions.assertThat(savedWarehouse.getWarehouseName()).isEqualTo("Shelby & Co. Tradings");
        Assertions.assertThat(savedWarehouse.getWarehouseLocation()).isEqualTo("Leeds, UK");
        Assertions.assertThat(savedWarehouse.getWarehouseManager()).isEqualTo("Daniel Shelby");
        Assertions.assertThat(savedWarehouse.getContactNumber()).isEqualTo("024834637920");
        Assertions.assertThat(savedWarehouse.isDeleted()).isEqualTo(false);

    }


    @Test
    @DisplayName("Test 2: Get Warehouse By ID")
    public void getWarehouseByIdTest(){
        // Create a warehouse with ID 1L if it doesn't exist
        Warehouse warehouse = warehouseRepository.findById(1L).orElseGet(() -> {
            Warehouse newWarehouse = new Warehouse();
            newWarehouse.setId(1L);
            return warehouseRepository.save(newWarehouse);
        });

        // Verify that the retrieved warehouse's ID is 1L
        Assertions.assertThat(warehouse.getId()).isEqualTo(1L);
    }
}
