'use client'
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Input } from "@/components/ui/input";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { clientsRequest } from "../@types/clients";
import { configApi } from "../services/api";
import { TableBackups } from "@/components/table-backups";
import { OrbitProgress } from "react-loading-indicators";
import { TableClientes } from "@/components/table-clientes";
import { useAuth } from "../contexts/AuthContext";

export default function PageClientes (){
  const [ loadingData, setLoadingData ]= useState(true);
  const  [ dataClients, setDataClients ] = useState<clientsRequest[]>( )
  
    const api = configApi()
  
    const { user , isAuthenticated, loadingAuth } = useAuth();

    if(loadingAuth){
      setLoadingData(true)
    }

  async function getClients(){
 
    if(!user ) return console.log('usuario nao esta autenticado ') 
    try{
      setLoadingData(true)

       const resultApi = await api.get('/clientes',{
         headers:{ 'Authorization': user.token}

       });
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
  },[user])


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
        <SiteHeader />
        <div className="flex flex-1 flex-col mt-2">
         <div className=" w-4/12 ml-10" >
           <Input

           placeholder="pesquisar:"
           />
          </div>
        </div>
        
                
     <div className="flex  w-full h-full flex-col  ">
          <div className="@container/main flex flex-1 flex-col gap-2 ">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 ">
    
          <div className="flex items-center justify-between px-4 lg:px-6  ">
             { 
                
                  ( 
                   dataClients && dataClients.length > 0 ?     
                    <TableClientes clients={dataClients}  />
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
