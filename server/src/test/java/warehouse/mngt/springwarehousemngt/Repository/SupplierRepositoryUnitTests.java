package warehouse.mngt.springwarehousemngt.Repository;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import warehouse.mngt.springwarehousemngt.entity.Supplier;
import warehouse.mngt.springwarehousemngt.repository.SupplierRepository;

@DataJpaTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class SupplierRepositoryUnitTests {

    @Autowired
    private SupplierRepository supplierRepository;

    @Test
    @DisplayName("Test 1: Create New Supplier")
    public void createNewSupplierTest(){

        // Create a new warehouse object
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
}
