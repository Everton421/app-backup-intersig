import axios from 'axios'

export function configApi (){ 

const api = axios.create({
    //baseURL:"http://26.236.249.244:3333",
      //  baseURL:"https://localhost:3333"
   baseURL:"https://100.103.7.32:3333"

})


api.interceptors.request.use(
    async ( config ) =>{
    
         return config
    },
    ( error )=>{
        return Promise.reject(error)
    }
)

return api
}