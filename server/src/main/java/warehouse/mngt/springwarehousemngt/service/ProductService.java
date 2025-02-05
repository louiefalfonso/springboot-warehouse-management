package warehouse.mngt.springwarehousemngt.service;

import warehouse.mngt.springwarehousemngt.dto.ProductDto;

import java.util.List;

public interface ProductService {

    ProductDto createNewProduct(ProductDto productDto);

    ProductDto getProductById(Long productId);

    List<ProductDto> getAllProducts();

    ProductDto updateProduct(Long productId, ProductDto updateProduct);

    void deleteProduct(Long productId);

    List<ProductDto> getAllDeletedProducts();

    ProductDto getDeletedProductById(Long id);

}
