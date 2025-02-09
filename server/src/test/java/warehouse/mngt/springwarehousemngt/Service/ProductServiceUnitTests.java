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
import org.springframework.http.ResponseEntity;
import warehouse.mngt.springwarehousemngt.dto.ProductDto;
import warehouse.mngt.springwarehousemngt.entity.Product;
import warehouse.mngt.springwarehousemngt.repository.ProductRepository;
import warehouse.mngt.springwarehousemngt.service.impl.ProductServiceImpl;

import java.util.List;
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
    void createNewProduct_v1(){

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
    void createNewProduct_v2() {
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
    void createNewProduct_ProductNumber() {
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
    @DisplayName("Test 4: Create New Product If Product Number Exists")
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

    @Test
    @Order(5)
    @DisplayName("Test 5: Create New Product with Null Input")
    void createNewProduct_NullInput(){
        // Act & Assert
        assertThrows(NullPointerException.class, ()-> productService.createNewProduct(null));

        verify(productRepository, never()).existsByProductNumber(anyString());
        verify(productRepository, never()).save(any(Product.class));

    }

    @Test
    @Order(6)
    @DisplayName("Test 6: Get All Products with Null Repository Response")
    void getAllProducts_NullRepositoryResponse() {

        //Arrange
        when(productRepository.findAll()).thenReturn(List.of());

        //Act
        List<ProductDto> result = productService.getAllProducts();

        //Assert
        assertNotNull(result);
        assertTrue(result.isEmpty());
        verify(productRepository,times(1)).findAll();
        verify(modelMapper,never()).map(any(Product.class), eq(ProductDto.class));
    }

    @Test
    @Order(7)
    @DisplayName("Test 7: Get All Products with No Products")
    void getAllProducts_NoProducts(){
        //Arrange
        when(productRepository.findAll()).thenReturn(List.of());

        //Act
        List<ProductDto> result = productService.getAllProducts();

        //Assert
        assertNotNull(result);
        assertTrue(result.isEmpty());
        verify(productRepository,times(1)).findAll();
        verify(modelMapper,never()).map(any(Product.class), eq(ProductDto.class));
    }

    @Test
    @Order(8)
    @DisplayName("Test 8: Get All Products with Repository Returns Null")
    void testGetAllProducts_RepositoryReturnsNull() {
        // Arrange
        when(productRepository.findAll()).thenReturn(null);

        // Act and Assert
        assertThrows(NullPointerException.class, () -> productService.getAllProducts());
    }

    @Test
    void testCreateNewProduct_ProductNumberAlreadyExists() {
        // Arrange
        ProductDto productDto = new ProductDto();
        productDto.setProductNumber("existing-product-number");
        when(productRepository.existsByProductNumber(productDto.getProductNumber())).thenReturn(true);

        // Act and Assert
        assertThrows(RuntimeException.class, () -> productService.createNewProduct(productDto));
    }

    @Test
    void testCreateNewProduct_ProductDtoIsNull() {
        // Act and Assert
        assertThrows(NullPointerException.class, () -> productService.createNewProduct(null));
    }

    @Test
    public void testGetProductById_ProductIdIsZero() {
        // Arrange
        Long productId = 0L;

        // Act and Assert
        assertThrows(RuntimeException.class, () -> productService.getProductById(productId));
    }

    @Test
    void getProductById_NofFound(){
        Long productId = 1L;
        when(productRepository.findAllById(productId)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, ()-> productService.getProductById(productId));

        verify(productRepository, times(1)).findAllById(productId);
        verify(modelMapper, never()).map(any(), eq(ProductDto.class));
    }

    @Test
    public void testGetProductById_Success() {
        // Arrange
        Long productId = 1L;
        Product product = new Product();
        product.setId(productId);
        product.setProductName("Test Product");
        when(productRepository.findAllById(productId)).thenReturn(Optional.of(product));

        ProductDto expectedProductDto = new ProductDto();
        expectedProductDto.setId(productId);
        expectedProductDto.setProductName("Test Product");
        when(modelMapper.map(product, ProductDto.class)).thenReturn(expectedProductDto);

        // Act
        ProductDto actualProductDto = productService.getProductById(productId);

        // Assert
        assertEquals(expectedProductDto, actualProductDto);
    }

    @Test
    public void testGetProductById_ProductNotFound() {
        // Arrange
        Long productId = 1L;
        when(productRepository.findAllById(productId)).thenReturn(Optional.empty());

        // Act and Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> productService.getProductById(productId));
        assertEquals("Product doesn't exist with a given Id:1", exception.getMessage());
    }

    @Test
    public void testGetProductById_NullProductId() {
        // Act and Assert
        assertThrows(IllegalArgumentException.class, () -> productService.getProductById(null));
    }

    @Test
    public void testGetAllProducts_NoProductsFound() {
        // Arrange
        when(productRepository.findAll()).thenReturn(List.of());

        // Act
        List<ProductDto> result = productService.getAllProducts();

        // Assert
        assertEquals(List.of(), result);
    }

}
