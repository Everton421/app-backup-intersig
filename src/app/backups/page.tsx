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
import {  SelectActiveClient } from "@/components/select-active-client"
import { Separator } from "@/components/ui/separator"
import { SelectEfetuarBackup } from "@/components/select-efetuar-backup/select-efetuar-bakup"
import { SelectConfiguradoEfetuarBackup } from "@/components/select-configurado/select-configurado"
import { Button } from "@/components/ui/button"
import { SelectOrderBy } from "@/components/select-orderby-backup"

   type valuesOrderBy = { key: string, field:string}[ ];

export default function PageBackups() {
  
  const [ loadingData, setLoadingData ]= useState(true);
  const  [ dataClients, setDataClients ] = useState<clientsRequest[]>( )
  const [ pesquisa, setPesquisa ] = useState<string | null >('')
   const [ ativos, setAtivos ] = useState<string>('S');
  const [ configurado , setConfigurado ] = useState<'S'|'N'>('S')
  const [ orderBy, setOrderBy ] = useState('data_ultimo_backup')

const [ valuesOrderBy ] = useState<valuesOrderBy>([ 
  {field:'codigo', key:'codigo'},
  {field:'nome fantasia', key:'nomeFantasia'},
  {field:'data ultimo backup', key:'data_ultimo_backup'},
  {field:'hora agenda backup', key:'hora_agenda_backup'} 
]) 

  const api = configApi()
    
  const { user,  loadingAuth} = useAuth();


  async function getClients(){
  
    if(!user) return console.log('usuario nao autenticado')

    let query ={ search: pesquisa , orderBy:orderBy , ativo: ativos, efetuar_backup:configurado  }

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

  },[ user , pesquisa, ativos,configurado, orderBy])

 

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
        <div className="flex  mt-2 md:flex-row flex-col " >
         <div className=" w-4/12 ml-10   items-center flex" >
           <Input
            onChange={(e)=> setPesquisa(e.target.value)}
           placeholder="pesquisar:"
           />
             <Button className="ml-1 mr-1"
              onClick={()=> getClients() }
             >
               pesquisar
             </Button>
          </div>
          
              <Separator
                  orientation="vertical"
                  className="mx-4 data-[orientation=vertical]:h-15"
                />
         <div className="  flex items-center justify-center" >
              <SelectActiveClient
                ativos={ativos}
                setAtivos={setAtivos}
                values={['S','N']}
                placeholder="clientes"
                defaultValueActive="S"    
               />
        </div> 
       <Separator
           orientation="vertical"
            className="mx-4 data-[orientation=vertical]:h-15 " />
           <div className=" flex items-center justify-center" >
            <SelectConfiguradoEfetuarBackup
              configurado={configurado}
              list={['S','N']}
              setConfigurado={setConfigurado}
            />

          </div>
        <Separator
           orientation="vertical"
            className="mx-4 data-[orientation=vertical]:h-15 " />
      <div className=" flex items-center justify-center" >
            
            <SelectOrderBy
              defaultValue={orderBy}
              setValue={setOrderBy}
              values={valuesOrderBy}

              />

       </div>

       </div>
                 <Separator
                  className=" mt-2.5 data-[orientation=vertical]:h-9"
                />
     <div className="flex  w-full h-full flex-col  ">
       <div className="@container/main flex flex-1 flex-col gap-2 itens-start">
         <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 ">
           <div className="flex items-center justify-between px-4 lg:px-6  ">
             { 
                
                  ( 
                   
                      loadingData ? (
                      <div className="flex w-full items-center justify-center">
                          <OrbitProgress variant="track-disc" speedPlus= {4} easing="linear" color="#000" />
                       </div>
                      ) :
                      dataClients && dataClients.length > 0 ?     
                    <TableBackups clients={ dataClients }  />
                    :
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
