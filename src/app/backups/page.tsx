'use client'
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import { TableBackups } from "@/components/table-backups"
import { OrbitProgress, ThreeDot } from "react-loading-indicators"
import { useEffect, useState } from "react"
import { clientsRequest } from "../@types/clients"
import { configApi } from "../services/api"
import { Input } from "@/components/ui/input"
import { useAuth } from "../contexts/AuthContext"

export default function PageBackups() {
  
  const [ loadingData, setLoadingData ]= useState(true);
  const  [ dataClients, setDataClients ] = useState<clientsRequest[]>( )
  const [ pesquisa, setPesquisa ] = useState<string | null >('')
  const [ orderBy, setOrderBy ] = useState('efetuar_backup')
    
  const api = configApi()
    
  const { user,  loadingAuth} = useAuth();


  async function getClients(){
  
    if(!user) return console.log('usuario nao autenticado')

    let query ={ search: pesquisa , orderBy:orderBy  }

    if(pesquisa !== ''){
      query.search = pesquisa;
    }
    if(orderBy !== ''){
       query.orderBy = orderBy
    }
    let header
    if(user && user.token){
       header = { 'authorization': user.token} 
    }

      try{
      setLoadingData(true)
       const resultApi = await api.get('/clientes', {   
      headers :{ 'authorization': user.token},
        params: query
      },

       );
       console.log(resultApi)
      if(resultApi.status === 200 ){
         setDataClients(resultApi.data.clientes)
      }
      setLoadingData(false)

    } catch(e){
      setLoadingData(false)

      console.log(  e )
    }finally{
      setLoadingData(false)
    } 
  }
  
  useEffect(()=>{
  
      getClients()

  },[ user , pesquisa])

 

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader pageName="Backups" />
        <div className="flex flex-1 mt-2  " >
         <div className=" w-4/12 ml-10 flex " >

           <Input
            onChange={(e)=> setPesquisa(e.target.value)}
           placeholder="pesquisar:"
           />
   

          </div>

       </div>
                
     <div className="flex  w-full h-full flex-col  ">
       <div className="@container/main flex flex-1 flex-col gap-2 itens-start">
         <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 ">
           <div className="flex items-center justify-between px-4 lg:px-6  ">
             { 
                
                  ( 
                   dataClients && dataClients.length > 0 ?     
                    <TableBackups clients={ dataClients }  />
                    :
                      loadingData ? (
                      <div className="flex w-full items-center justify-center">
                          <OrbitProgress variant="track-disc" speedPlus= {4} easing="linear" color="#000" />
                       </div>
                      ) :
                    <div className="flex w-full items-center justify-center">
                          <span className="font-bold text-2xl text-gray-700"> nenhum cliente encontrado!</span> 
                    </div>
                 )
                }
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
