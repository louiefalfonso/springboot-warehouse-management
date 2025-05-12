package warehouse.mngt.springwarehousemngt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import warehouse.mngt.springwarehousemngt.entity.Product;
import warehouse.mngt.springwarehousemngt.entity.Supplier;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findAllById (Long ProductId);

    boolean existsByProductNumber (String productNumber);

    // for JUnit Test Case Only

    List<Product> findBySku(String sku);

    List<Product> findByProductNumber(String productNumber);

    List<Product> findBySupplier(Supplier supplier);

    @Query("SELECT p FROM Product p WHERE p.quantity <= :quantity")
    List<Product> findOutOfStockProduct (int quantity);
}
