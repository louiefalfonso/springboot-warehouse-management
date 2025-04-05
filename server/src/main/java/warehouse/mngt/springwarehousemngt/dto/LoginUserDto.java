package warehouse.mngt.springwarehousemngt.dto;

import lombok.Getter;

@Getter
public class LoginUserDto {

    private String email;

    private String password;

    public LoginUserDto setEmail(String email) {
        this.email = email;
        return this;
    }

    public LoginUserDto setPassword(String password) {
        this.password = password;
        return this;
    }

    @Override
    public String toString() {
        return "LoginUserDto{" +
                "email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }

}
