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

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
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

    // Unit Test Cases for Create New Product
    @Test
    @Order(1)
    @DisplayName("Test 1: Create New Product - Successfully")
    void createNewProduct_Successfully() {
        // Arrange
        ProductDto productDto = new ProductDto();
        productDto.setProductNumber("123456");
        Product product = new Product();
        Product savedProduct = new Product();

        when(productRepository.existsByProductNumber(productDto.getProductNumber())).thenReturn(false);
        when(modelMapper.map(productDto, Product.class)).thenReturn(product);
        when(productRepository.save(product)).thenReturn(savedProduct);
        when(modelMapper.map(savedProduct, ProductDto.class)).thenReturn(productDto);

        // Act
        ProductDto createdProduct = productService.createNewProduct(productDto);

        // Assert
        assertEquals(productDto, createdProduct);
    }

    @Test
    @Order(2)
    @DisplayName("Test 2: Create New Product - Product Number Already Exists")
    void createNewProduct_ProductNumberAlreadyExists() {
        // Arrange
        ProductDto productDto = new ProductDto();
        productDto.setProductNumber("123456");
        when(productRepository.existsByProductNumber(productDto.getProductNumber())).thenReturn(true);

        // Act and Assert
        assertThrows(RuntimeException.class, () -> productService.createNewProduct(productDto));
    }

    @Test
    @Order(3)
    @DisplayName("Test 3: Create New Product - Product Dto Is Null")
    void createNewProduct_ProductDtoIsNull() {
        // Act and Assert
        assertThrows(NullPointerException.class, () -> productService.createNewProduct(null));
    }

    @Test
    @Order(4)
    @DisplayName("Test 4: Create New Product - Null Input")
    void createNewProduct_NullInput(){
        // Act & Assert
        assertThrows(NullPointerException.class, ()-> productService.createNewProduct(null));

        verify(productRepository, never()).existsByProductNumber(anyString());
        verify(productRepository, never()).save(any(Product.class));

    }

    // Unit Test Cases for Get Product By ID
    @Test
    @Order(5)
    @DisplayName("Test 5: Get Product By Id - Successfully")
    void getProductById_Success() {
        // Arrange
        Long productId = 1L;
        Product product = new Product();
        product.setId(productId);
        product.setProductNumber("123456");
        when(productRepository.findAllById(productId)).thenReturn(Optional.of(product));

        ProductDto expectedProductDto = new ProductDto();
        expectedProductDto.setId(productId);
        expectedProductDto.setProductNumber("123456");
        when(modelMapper.map(product, ProductDto.class)).thenReturn(expectedProductDto);

        // Act
        ProductDto actualProductDto = productService.getProductById(productId);

        // Assert
        assertEquals(expectedProductDto, actualProductDto);
    }

    @Test
    @Order(6)
    @DisplayName("Test 6: Get Product By Id - Product Id Is Zero")
    void getProductById_ProductIdIsZero() {
        // Arrange
        Long productId = 0L;

        // Act and Assert
        assertThrows(RuntimeException.class, () -> productService.getProductById(productId));
    }

    @Test
    @Order(7)
    @DisplayName("Test 7: Get Product By Id - Product Id Not Found")
    void getProductById_ProductIdNotFound(){
        Long productId = 1L;
        when(productRepository.findAllById(productId)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, ()-> productService.getProductById(productId));

        verify(productRepository, times(1)).findAllById(productId);
        verify(modelMapper, never()).map(any(), eq(ProductDto.class));
    }

    @Test
    @Order(8)
    @DisplayName("Test 8: Get Product By Id - Null Product Id & Throws RuntimeException")
    void getProductById_NullProductId_ThrowsRuntimeException() {
        // Act and Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> productService.getProductById(null));
        assertEquals("Product doesn't exist with a given Id:null", exception.getMessage());
    }

    // Unit Test Cases for Get All Products
    @Test
    @Order(9)
    @DisplayName("Test 9: Get All Products - Successfully")
    void getAllProducts_Success(){

        //Arrange
        List<Product> products = new ArrayList<>();
        Product product1 = new Product();
        product1.setId(1L);
        Product product2 = new Product();
        product2.setId(1L);
        products.add(product1);
        products.add(product2);

        when(productRepository.findAll()).thenReturn(products);

        ProductDto productDto1 = new ProductDto();
        productDto1.setId(1L);
        ProductDto productDto2 = new ProductDto();
        productDto2.setId(1L);

        when(modelMapper.map(product1, ProductDto.class)).thenReturn(productDto1);
        when(modelMapper.map(product2, ProductDto.class)).thenReturn(productDto2);

        // Act
        List<ProductDto> actualProductDtos = productService.getAllProducts();

        // Assert
        List<ProductDto> expectedProductDtos = new ArrayList<>();
        expectedProductDtos.add(productDto1);
        expectedProductDtos.add(productDto2);
        assertEquals(expectedProductDtos, actualProductDtos);
    }

    @Test
    @Order(10)
    @DisplayName("Test 10: Get All Products - No Products Found")
    void getAllProducts_EmptyList() {
        // Arrange
        when(productRepository.findAll()).thenReturn(new ArrayList<>());

        // Act
        List<ProductDto> result = productService.getAllProducts();

        // Assert
        assertEquals(0, result.size());
    }

    @Test
    @Order(11)
    @DisplayName("Test 11: Get All Products - Null List")
    void getAllProducts_NullList() {
        // Arrange
        when(productRepository.findAll()).thenReturn(null);

        // Act and Assert
        assertThrows(NullPointerException.class, () -> productService.getAllProducts());
    }

    @Test
    @Order(12)
    @DisplayName("Test 12: Get All Products - Should Return Empty List when Repository Returns Empty List")
    void getAllProducts_shouldReturnEmptyList_whenRepositoryReturnsEmptyList() {
        // given
        List<Product> products = Arrays.asList();
        when(productRepository.findAll()).thenReturn(products);

        // when
        List<ProductDto> result = productService.getAllProducts();

        // then
        assertEquals(0, result.size());
    }

    @Test
    @Order(13)
    @DisplayName("Test 13: Get All Products - Should Return Empty List when Repository Returns Non Empty List")
    void getAllProducts_shouldReturnListWithMappedProducts_whenRepositoryReturnsNonEmptyList() {
        // given
        Product product1 = new Product();
        Product product2 = new Product();
        List<Product> products = Arrays.asList(product1, product2);
        when(productRepository.findAll()).thenReturn(products);
        ProductDto productDto1 = new ProductDto();
        ProductDto productDto2 = new ProductDto();
        when(modelMapper.map(product1, ProductDto.class)).thenReturn(productDto1);
        when(modelMapper.map(product2, ProductDto.class)).thenReturn(productDto2);

        // when
        List<ProductDto> result = productService.getAllProducts();

        // then
        assertEquals(2, result.size());
        assertEquals(productDto1, result.get(0));
        assertEquals(productDto2, result.get(1));
    }

    @Test
    @Order(14)
    @DisplayName("Test 14: Get All Products - Null Product Repository")
    void getAllProducts_NullProductRepository() {
        // Arrange
        when(productRepository.findAll()).thenReturn(null);

        // Act and Assert
        assertThrows(NullPointerException.class, () -> productService.getAllProducts());
    }

    @Test
    @Order(15)
    @DisplayName("Test 15: Get All Products - Product Repository ThrowsException")
    public void getAllProducts_ProductRepositoryThrowsException() {
        // Arrange
        when(productRepository.findAll()).thenThrow(new RuntimeException("Test exception"));

        // Act and Assert
        assertThrows(RuntimeException.class, () -> productService.getAllProducts());
    }

    @Test
    @Order(16)
    @DisplayName("Test 16: Get All Products - ModelMapper ThrowsException")
    public void getAllProducts_ModelMapperThrowsException() {
        // Arrange
        List<Product> products = new ArrayList<>();
        Product product1 = new Product();
        product1.setId(1L);
        products.add(product1);

        when(productRepository.findAll()).thenReturn(products);

        when(modelMapper.map(product1, ProductDto.class)).thenThrow(new RuntimeException("Test exception"));

        // Act and Assert
        assertThrows(RuntimeException.class, () -> productService.getAllProducts());
    }

    // Unit Test Cases for Update Product
    @Test
    @Order(17)
    @DisplayName("Test 17: Update Product - Success")
    void updateProduct_Success() {
        // Arrange
        Long productId = 1L;
        ProductDto updateProduct = new ProductDto(1L, "Product Name", "Product Number", "Description", 10, BigDecimal.valueOf(100.0), "Supplier", "Sku", "Product Brand");
        Product product = new Product(1L, "Product Name", "Product Number", "Description", 10, BigDecimal.valueOf(100.0), "Supplier", "Sku", "Product Brand");
        Product updatedProduct = new Product(1L,
                updateProduct.getProductName(),
                updateProduct.getProductNumber(),
                updateProduct.getDescription(),
                updateProduct.getQuantity(),
                updateProduct.getPrice(),
                updateProduct.getSupplier(),
                updateProduct.getSku(),
                updateProduct.getProductBrand());

        when(productRepository.findAllById(productId)).thenReturn(Optional.of(product));
        when(productRepository.save(any(Product.class))).thenReturn(updatedProduct);
        when(modelMapper.map(updatedProduct, ProductDto.class)).thenReturn(updateProduct);

        // Act
        ProductDto result = productService.updateProduct(productId, updateProduct);

        // Assert
        assertEquals(updateProduct, result);
        verify(productRepository, times(1)).findAllById(productId);
        verify(productRepository, times(1)).save(any(Product.class));
        verify(modelMapper, times(1)).map(updatedProduct, ProductDto.class);
    }

    @Test
    @Order(18)
    @DisplayName("Test 18: Update Product - Product Not Found")
    void updateProduct_ProductNotFound() {
        // Arrange
        Long productId = 1L;
        ProductDto updateProduct = new ProductDto(1L, "Product Name", "Product Number", "Description", 10, BigDecimal.valueOf(100.0), "Supplier", "Sku", "Product Brand");

        when(productRepository.findAllById(productId)).thenReturn(Optional.empty());

        // Act and Assert
        assertThrows(RuntimeException.class, () -> productService.updateProduct(productId, updateProduct));
        verify(productRepository, times(1)).findAllById(productId);
        verify(productRepository, never()).save(any(Product.class));
        verify(modelMapper, never()).map(any(Product.class), eq(ProductDto.class));
    }

    @Test
    @Order(19)
    @DisplayName("Test 19: Update Product - Null Product Id")
    void updateProduct_NullProductId() {
        // Arrange
        Long productId = null;
        ProductDto updateProduct = new ProductDto(1L, "Product Name", "Product Number", "Description", 10, BigDecimal.valueOf(100.0), "Supplier", "Sku", "Product Brand");

        // Act and Assert
        assertThrows(RuntimeException.class, () -> productService.updateProduct(productId, updateProduct));
        verify(productRepository, never()).findAllById(anyLong());
        verify(productRepository, never()).save(any(Product.class));
        verify(modelMapper, never()).map(any(Product.class), eq(ProductDto.class));
    }

    @Test
    @Order(20)
    @DisplayName("Test 20: Update Product - Null Update Product")
    void updateProduct_NullUpdateProduct() {
        // Arrange
        Long productId = 1L;
        ProductDto updateProduct = null;

        // Act and Assert
        assertThrows(RuntimeException.class, () -> productService.updateProduct(productId, updateProduct));
        verify(productRepository, never()).findAllById(anyLong());
        verify(productRepository, never()).save(any(Product.class));
        verify(modelMapper, never()).map(any(Product.class), eq(ProductDto.class));
    }

    // Unit Test Cases for Delete Product
    @Test
    @Order(21)
    @DisplayName("Test 21: Delete Product - When Product Exists & Should Set Deleted To True")
    void deleteProduct_whenProductExists_shouldSetDeletedToTrue() {
        // given
        Long productId = 1L;
        Product product = new Product();
        when(productRepository.findById(productId)).thenReturn(Optional.of(product));

        // when
        productService.deleteProduct(productId);

        // then
        verify(productRepository, times(1)).findById(productId);
        verify(productRepository, times(1)).save(product);
        assertTrue(product.isDeleted());
    }

    @Test
    @Order(22)
    @DisplayName("Test 22: Delete Product - When Product Does Not Exist")
    void deleteProduct_whenProductDoesNotExist() {
        // given
        Long productId = 1L;
        when(productRepository.findById(productId)).thenReturn(Optional.empty());

        // when and then
        assertThrows(RuntimeException.class, () -> productService.deleteProduct(productId));
        verify(productRepository, times(1)).findById(productId);
        verify(productRepository, times(0)).save(any(Product.class));
    }

    @Test
    @Order(23)
    @DisplayName("Test 23: Delete Product - When Product Id Is Null")
    void deleteProduct_whenProductIdIsNull() {
        // when and then
        assertThrows(RuntimeException.class, () -> productService.deleteProduct(null));
        verify(productRepository, times(0)).findById(anyLong());
        verify(productRepository, times(0)).save(any(Product.class));
    }

    @Test
    @Order(24)
    @DisplayName("Test 24: Delete Product - When Product Id Is Zero")
    void deleteProduct_whenProductIdIsZero() {
        // given
        Long productId = 0L;
        when(productRepository.findById(productId)).thenReturn(Optional.empty());

        // when and then
        assertThrows(RuntimeException.class, () -> productService.deleteProduct(productId));
        verify(productRepository, times(1)).findById(productId);
        verify(productRepository, times(0)).save(any(Product.class));
    }

    @Test
    @Order(25)
    @DisplayName("Test 25: Delete Product - When Product Repository ThrowsException")
    void deleteProduct_whenProductRepositoryThrowsException_shouldThrowException() {
        // given
        Long productId = 1L;
        when(productRepository.findById(productId)).thenThrow(RuntimeException.class);

        // when and then
        assertThrows(RuntimeException.class, () -> productService.deleteProduct(productId));
        verify(productRepository, times(1)).findById(productId);
        verify(productRepository, times(0)).save(any(Product.class));
    }

    @Test
    @Order(26)
    @DisplayName("Test 26: Delete Product - When Product Repository Save ThrowsException")
    void deleteProduct_whenProductRepositorySaveThrowsException_shouldThrowException() {
        // given
        Long productId = 1L;
        Product product = new Product();
        when(productRepository.findById(productId)).thenReturn(Optional.of(product));
        when(productRepository.save(product)).thenThrow(RuntimeException.class);

        // when and then
        assertThrows(RuntimeException.class, () -> productService.deleteProduct(productId));
        verify(productRepository, times(1)).findById(productId);
        verify(productRepository, times(1)).save(product);
    }
}
