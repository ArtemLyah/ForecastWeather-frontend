import axios from 'axios'

export class AuthService {
  static async register(AuthData) {
    const response = await axios.post("http://localhost:8080/api/auth/signup", AuthData);
    return response.data;
  }

  static async login(AuthData) {
    const response = await axios.post("http://localhost:8080/api/auth/login", AuthData);
    return response.data;
  }
}