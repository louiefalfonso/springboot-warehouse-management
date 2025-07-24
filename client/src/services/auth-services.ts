import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BASE_URI_AUTH;

interface User {
  username: string;
  password: string;
}

const AuthService = {

  register(user: User) {
    return axios.post(`${API_BASE_URL}/signup`, user);
  },

  login(user: User) {
    return axios.post(`${API_BASE_URL}/login`, user);
  },
};

export default AuthService;