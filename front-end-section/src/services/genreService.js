import http from "./httpService";
// import * as apiEndpoint from "../config.json";

const apiEndpoint = "http://localhost:3900/api";

export function getGenres() {
  return http.get(apiEndpoint + "/genres");
}
