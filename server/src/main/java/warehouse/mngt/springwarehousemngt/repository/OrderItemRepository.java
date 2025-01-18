package warehouse.mngt.springwarehousemngt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import warehouse.mngt.springwarehousemngt.entity.OrderItem;

import java.util.Optional;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    Optional<OrderItem> findAllById (Long OrderItemId);
}
