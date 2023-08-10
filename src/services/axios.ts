import axios from 'axios'

export const $host = axios.create({
  baseURL: 'http://localhost:5000/api'
})

export const $authHost = axios.create({
  baseURL: 'http://localhost:5000/api'
})

$authHost.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token')
  return config
})