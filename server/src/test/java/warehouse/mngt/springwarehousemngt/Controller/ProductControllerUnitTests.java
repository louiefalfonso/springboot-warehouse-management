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
import warehouse.mngt.springwarehousemngt.repository.ProductRepository;
import warehouse.mngt.springwarehousemngt.service.ProductService;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertEquals;
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
        inputProductDto.setSupplier(11L);

        ProductDto savedProductDto = new ProductDto();
        savedProductDto.setProductNumber("AB-8493519");
        savedProductDto.setProductName("Flotec VIP 130-6 and 180-7");
        savedProductDto.setDescription("The Flotec VIP 130-6 and 180-7 submersible pumps are designed for applications in clean water.");
        savedProductDto.setSku("020-070");
        savedProductDto.setProductBrand("Flotec");
        savedProductDto.setQuantity(200);
        savedProductDto.setPrice(BigDecimal.valueOf(150.00));
        savedProductDto.setSupplier(11L);

        when(productService.createNewProduct(inputProductDto)).thenReturn(savedProductDto);

        // Act
        ResponseEntity<ProductDto> response = productController.createNewProduct(inputProductDto);

        // Assert
        assertEquals(HttpStatus.CREATED, response.getStatusCode());

        assertEquals(savedProductDto, response.getBody());

        // Verify
        verify(productService, times(1)).createNewProduct(inputProductDto);

    }

}
