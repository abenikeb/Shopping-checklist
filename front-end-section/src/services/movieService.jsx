import http from './httpService'

import { apiEndpoint } from '../config.json'

const apiUrl = apiEndpoint + '/movies'

function moviesUrl(id) {
  return `${apiUrl}/${id}`
}

export function getMovies() {
  return http.get(apiUrl)
}

export function getMovie(movieId) {
  return http.get(moviesUrl(movieId))
}

export function saveMovie(movie) {
  if (movie._id) {
    let body = { ...movie }
    delete body._id
    return http.put(moviesUrl(movie._id), body)
  }
  return http.post(apiUrl, movie)
}

export function deleteMovies(movieID) {
  return http.delete(moviesUrl(movieID))
}
