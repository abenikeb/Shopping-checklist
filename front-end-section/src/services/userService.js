import http from "./httpService";

// import apiEndpoint from "../config.json";
const apiEndpoint = "http://localhost:3900/api";
const apiUrl = apiEndpoint + "/users";

export function register(user) {
  return http.post(apiUrl, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}
