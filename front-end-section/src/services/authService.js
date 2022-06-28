import http from "./httpService";
import jwtDecode from "jwt-decode";
import { apiEndpoint } from "../config.json";

const apiUrl = apiEndpoint + "/auth";
const token = "token";

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiUrl, { email, password });
  localStorage.setItem(token, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(token, jwt);
}

export function logout() {
  localStorage.removeItem(token);
}

export function getJwt() {
  return localStorage.getItem(token);
}

export function getUserData() {
  try {
    return jwtDecode(localStorage.getItem(token));
  } catch (ex) {
    return null;
  }
}
export default {
  login,
  logout,
  getUserData,
  loginWithJwt,
  getJwt,
};
