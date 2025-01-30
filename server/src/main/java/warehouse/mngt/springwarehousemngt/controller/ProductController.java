package warehouse.mngt.springwarehousemngt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import warehouse.mngt.springwarehousemngt.dto.ProductDto;
import warehouse.mngt.springwarehousemngt.entity.Product;
import warehouse.mngt.springwarehousemngt.repository.ProductRepository;
import warehouse.mngt.springwarehousemngt.service.ProductService;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private ProductRepository productRepository;

    //POST - Create New Product REST API
    @PostMapping
    public ResponseEntity<ProductDto> createProduct(@RequestBody ProductDto productDto){
        ProductDto savedProduct = productService.createProduct(productDto);
        return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
    }

    //GET - Get Product By ID REST API
    @GetMapping("{id}")
    public ResponseEntity<Product> getProductById(@PathVariable ("id") Long id){
        Product product = productRepository.findAllById(id)
                .orElseThrow(()-> new RuntimeException("Product does not exist with Id:" + id));
        return ResponseEntity.ok(product);
    }

    //GET - Get All Products REST API
    @GetMapping
    public ResponseEntity<List<ProductDto>> getAllProducts(){
        List <ProductDto> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    //UPDATE - Update Product REST API
    public ResponseEntity<Product> updateProducts( long id, Product productDetails){
        Product updateProduct = productRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Product does not exist with id: " + id));

        updateProduct.setProductName(productDetails.getProductName());
        updateProduct.setDescription(productDetails.getDescription());
        updateProduct.setQuantity(productDetails.getQuantity());
        updateProduct.setPrice(productDetails.getPrice());
        updateProduct.setSupplier(productDetails.getSupplier());

        productRepository.save(updateProduct);
        return ResponseEntity.ok(updateProduct);
    }
}
