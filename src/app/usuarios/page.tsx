'use client'
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Input } from "@/components/ui/input";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { clientsRequest } from "../@types/clients";
import {  configApi } from "../services/api";
import { TableBackups } from "@/components/table-backups";
import { OrbitProgress } from "react-loading-indicators";
import { TableClientes } from "@/components/table-clientes";
import { TableUsers } from "@/components/table-usuarios";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";

type usuario = {
       id: number,
       email_user: string,
        user_name:string
}

export default function PageUsers (){
  const [ loadingData, setLoadingData ]= useState(true);
  const [ dataUsers, setDataUsers ] = useState<usuario[]>( )

      const api = configApi()
    const { user,loadingAuth } = useAuth();
    const router = useRouter();

  async function getUsers(user:{ user_name:string, token:string} | null){
      if(!user || !user.token  )  { 
      return  router.push('/login') 
    }
    try{
      setLoadingData(true)
       const resultApi = await api.get('/usuarios',{
        headers: { Authorization: user.token}
       });
      if(resultApi.status === 200 ){
         setDataUsers(resultApi.data.usuarios)
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
    if(!loadingAuth){
      if(!user || !user.token){
           router.push('/login');
      }else{
        getUsers(user);
      }
    }
  },[user, loadingAuth])


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
        <SiteHeader pageName="Usuários"/>
        <div className="flex flex-1 flex-col mt-2">
         <div className=" w-4/12 ml-10" >
           <Input

           placeholder="pesquisar:"
           />
          </div>
        </div>
        
                
     <div className="flex  w-full h-screen flex-col  ">
          <div className="@container/main flex flex-1 flex-col gap-2 ">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 ">
    
          <div className="flex items-center justify-between px-4 lg:px-6  ">
             { 
                
                  ( 
                   dataUsers && dataUsers.length > 0 ?     
                    <TableUsers usuarios={dataUsers}  />
                    :
                      loadingData ? (
                      <div className="flex w-full items-center justify-center">
                          <OrbitProgress variant="track-disc" speedPlus= {4} easing="linear" color="#000" />
                       </div>
                      ) :
                    <div className="flex w-full items-center justify-center">
                          <span className="font-bold text-2xl text-gray-700"> nenhum usuario encontrado!</span> 
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
