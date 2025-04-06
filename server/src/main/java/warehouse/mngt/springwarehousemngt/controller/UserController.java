package warehouse.mngt.springwarehousemngt.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import warehouse.mngt.springwarehousemngt.entity.User;
import warehouse.mngt.springwarehousemngt.service.UserService;

import java.util.List;

@RequestMapping("/api/v1/auth/users")
@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<User> authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        return ResponseEntity.ok(currentUser);
    }

    @GetMapping
    public ResponseEntity<List<User>> allUsers() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        List <User> users = userService.allUsers();
        return ResponseEntity.ok(users);
    }
}
