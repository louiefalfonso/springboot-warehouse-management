package warehouse.mngt.springwarehousemngt.Repository;


import org.assertj.core.api.Assertions;
import org.hibernate.exception.ConstraintViolationException;
import org.junit.jupiter.api.*;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import warehouse.mngt.springwarehousemngt.dto.ProductDto;
import warehouse.mngt.springwarehousemngt.entity.Category;
import warehouse.mngt.springwarehousemngt.entity.Product;
import warehouse.mngt.springwarehousemngt.entity.Supplier;

import warehouse.mngt.springwarehousemngt.repository.CategoryRepository;
import warehouse.mngt.springwarehousemngt.repository.ProductRepository;
import warehouse.mngt.springwarehousemngt.repository.SupplierRepository;
import warehouse.mngt.springwarehousemngt.service.impl.ProductServiceImpl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import static com.jayway.jsonpath.internal.path.PathCompiler.fail;
import static org.assertj.core.api.AssertionsForClassTypes.tuple;
import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;


@DataJpaTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class ProductRepositoryUnitTests {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private SupplierRepository supplierRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Test
    @DisplayName("Test 1: Create New Product")
    void createNewProductTest(){

        // Create a new supplier object
        Supplier supplier = Supplier.builder().build();

        // Create a new category object
        Category category = Category.builder().build();

        // Save the supplier & category
        Supplier savedSupplier = supplierRepository.save(supplier);
        Category savedCategory = categoryRepository.save(category);

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
                .category(savedCategory)
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
        Assertions.assertThat(savedProduct.getCategory()).isEqualTo(savedCategory);
    }

    @Test
    @DisplayName("Test 2: Save Product")
    void saveProductTest(){

        // Create a new supplier object
        Supplier supplier = Supplier.builder().build();

        // Create a new category object
        Category category = Category.builder().build();

        // Save the supplier & category
        Supplier savedSupplier = supplierRepository.save(supplier);
        Category savedCategory = categoryRepository.save(category);

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
                .category(savedCategory)
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

        // Create a new category object
        Category category = Category.builder().build();

        // Save the supplier & category
        Supplier savedSupplier = supplierRepository.save(supplier);
        Category savedCategory = categoryRepository.save(category);

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
                .category(savedCategory)
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
        // Try to find a product with an ID that doesn't exist
        Optional<Product> productOptional = productRepository.findById(999L);

        // Verify that the product is not found
        Assertions.assertThat(productOptional).isEmpty();

    }

    @Test
    @DisplayName("Test 6: Test for Product Not Found - No Such Element Exception")
    public void productNotFound_SuchElementExceptionTest(){
        // Try to find a product with an ID that doesn't exist
        Optional<Product> productOptional = productRepository.findById(999L);

        // Verify that the product is not found
        Assertions.assertThatThrownBy(productOptional::get).isInstanceOf(NoSuchElementException.class);

    }

    @Test
    @DisplayName("Test 7: Update Product")
    void updateProductTest() {

        // Create a new supplier object
        Supplier supplier = Supplier.builder().build();

        // Create a new category object
        Category category = Category.builder().build();

        // Save the supplier & category
        Supplier savedSupplier = supplierRepository.save(supplier);
        Category savedCategory = categoryRepository.save(category);

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
                .category(savedCategory)
                .build();

        Product savedProduct = productRepository.save(product);

        // Update the product
        savedProduct.setProductName("Updated Product Name");
        Product updatedProduct = productRepository.save(savedProduct);

        // Verify the update
        Assertions.assertThat(updatedProduct.getProductName()).isEqualTo("Updated Product Name");
    }

    @Test
    @DisplayName("Test 8: Delete Product")
    void deleteProductTest() {

        // Create a new supplier object
        Supplier supplier = Supplier.builder().build();

        // Create a new category object
        Category category = Category.builder().build();

        // Save the supplier & category
        Supplier savedSupplier = supplierRepository.save(supplier);
        Category savedCategory = categoryRepository.save(category);

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
                .category(savedCategory)
                .build();

        // Save the product
        Product savedProduct = productRepository.save(product);

        // Delete the product
        productRepository.delete(savedProduct);

        // Verify the deletion
        Optional<Product> deletedProduct = productRepository.findById(savedProduct.getId());
        Assertions.assertThat(deletedProduct).isEmpty();
    }

    @Test
    @DisplayName("Test 9: Find Product By Product Number")
    public void findByProductNumberTest() {
        // Create a new supplier object
        Supplier supplier = Supplier.builder().build();

        // Create a new category object
        Category category = Category.builder().build();

        // Save the supplier & category
        Supplier savedSupplier = supplierRepository.save(supplier);
        Category savedCategory = categoryRepository.save(category);

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
                .category(savedCategory)
                .build();

        // Save the product
        productRepository.save(product);

        // Create another product with the same product number
        Product anotherProduct = Product.builder()
                .productName("Another Product")
                .productNumber("FL-4638230")
                .description("Another product description")
                .productBrand("Another Brand")
                .quantity(100)
                .sku("030-080")
                .price(BigDecimal.valueOf(200.00))
                .supplier(savedSupplier)
                .category(savedCategory)
                .build();

        // Save the another product
        productRepository.save(anotherProduct);

        // Find products by product number
        List<Product> foundProducts = productRepository.findByProductNumber("FL-4638230");

        // Verify that the products are found
        Assertions.assertThat(foundProducts).isNotEmpty();
        Assertions.assertThat(foundProducts.size()).isEqualTo(1);
    }

    @Test
    @DisplayName("Test 10: Find Product By Product SKU")
    public void findByProductSKUTest() {
        // Create a new supplier object
        Supplier supplier = Supplier.builder().build();

        // Create a new category object
        Category category = Category.builder().build();

        // Save the supplier & category
        Supplier savedSupplier = supplierRepository.save(supplier);
        Category savedCategory = categoryRepository.save(category);

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
                .category(savedCategory)
                .build();

        // Save the product
        productRepository.save(product);

        // Create another product with the same product number
        Product anotherProduct = Product.builder()
                .productName("Another Product")
                .productNumber("FL-4638254")
                .description("Another product description")
                .productBrand("Another Brand")
                .quantity(100)
                .sku("030-080")
                .price(BigDecimal.valueOf(200.00))
                .supplier(savedSupplier)
                .category(savedCategory)
                .build();

        // Save the another product
        productRepository.save(anotherProduct);

        // Find products by product number
        List<Product> foundProducts = productRepository.findBySku("030-080");

        // Verify that the products are found
        Assertions.assertThat(foundProducts).isNotEmpty();
        Assertions.assertThat(foundProducts.size()).isEqualTo(1);
    }

    @Test
    @DisplayName("Test 11: Verify Product Deletion by Setting Deleted Flag")
    void verifyProductDeletionBySettingDeletedFlag() {
        // Create a new supplier object
        Supplier supplier = Supplier.builder().build();

        // Create a new category object
        Category category = Category.builder().build();

        // Save the supplier & category
        Supplier savedSupplier = supplierRepository.save(supplier);
        Category savedCategory = categoryRepository.save(category);

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
                .category(savedCategory)
                .build();

        // Save the product
        Product savedProduct = productRepository.save(product);

        // Set the deleted flag to true
        //savedProduct.setDeleted(true);
        Product updatedProduct = productRepository.save(savedProduct);

        // Verify the deletion
        Optional<Product> deletedProduct = productRepository.findById(savedProduct.getId());
        Assertions.assertThat(deletedProduct).isNotEmpty();
        //Assertions.assertThat(deletedProduct.get().isDeleted()).isEqualTo(true);
    }

    @Test
    @DisplayName("Test 12: Verify Product Validation - Empty Product Name")
    public void productValidation_EmptyProductName() {
        // Create a new supplier object
        Supplier supplier = Supplier.builder().build();

        // Save the supplier
        Supplier savedSupplier = supplierRepository.save(supplier);

        // Create a new product object with empty product name
        Product product = Product.builder()
                .productName("") // empty product name
                .productNumber("FL-4638254")
                .description("The Flotec VIP 130-6 and 180-7 submersible pumps are designed for applications in clean water.")
                .productBrand("Flotec")
                .quantity(200)
                .sku("020-070")
                .price(BigDecimal.valueOf(150.00))
                .supplier(savedSupplier)
                .build();

        // Try to save the product
        try {
            productRepository.save(product);
            fail("Expected ConstraintViolationException to be thrown");
        } catch (ConstraintViolationException e) {
            // Expected exception
        } catch (Exception e) {
            // Unexpected exception
            System.out.println("Unexpected exception: " + e.getMessage());
        }
    }

    @Test
    @DisplayName("Test 13: Verify Product Validation - Invalid Product Price")
    public void productValidation_InvalidProductPrice() {
        // Create a new supplier object
        Supplier supplier = Supplier.builder().build();

        // Save the supplier
        Supplier savedSupplier = supplierRepository.save(supplier);

        // Create a new product object with invalid product price (negative value)
        Product product = Product.builder()
                .productName("Flotec VIP 130-6 and 180-7")
                .productNumber("FL-4638254")
                .description("The Flotec VIP 130-6 and 180-7 submersible pumps are designed for applications in clean water.")
                .productBrand("Flotec")
                .quantity(200)
                .sku("020-070")
                .price(BigDecimal.valueOf(-150.00)) // invalid product price
                .supplier(savedSupplier)
                .build();

        // Try to save the product
        try {
            productRepository.save(product);
            fail("Expected ConstraintViolationException to be thrown");
        } catch (ConstraintViolationException e) {
            // Expected exception
        } catch (Exception e) {
            // Unexpected exception
            System.out.println("Unexpected exception: " + e.getMessage());
        }
    }

    @Test
    @DisplayName("Test 14: Verify Product Validation - Duplicate Product SKU")
    public void productValidation_DuplicateProductSKU() {
        // Create a new supplier object
        Supplier supplier = Supplier.builder().build();

        // Create a new category object
        Category category = Category.builder().build();

        // Save the supplier & category
        Supplier savedSupplier = supplierRepository.save(supplier);
        Category savedCategory = categoryRepository.save(category);

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
                .category(savedCategory)
                .build();

        // Save the product
        productRepository.save(product);

        // Create another product object with the same SKU
        Product duplicateProduct = Product.builder()
                .productName("Another Product")
                .productNumber("FL-4638230")
                .description("Another product description")
                .productBrand("Another Brand")
                .quantity(100)
                .sku("020-070") // duplicate SKU
                .price(BigDecimal.valueOf(200.00))
                .supplier(savedSupplier)
                .build();

        // Try to save the duplicate product
        try {
            productRepository.save(duplicateProduct);
            fail("Expected ConstraintViolationException to be thrown");
        } catch (ConstraintViolationException e) {
            // Expected exception
        } catch (Exception e) {
            // Unexpected exception
            System.out.println("Unexpected exception: " + e.getMessage());
        }
    }

    @Test
    @DisplayName("Test 15: Find Product with the different Product Supplier")
    public void findByProductSupplierTest() {
        // Create a new supplier object
        Supplier supplier = Supplier.builder().build();

        // Create a new category object
        Category category = Category.builder().build();

        // Save the supplier & category
        Supplier savedSupplier = supplierRepository.save(supplier);
        Category savedCategory = categoryRepository.save(category);

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
                .category(savedCategory)
                .build();

        // Save the product
        productRepository.save(product);

        // Create another product with the different product supplier
        Supplier anotherSupplier = Supplier.builder().build();
        anotherSupplier = supplierRepository.save(anotherSupplier);

        Category anotherCategory = Category.builder().build();
        anotherCategory = categoryRepository.save(anotherCategory);

        Product anotherProduct = Product.builder()
                .productName("Another Product")
                .productNumber("FL-4638230")
                .description("Another product description")
                .productBrand("Another Brand")
                .quantity(100)
                .sku("030-080")
                .price(BigDecimal.valueOf(200.00))
                .supplier(anotherSupplier)
                .category(anotherCategory)
                .build();

        // Save the another product
        productRepository.save(anotherProduct);

        // Find products by supplier
        List<Product> foundProducts = productRepository.findBySupplier(savedSupplier);

        // Verify that the products are found
        Assertions.assertThat(foundProducts).isNotEmpty();
        Assertions.assertThat(foundProducts.size()).isEqualTo(1);
    }

    @Test
    @DisplayName("Test 16: Find Out of Stock Products")
    public void findByProduct_OutOfStockProduct() {
        // Given
        List<Product> products = productRepository.findAll();

        // Ensure there are out of stock products in the list
        for (Product product : products) {
            product.setQuantity(0);
            productRepository.save(product);
        }

        // Act
        List<Product> outOfStock = productRepository.findOutOfStockProduct(0);

        // Then
        assertEquals(products.size(), outOfStock.size());
    }
}
