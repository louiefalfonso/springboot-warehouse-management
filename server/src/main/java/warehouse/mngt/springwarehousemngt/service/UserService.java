package warehouse.mngt.springwarehousemngt.service;

import org.springframework.stereotype.Service;
import warehouse.mngt.springwarehousemngt.entity.User;
import warehouse.mngt.springwarehousemngt.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> allUsers() {
        List<User> users = new ArrayList<>();

        userRepository.findAll().forEach(users::add);

        return users;
    }
}
