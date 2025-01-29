package warehouse.mngt.springwarehousemngt.service.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import warehouse.mngt.springwarehousemngt.dto.ProductDto;
import warehouse.mngt.springwarehousemngt.entity.Product;
import warehouse.mngt.springwarehousemngt.repository.ProductRepository;
import warehouse.mngt.springwarehousemngt.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ModelMapper modelMapper;


    // REST API - Create New Product
    @Override
    public ProductDto createProduct(ProductDto productDto) {
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




}
