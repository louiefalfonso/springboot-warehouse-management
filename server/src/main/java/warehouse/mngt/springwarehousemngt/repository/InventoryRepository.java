package warehouse.mngt.springwarehousemngt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import warehouse.mngt.springwarehousemngt.entity.Inventory;

import java.util.List;
import java.util.Optional;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {

    Optional<Inventory> findAllById (Long InventoryId);

    List<Inventory> findByDeleted(boolean deleted);

    Optional<Inventory> findByIdAndDeleted (Long id, boolean deleted);
}
