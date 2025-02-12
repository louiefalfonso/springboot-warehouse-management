package warehouse.mngt.springwarehousemngt.Repository;


import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import warehouse.mngt.springwarehousemngt.entity.Product;
import warehouse.mngt.springwarehousemngt.entity.Supplier;

import warehouse.mngt.springwarehousemngt.repository.ProductRepository;
import warehouse.mngt.springwarehousemngt.repository.SupplierRepository;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;


@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@DataJpaTest

public class ProductRepositoryUnitTests {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private SupplierRepository supplierRepository;


    @Test
    @DisplayName("Test 1: Create New Product")
    void createNewProductTest(){

        // Create a new supplier object
        Supplier supplier = Supplier.builder().build();

        // Save the supplier
        Supplier savedSupplier = supplierRepository.save(supplier);

        // Create a new product object
        Product product = Product.builder()
                .productName("Flotec VIP 130-6 and 180-7")
                .productNumber("FL-4638254")
                .description("The Flotec VIP 130-6 and 180-7 submersible pumps are designed for applications in clean water.")
                .productBrand("Flotec")
                .quantity(200)
                .sku("020-070")
                .price(BigDecimal.valueOf(150.00))
                .supplier(savedSupplier)
                .deleted(false)
                .build();

        // Save the product
        Product savedProduct = productRepository.save(product);

        // Verify that the product is saved
        Assertions.assertThat(savedProduct.getId()).isGreaterThan(0);
        Assertions.assertThat(savedProduct.getProductName()).isEqualTo("Flotec VIP 130-6 and 180-7");
        Assertions.assertThat(savedProduct.getProductNumber()).isEqualTo("FL-4638254");
        Assertions.assertThat(savedProduct.getDescription()).isEqualTo("The Flotec VIP 130-6 and 180-7 submersible pumps are designed for applications in clean water.");
        Assertions.assertThat(savedProduct.getProductBrand()).isEqualTo("Flotec");
        Assertions.assertThat(savedProduct.getQuantity()).isEqualTo(200);
        Assertions.assertThat(savedProduct.getSku()).isEqualTo("020-070");
        Assertions.assertThat(savedProduct.getPrice()).isEqualTo(BigDecimal.valueOf(150.00));
        Assertions.assertThat(savedProduct.getSupplier()).isEqualTo(savedSupplier);
        Assertions.assertThat(savedProduct.isDeleted()).isEqualTo(false);
    }

    @Test
    @DisplayName("Test 2: Save Product")
    void saveProductTest(){

        // Create a new supplier object
        Supplier supplier = Supplier.builder().build();

        // Save the supplier
        Supplier savedSupplier = supplierRepository.save(supplier);

        // Create a new product object
        Product product = Product.builder()
                .productName("Flotec VIP 130-6 and 180-7")
                .productNumber("FL-4638254")
                .description("The Flotec VIP 130-6 and 180-7 submersible pumps are designed for applications in clean water.")
                .productBrand("Flotec")
                .quantity(200)
                .sku("020-070")
                .price(BigDecimal.valueOf(150.00))
                .supplier(savedSupplier)
                .deleted(false)
                .build();

        // Verify that the product is saved
        Product savedProduct = productRepository.save(product);
        Assertions.assertThat(savedProduct.getId()).isGreaterThan(0);
    }

    @Test
    @DisplayName("Test 3: Get Product By ID")
    void getProductByIdTest(){

        // Create a new supplier object
        Supplier supplier = Supplier.builder().build();

        // Save the supplier
        Supplier savedSupplier = supplierRepository.save(supplier);

        // Create a new product object
        Product product = Product.builder()
                .productName("Flotec VIP 130-6 and 180-7")
                .productNumber("FL-4638254")
                .description("The Flotec VIP 130-6 and 180-7 submersible pumps are designed for applications in clean water.")
                .productBrand("Flotec")
                .quantity(200)
                .sku("020-070")
                .price(BigDecimal.valueOf(150.00))
                .supplier(savedSupplier)
                .deleted(false)
                .build();

        // Save the product
        Product savedProduct = productRepository.save(product);

        // Retrieve the product by ID
        Product retrievedProduct = productRepository.findById(savedProduct.getId()).orElse(null);

        // Verify that the retrieved product matches the saved product
        Assertions.assertThat(retrievedProduct).isEqualTo(savedProduct);

    }

    @Test
    @DisplayName("Test 4: Get All Products")
    public void getAllProductsTest(){
        List<Product> products = productRepository.findAll();
        Assertions.assertThat(products.size()).isGreaterThan(0);
    }

    @Test
    @DisplayName("Test 5: Test for Product Not Found")
    public void productNotFoundTest(){
        // Try to find an product with an ID that doesn't exist
        Optional<Product> productOptional = productRepository.findById(999L);

        // Verify that the product is not found
        Assertions.assertThat(productOptional).isEmpty();

    }
}
