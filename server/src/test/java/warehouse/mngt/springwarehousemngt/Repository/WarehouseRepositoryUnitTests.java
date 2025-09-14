package warehouse.mngt.springwarehousemngt.Repository;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.*;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import warehouse.mngt.springwarehousemngt.entity.Warehouse;
import warehouse.mngt.springwarehousemngt.repository.WarehouseRepository;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

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
                .build();

        // Save the warehouse
        Warehouse savedWarehouse = warehouseRepository.save(warehouse);

        // Verify that the warehouse is saved
        Assertions.assertThat(savedWarehouse.getId()).isGreaterThan(0);
        Assertions.assertThat(savedWarehouse.getWarehouseName()).isEqualTo("Shelby & Co. Tradings");
        Assertions.assertThat(savedWarehouse.getWarehouseLocation()).isEqualTo("Leeds, UK");
        Assertions.assertThat(savedWarehouse.getWarehouseManager()).isEqualTo("Daniel Shelby");
        Assertions.assertThat(savedWarehouse.getContactNumber()).isEqualTo("024834637920");
    }

    @Test
    @DisplayName("Test 2: Get Warehouse By ID from Database")
    public void getWarehouseByIdDatabase(){
        // Create a warehouse with ID 1L if it doesn't exist
        Warehouse warehouse = warehouseRepository.findById(1L).orElseGet(() -> {
            Warehouse newWarehouse = new Warehouse();
            newWarehouse.setId(1L);
            return warehouseRepository.save(newWarehouse);
        });

        // Verify that the retrieved warehouse's ID is 1L
        Assertions.assertThat(warehouse.getId()).isEqualTo(1L);
    }

    @Test
    @DisplayName("Test 4: Get All Warehouses")
    public void getListOfWarehouses(){
        List<Warehouse> warehouses = warehouseRepository.findAll();
        Assertions.assertThat(warehouses.size()).isGreaterThan(0);
    }

    @Test
    @DisplayName("Test 5: Test for Warehouse Not Found")
    public void warehouseNotFoundTest(){
        // Try to find warehouse with an ID that doesn't exist
        Optional<Warehouse> warehouseOptional = warehouseRepository.findById(999L);

        // Verify that the Warehouse is not found
        Assertions.assertThat(warehouseOptional).isEmpty();
    }

    @Test
    @DisplayName("Test 6: Test for Warehouse Not Found - NoSuchElementException")
    public void warehouseNotFoundSuchElementExceptionTest(){
        // Try to find warehouse with an ID that doesn't exist
        Optional<Warehouse> warehouseOptional = warehouseRepository.findById(999L);

        // Verify that a NoSuchElementException is thrown when trying to get the Warehouse
        Assertions.assertThatThrownBy(warehouseOptional::get).isInstanceOf(NoSuchElementException.class);
    }

    @Test
    @DisplayName("Test 7: Update Warehouse")
    void updateWarehouseTest() {
        // Create a new warehouse object
        Warehouse warehouse = Warehouse.builder()
                .warehouseName("Shelby & Co. Tradings")
                .warehouseLocation("Leeds, UK")
                .warehouseManager("Daniel Shelby")
                .contactNumber("024834637920")
                .build();

        // Save the warehouse
        Warehouse savedWarehouse = warehouseRepository.save(warehouse);

        // Update the warehouse
        savedWarehouse.setWarehouseName("Updated Supplier Name");
        Warehouse updateWarehouse = warehouseRepository.save(savedWarehouse);

        // Verify the update
        Assertions.assertThat(updateWarehouse.getWarehouseName()).isEqualTo("Updated Supplier Name");
    }

    @Test
    @DisplayName("Test 8: Delete Supplier - Success")
    void deleteWarehouse(){
        // Create a new warehouse object
        Warehouse warehouse = Warehouse.builder()
                .warehouseName("Shelby & Co. Tradings")
                .warehouseLocation("Leeds, UK")
                .warehouseManager("Daniel Shelby")
                .contactNumber("024834637920")
                .build();

        // Save the warehouse
        Warehouse savedWarehouse = warehouseRepository.save(warehouse);

        // verify that warehouse is saved
        Assertions.assertThat(savedWarehouse.getId()).isGreaterThan(0);

        // Delete the warehouse
        warehouseRepository.deleteById(savedWarehouse.getId());

        // Verify that the warehouse is deleted
        Warehouse deletedWarehouse = warehouseRepository.findById(savedWarehouse.getId()).orElse(null);
        Assertions.assertThat(deletedWarehouse).isNull();
    }

    @Test
    @DisplayName("Test 9: Get Warehouse By Id - Success")
    void getWarehouseById(){

        // Create a new warehouse object
        Warehouse warehouse = Warehouse.builder()
                .warehouseName("Shelby & Co. Tradings")
                .warehouseLocation("Leeds, UK")
                .warehouseManager("Daniel Shelby")
                .contactNumber("024834637920")
                .build();

        // Save the warehouse
        Warehouse savedWarehouse = warehouseRepository.save(warehouse);

        // Retrieve the warehouse by ID
        Warehouse retrievedWarehouse = warehouseRepository.findById(savedWarehouse.getId()).orElse(null);

        // Verify that the retrieved employee is not null
        Assertions.assertThat(retrievedWarehouse).isNotNull();

        // Verify that the retrieved warehouse's details match the saved employee's details
        Assertions.assertThat(retrievedWarehouse.getWarehouseName()).isEqualTo("Shelby & Co. Tradings");
    }

}
