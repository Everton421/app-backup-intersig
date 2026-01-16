import axios from 'axios'

export function configApi (){ 
    //let url ='https://192.168.100.106:3333'
  //  let url ='https://192.168.100.106:3333'
     let url ='https://localhost:3333'

    if(process.env.NEXT_PUBLIC_URL_API && process.env.NEXT_PUBLIC_URL_API != ''){
            url = process.env.NEXT_PUBLIC_URL_API
    }

const api = axios.create({
            baseURL: url
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