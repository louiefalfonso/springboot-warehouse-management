package warehouse.mngt.springwarehousemngt.repository;

import org.springframework.data.repository.CrudRepository;
import warehouse.mngt.springwarehousemngt.entity.User;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Integer> {
    Optional<User> findByEmail(String email);
}
