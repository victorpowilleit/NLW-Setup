import axios from 'axios'

export const api = axios.create({
    // baseURL: "http://127.0.0.1:3333"
    baseURL: "http://192.168.15.13:3333"
})