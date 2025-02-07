package warehouse.mngt.springwarehousemngt.Service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;
import warehouse.mngt.springwarehousemngt.dto.ProductDto;
import warehouse.mngt.springwarehousemngt.entity.Product;
import warehouse.mngt.springwarehousemngt.repository.ProductRepository;
import warehouse.mngt.springwarehousemngt.service.impl.ProductServiceImpl;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ProductServiceUnitTests {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private ModelMapper modelMapper;

    @InjectMocks
    private ProductServiceImpl productService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    @Order(1)
    @DisplayName("Test 1: Create New Product Successfully v1")
    public void createNewProduct_Success(){

        //Arrange
        ProductDto productDto = new ProductDto();
        productDto.setProductName("Eberspacher E5071 Header Tank Single Port");

        Product product = new Product();
        product.setProductName("Eberspacher E5071 Header Tank Single Port");

        when(modelMapper.map(productDto, Product.class)).thenReturn(product);
        when(productRepository.save(product)).thenReturn(product);
        when(modelMapper.map(product,ProductDto.class)).thenReturn(productDto);

        //Act
        ProductDto result = productService.createNewProduct(productDto);

        //Assert
        assertNotNull(result);
        assertEquals("Eberspacher E5071 Header Tank Single Port", result.getProductName());
        verify(productRepository, times(1)).save(product);

    }

    @Test
    @Order(2)
    @DisplayName("Test 2: Create New Product Successfully v2")
    void testCreateNewProduct() {
        // Arrange
        ProductDto productDto = new ProductDto();
        Product product = new Product();
        Product savedProduct = new Product();
        ProductDto savedProductDto = new ProductDto();

        when(modelMapper.map(productDto, Product.class)).thenReturn(product);
        when(productRepository.save(product)).thenReturn(savedProduct);
        when(modelMapper.map(savedProduct, ProductDto.class)).thenReturn(savedProductDto);

        // Act
        ProductDto result = productService.createNewProduct(productDto);

        // Assert
        assertEquals(savedProductDto, result);
        verify(modelMapper).map(productDto, Product.class);
        verify(productRepository).save(product);
        verify(modelMapper).map(savedProduct, ProductDto.class);
    }

    @Test
    @Order(3)
    @DisplayName("Test 3: Create New Product Using Product Number")
    void createProduct_Success() {
        // Arrange
        ProductDto productDto = new ProductDto();
        productDto.setProductNumber("12345");

        Product product = new Product();
        Product savedProduct = new Product();

        when(productRepository.existsByProductNumber(productDto.getProductNumber())).thenReturn(false);
        when(modelMapper.map(productDto, Product.class)).thenReturn(product);
        when(productRepository.save(product)).thenReturn(savedProduct);
        when(modelMapper.map(savedProduct, ProductDto.class)).thenReturn(productDto);

        // Act
        ProductDto result = productService.createNewProduct(productDto);

        // Assert
        assertNotNull(result);
        assertEquals(productDto, result);
        verify(productRepository, times(1)).existsByProductNumber(productDto.getProductNumber());
        verify(productRepository, times(1)).save(product);
        verify(modelMapper, times(1)).map(productDto, Product.class);
        verify(modelMapper, times(1)).map(savedProduct, ProductDto.class);
    }

    @Test
    @Order(4)
    @DisplayName("Test 4: Create New Product - Product Number Exists")
    void createNewProduct_ProductNumberExists() {
        // Arrange
        ProductDto productDto = new ProductDto();
        productDto.setProductNumber("12345");

        when(productRepository.existsByProductNumber(productDto.getProductNumber())).thenReturn(true);

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            productService.createNewProduct(productDto);
        });

        assertEquals("Product Number already exists", exception.getMessage());
        verify(productRepository, times(1)).existsByProductNumber(productDto.getProductNumber());
        verify(productRepository, never()).save(any(Product.class));
    }

}
