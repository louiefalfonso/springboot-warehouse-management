package warehouse.mngt.springwarehousemngt.service.impl;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import warehouse.mngt.springwarehousemngt.dto.ProductDto;
import warehouse.mngt.springwarehousemngt.entity.Product;
import warehouse.mngt.springwarehousemngt.repository.ProductRepository;
import warehouse.mngt.springwarehousemngt.service.ProductService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {

    private ProductRepository productRepository;
    private ModelMapper modelMapper;

    // REST API - Create New Product
    @Override
    public ProductDto createNewProduct(ProductDto productDto) {
        Product product = modelMapper.map(productDto, Product.class);
        Product savedProduct = productRepository.save(product);
        return modelMapper.map(savedProduct, ProductDto.class);
    }

    // REST API - Get Product By ID
    @Override
    public ProductDto getProductById(Long productId) {
        Product product = productRepository.findAllById(productId)
                .orElseThrow(()->new RuntimeException("Product doesn't exist with a given Id:" + productId));
        return modelMapper.map(product, ProductDto.class);
    }

    // REST API - Get All Products
    @Override
    public List<ProductDto> getAllProducts() {
       List<Product> products = productRepository.findAll();
       return products.stream().map((product)-> modelMapper.map(product, ProductDto.class))
               .collect(Collectors.toList());
    }

    // REST API - Update Product
    @Override
    public ProductDto updateProduct(Long productId, ProductDto updateProduct) {
        Product product = productRepository.findAllById(productId)
                .orElseThrow(()-> new RuntimeException("Product doesn't exist with a given Id:" + productId));

        product.setProductName(updateProduct.getProductName());
        product.setDescription(updateProduct.getDescription());
        product.setQuantity(updateProduct.getQuantity());
        product.setPrice(updateProduct.getPrice());
        product.setSupplier(updateProduct.getSupplier());

        Product updateProductObj = productRepository.save(product);
        return modelMapper.map(updateProductObj, ProductDto.class);

    }

    // REST API - Delete Product
    @Override
    public void deleteProduct(Long productId) {
        Product product = productRepository.findAllById(productId)
                .orElseThrow(()-> new RuntimeException("Product doesn't exist with given id:" + productId));
        productRepository.deleteById(productId);
    }
}
