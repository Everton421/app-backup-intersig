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
import { AuthUser, useAuth } from "../contexts/AuthContext"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { IconFilter } from "@tabler/icons-react"
import { SheetfiltroBackup } from "@/components/sheet-filter-backup/sheet-filter-backup"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"


   type valuesGroupBy =  'host'|'codigo'| 'nomeBanco'
   type valuesOrderBy =  'nomeFantasia'|'data_ultimo_backup'|'hora_agenda_backup'|'codigo'
   type activeClient = 'S'|'N'
    type configuredExecBackup = 'S'|'N'

  export  type filterRequest =
    {
      search: string ,
      orderBy:valuesOrderBy ,
      groupBy:valuesGroupBy,
      ativo: activeClient, 
      efetuar_backup:configuredExecBackup
    }

export default function PageBackups() {
  
  const [ loadingData, setLoadingData ]= useState(true);
  const [ dataClients, setDataClients ] = useState<clientsRequest[]>([])
  const [ openSheetFilter, setOpenSheetFilter ] = useState(false)
  const [ loading, setLoading ] = useState(false);

    const [ apiError, setApiError ] = useState(false);
    const [ msgApiError, setMsgApiError ] = useState();


  const { theme } = useTheme();

const [filterRequest, setFilterRequest  ] = useState<filterRequest>(
  {
    search: '',
    ativo:'S',
    efetuar_backup: "S",
    orderBy: "data_ultimo_backup",
    groupBy:'codigo'
  }
)

  const api = configApi()
  const router = useRouter();

  const { user,  loadingAuth} = useAuth();

   useEffect(()=>{
     if(loadingAuth){
         setLoading(true)
      } else{
      
         if( user && !loadingAuth ){
          setLoading(false);
         }

        if(!user || !user.token && loadingAuth){
           router.push('/login')
        }
     }
 
   },[loadingAuth, user ])
   

  async function getClients(user:AuthUser ){
    let header
    if(user && user.token){
       header = { 'authorization': user.token} 
    } 

      try{
      setLoadingData(true)
       const resultApi = await api.get('/clientes', {   
      headers :{ 'authorization': user.token},
        params: filterRequest
      },
       );
      if(resultApi.status === 200 ){
         setDataClients(resultApi.data.clientes)
      }
      setLoadingData(false)
    } catch(e:any){
      setLoadingData(false)

       console.log("ERRO: ",e.message   )

        setApiError(true);
        setMsgApiError(e.message || "Erro ao tentar consultar dados da api!")

    }finally{
      setLoadingData(false)
    } 
  }
  
  useEffect(()=>{
    if(!loadingAuth){
        if(!user || !user.token || user === null ){
           router.push('/login')
        }else{
        getClients(user)
        }
    } 
  },[ user ,filterRequest])

 function updateFilter( key: keyof filterRequest  ,value : filterRequest[ keyof filterRequest]){
    setFilterRequest( (prev)=>(
      {
        ...prev, 
          [key]: value,
      }
    ))
 }

  return (
    <>
     {
      loading && !user ? 
      <div className="flex-1 w-full">
         <ThreeDot  color="black" />
      </div>
      :
      <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
        <SheetfiltroBackup 
          open={openSheetFilter} 
          setOpen={setOpenSheetFilter}
          filterRequest={filterRequest}
          updateFilter={updateFilter}
          />

      <SidebarInset>
        <SiteHeader pageName="Backups" />
        <div className="flex  mt-2 flex-row  " >
         <div className=" w-full md:w-4/12 ml-10   items-center flex" >
           <Input
            onChange={(e)=> updateFilter( "search" , e.target.value)}
             placeholder="pesquisar:"
            className="w-[250px] md:w-[550px] "
            />
             <Button className="ml-1 mr-1 max-w-[45px] md:max-w-65 md:text-[15px] text-[10px]"
              onClick={()=> {   user && getClients(user)  } }
             >
               pesquisar
             </Button>
          </div>
          
              <Separator
                  orientation="vertical"
                  className="md:mx-4 mx-1  data-[orientation=vertical]:h-15 "
                />

      <div className=" flex items-center justify-center" >
         <Button onClick={()=>{ setOpenSheetFilter(true) }}>
           <IconFilter  /> 
        </Button>
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
                      loadingData && !apiError && (
                      <div className="flex w-full items-center justify-center">
                          <OrbitProgress variant="track-disc" speedPlus= {4} easing="linear" color={ theme ==='dark' ? '#FFF' : '#000'} />
                       </div>
                      )  
                  )
              }
                {
                      !apiError && dataClients && dataClients.length > 0   ?     
                      <TableBackups clients={ dataClients }  />
                      :
                      !loadingData && !apiError && dataClients && dataClients.length === 0 &&
                      <div className="flex w-full items-center justify-center">
                            <span className="font-bold text-2xl text-gray-700"> nenhum cliente encontrado!</span> 
                      </div>
                }
                  
                  { apiError &&
                      <div className="flex w-full items-center justify-center">
                            <span className="font-bold text-2xl text-gray-700">{msgApiError}</span> 
                       </div>
                  }

              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
      </SidebarProvider>
    }
  </>
  )
}
