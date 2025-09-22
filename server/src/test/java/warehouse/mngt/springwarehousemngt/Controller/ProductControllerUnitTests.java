package warehouse.mngt.springwarehousemngt.Controller;

import org.junit.jupiter.api.*;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import warehouse.mngt.springwarehousemngt.controller.ProductController;
import warehouse.mngt.springwarehousemngt.dto.ProductDto;
import warehouse.mngt.springwarehousemngt.entity.Product;
import warehouse.mngt.springwarehousemngt.repository.ProductRepository;
import warehouse.mngt.springwarehousemngt.service.ProductService;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.Assert.assertNotNull;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class ProductControllerUnitTests {

    @Mock
    private ProductService productService;

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductController productController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    @Order(1)
    @DisplayName("Test 1: Create New Product Success")
    void createProduct_Success() {

        //Arrange
        ProductDto inputProductDto = new ProductDto();
        inputProductDto.setProductNumber("AB-8493519");
        inputProductDto.setProductName("Flotec VIP 130-6 and 180-7");
        inputProductDto.setDescription("The Flotec VIP 130-6 and 180-7 submersible pumps are designed for applications in clean water.");
        inputProductDto.setSku("020-070");
        inputProductDto.setProductBrand("Flotec");
        inputProductDto.setQuantity(200);
        inputProductDto.setPrice(BigDecimal.valueOf(150.00));

        ProductDto savedProductDto = new ProductDto();
        savedProductDto.setProductNumber("AB-8493519");
        savedProductDto.setProductName("Flotec VIP 130-6 and 180-7");
        savedProductDto.setDescription("The Flotec VIP 130-6 and 180-7 submersible pumps are designed for applications in clean water.");
        savedProductDto.setSku("020-070");
        savedProductDto.setProductBrand("Flotec");
        savedProductDto.setQuantity(200);
        savedProductDto.setPrice(BigDecimal.valueOf(150.00));

        when(productService.createNewProduct(inputProductDto)).thenReturn(savedProductDto);

        // Act
        ResponseEntity<ProductDto> response = productController.createNewProduct(inputProductDto);

        // Assert
        assertEquals(HttpStatus.CREATED, response.getStatusCode());

        assertEquals(savedProductDto, response.getBody());

        // Verify
        verify(productService, times(1)).createNewProduct(inputProductDto);

    }

    @Test
    @Order(2)
    @DisplayName("Test 2: Create New Product - Service Throws Exception")
    void createNewProduct_ServiceThrowsException() {

        // Arrange
        ProductDto inputProductDto = new ProductDto();
        inputProductDto.setProductNumber("AB-8493519");
        inputProductDto.setProductName("Flotec VIP 130-6 and 180-7");
        inputProductDto.setDescription("The Flotec VIP 130-6 and 180-7 submersible pumps are designed for applications in clean water.");
        inputProductDto.setSku("020-070");
        inputProductDto.setProductBrand("Flotec");
        inputProductDto.setQuantity(200);
        inputProductDto.setPrice(BigDecimal.valueOf(150.00));

        when(productService.createNewProduct(inputProductDto)).thenThrow(new RuntimeException("Service Error"));

        // Act & Assert
        Exception exception = assertThrows(RuntimeException.class, () -> productController.createNewProduct(inputProductDto));

        assertEquals("Service Error", exception.getMessage());

        // Verify
        verify(productService, times(1)).createNewProduct(inputProductDto);
    }

    @Test
    @Order(3)
    @DisplayName("Test 3: Create New Product - Null Input")
    void createNewProduct_NullInput() {
        // Arrange
        when(productService.createNewProduct(null)).thenReturn(null);

        // Act
        ResponseEntity<ProductDto> response = productController.createNewProduct(null);

        // Assert
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertNull(response.getBody());

        // Verify
        verify(productService, times(1)).createNewProduct(null);
    }

    @Test
    @Order(4)
    @DisplayName("Test 4: Get Product By Id - Success")
    void getProductById_Success(){

        // Arrange
        Long productId = 1L;
        Product mockProduct = new Product();
        mockProduct.setProductNumber("AB-8493519");
        mockProduct.setProductName("Flotec VIP 130-6 and 180-7");
        mockProduct.setDescription("The Flotec VIP 130-6 and 180-7 submersible pumps are designed for applications in clean water.");
        mockProduct.setSku("020-070");
        mockProduct.setProductBrand("Flotec");
        mockProduct.setQuantity(200);
        mockProduct.setPrice(BigDecimal.valueOf(150.00));

        // Mock the behavior of productRepository.findAllById()
        when(productRepository.findAllById(productId)).thenReturn(Optional.of(mockProduct));

        // Act
        ResponseEntity<Product> response = productController.getProductById(productId);

        // Assert
        assertEquals(200, response.getStatusCodeValue());
        assertNotNull(response.getBody());
        assertEquals(mockProduct, response.getBody());

    }

    @Test
    @Order(5)
    @DisplayName("Test 5: Get Product By Id - When Product Does Not Exist")
    void getProductById_WhenProductDoesNotExist(){

        // Arrange
        Long productId= 999L;

        // Mock the behavior of staffRepository.findAllById() to return an empty Optional
        when(productRepository.findAllById(productId)).thenReturn(Optional.empty());

        // Act and Assert
        RuntimeException exception = assertThrows(RuntimeException.class, ()-> productController.getProductById(productId));

        // Verify the exception message
        assertEquals("Product does not exist with Id:999", exception.getMessage());
    }

    @Test
    @Order(6)
    @DisplayName("Test 6: Delete Product - Success")
    void deleteProduct_Success(){

        // Arrange
        Long productId = 1L;

        // Mock the service method to do nothing (since it's a void method)
        doNothing().when(productService).deleteProduct(productId);

        // Act
        ResponseEntity<String> response = productController.deleteProduct(productId);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Product Deleted Successfully", response.getBody());

        // Verify that the service method was called once
        verify(productService, times(1)).deleteProduct(productId);

    }








}
