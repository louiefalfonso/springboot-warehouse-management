package warehouse.mngt.springwarehousemngt.Repository;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import warehouse.mngt.springwarehousemngt.entity.Supplier;
import warehouse.mngt.springwarehousemngt.repository.SupplierRepository;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@DataJpaTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class SupplierRepositoryUnitTests {

    @Autowired
    private SupplierRepository supplierRepository;

    @Test
    @DisplayName("Test 1: Create New Supplier")
    public void createNewSupplierTest(){

        // Create a new supplier object
        Supplier supplier = Supplier.builder()
                .supplierName("Shelby & Co. Tradings")
                .supplierCode("SUX-28374")
                .supplierEmail("info@shelbyandcotradings.co.uk")
                .contactInfo("024834637920")
                .contactAddress("Larkfield, Crofton CA5 6QF")
                .status("Active")
                .deleted(false)
                .build();

        // Save the supplier
        Supplier savedSupplier = supplierRepository.save(supplier);

        // Verify that the warehouse is saved
        Assertions.assertThat(savedSupplier.getId()).isGreaterThan(0);
        Assertions.assertThat(savedSupplier.getSupplierName()).isEqualTo("Shelby & Co. Tradings");
        Assertions.assertThat(savedSupplier.getSupplierCode()).isEqualTo("SUX-28374");
        Assertions.assertThat(savedSupplier.getSupplierEmail()).isEqualTo("info@shelbyandcotradings.co.uk");
        Assertions.assertThat(savedSupplier.getContactInfo()).isEqualTo("024834637920");
        Assertions.assertThat(savedSupplier.getContactAddress()).isEqualTo("Larkfield, Crofton CA5 6QF");
        Assertions.assertThat(savedSupplier.getStatus()).isEqualTo("Active");
        Assertions.assertThat(savedSupplier.isDeleted()).isEqualTo(false);

    }

    @Test
    @DisplayName("Test 2: Get Supplier By ID")
    public void getSupplierByIdTest(){
        // Create a new supplier
        Supplier supplier = Supplier.builder()
                .supplierName("Test Supplier")
                .supplierCode("TEST-001")
                .supplierEmail("test@example.com")
                .contactInfo("123-456-7890")
                .contactAddress("123 Main St")
                .status("Active")
                .deleted(false)
                .build();

        // Save the supplier
        supplier = supplierRepository.save(supplier);

        // Retrieve the supplier by ID
        Supplier retrievedSupplier = supplierRepository.findById(supplier.getId()).orElse(null);

        // Verify that the retrieved supplier's ID is the same as the original supplier's ID
        Assertions.assertThat(retrievedSupplier).isNotNull();
        Assertions.assertThat(retrievedSupplier.getId()).isEqualTo(supplier.getId());
    }

    @Test
    @DisplayName("Test 3: Get Supplier By ID from Database")
    public void getSupplierByIdDBTest(){
        // Create supplier with ID 1L if it doesn't exist
        Supplier supplier = supplierRepository.findAllById(13L).orElseGet(()->{
            Supplier newSupplier = new Supplier();
            newSupplier.setId(1L);
            return  supplierRepository.save(newSupplier);
        });

        Assertions.assertThat(supplier.getId()).isEqualTo(13L);
    }

    @Test
    @DisplayName("Test 4: Get All Assets")
    public void getListOfSuppliers(){
        List<Supplier> suppliers = supplierRepository.findAll();
        Assertions.assertThat(suppliers.size()).isGreaterThan(0);
    }

    @Test
    @DisplayName("Test 5: Test for Supplier Not Found")
    public void supplierNotFoundTest(){
        // Try to find supplier with an ID that doesn't exist
        Optional<Supplier> supplierOptional = supplierRepository.findById(999L);

        // Verify that the Supplier is not found
        Assertions.assertThat(supplierOptional).isEmpty();
    }

    @Test
    @DisplayName("Test 6: Test for Supplier Not Found - NoSuchElementException")
    public void supplierNotFoundSuchElementExceptionTest(){
        // Try to find supplier with an ID that doesn't exist
        Optional<Supplier> supplierOptional = supplierRepository.findById(999L);

        // Verify that a NoSuchElementException is thrown when trying to get the Supplier
        Assertions.assertThatThrownBy(supplierOptional::get).isInstanceOf(NoSuchElementException.class);

    }

    @Test
    @DisplayName("Test 7: Update Supplier")
    void updateSupplierTest() {
        // Create a new supplier object
        Supplier supplier = Supplier.builder()
                .supplierName("Shelby & Co. Tradings")
                .supplierCode("SUX-28374")
                .supplierEmail("info@shelbyandcotradings.co.uk")
                .contactInfo("024834637920")
                .contactAddress("Larkfield, Crofton CA5 6QF")
                .status("Active")
                .deleted(false)
                .build();

        // Save the supplier
        Supplier savedSupplier = supplierRepository.save(supplier);

        // Update the supplier
        savedSupplier.setSupplierName("Updated Supplier Name");
        Supplier updateSupplier = supplierRepository.save(savedSupplier);

        // Verify the update
        Assertions.assertThat(updateSupplier.getSupplierName()).isEqualTo("Updated Supplier Name");
    }

    @Test
    @DisplayName("Test 8: Delete Supplier")
    public void deleteSupplier(){
        // Create a new supplier object
        Supplier supplier = Supplier.builder()
                .supplierName("Shelby & Co. Tradings")
                .supplierCode("SUX-28374")
                .supplierEmail("info@shelbyandcotradings.co.uk")
                .contactInfo("024834637920")
                .contactAddress("Larkfield, Crofton CA5 6QF")
                .status("Active")
                .deleted(false)
                .build();

        // Save the supplier
        Supplier savedSupplier = supplierRepository.save(supplier);

        // Delete the supplier
        supplierRepository.delete(savedSupplier);

        // Verify the deletion
        Optional<Supplier> deletedSupplier = supplierRepository.findById(savedSupplier.getId());
        Assertions.assertThat(deletedSupplier).isEmpty();
    }


}
