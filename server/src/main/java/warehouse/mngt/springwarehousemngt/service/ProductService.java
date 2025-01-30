package warehouse.mngt.springwarehousemngt.service;

import warehouse.mngt.springwarehousemngt.dto.ProductDto;

import java.util.List;

public interface ProductService {

    ProductDto createProduct(ProductDto productDto);

    ProductDto getProductById(Long productId);

    List<ProductDto> getAllProducts();

    ProductDto updateProduct(Long productId, ProductDto updateProduct);

}
