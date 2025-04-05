package warehouse.mngt.springwarehousemngt.responses;

import lombok.Getter;

@Getter
public class LoginResponse {

    private String token;

    private long expiresIn;

    public LoginResponse setToken(String token) {
        this.token = token;
        return this;
    }

    public LoginResponse setExpiresIn(long expiresIn) {
        this.expiresIn = expiresIn;
        return this;
    }

    @Override
    public String toString() {
        return "LoginResponse{" +
                "token='" + token + '\'' +
                ",expiresIn=" + expiresIn +
                '}';
    }
}
