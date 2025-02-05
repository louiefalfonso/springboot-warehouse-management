package warehouse.mngt.springwarehousemngt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import warehouse.mngt.springwarehousemngt.entity.Product;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findAllById (Long ProductId);

    List<Product> findByDeleted(boolean deleted);

    Optional<Product> findByIdAndDeleted(Long id, boolean deleted);

}
