import axios from 'axios'

export const api = axios.create({
    //baseURL:"http://26.236.249.244:3333",
    baseURL:"http://localhost:3333"
})