package warehouse.mngt.springwarehousemngt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import warehouse.mngt.springwarehousemngt.entity.Order;

import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {

    Optional<Order> findAllById (Long OrderId);
}
