'use client'
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Input } from "@/components/ui/input";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { clientsRequest } from "../@types/clients";
import { configApi } from "../services/api";
import { TableBackups } from "@/components/table-backups";
import { OrbitProgress, ThreeDot } from "react-loading-indicators";
import { TableClientes } from "@/components/table-clientes";
import { useAuth } from "../contexts/AuthContext";
import { Separator } from "@/components/ui/separator"
import { SelectActiveClient } from "@/components/select-active-client";
import { SelectEfetuarBackup } from "@/components/select-efetuar-backup/select-efetuar-bakup";
import { SelectAcessoSistema } from "@/components/select-acesso-sistema/select-acesso-sistema";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

export default function PageClientes (){
  const  [ loadingData, setLoadingData ]= useState(true);
  const  [ dataClients, setDataClients ] = useState<clientsRequest[]>( )
  const [ pesquisa, setPesquisa ] = useState<string | null >('')
   const [ orderBy, setOrderBy ] = useState('efetuar_backup')


   const [ ativos, setAtivos ] = useState<string>('S');
   const [ configurado , setConfigurado ] = useState<'S'|'N'>('S')
   const [ acesso, setAcesso ] = useState<'L' | 'B' | 'A'>('L')
  const [ loading, setLoading ] = useState(false);

    const api = configApi()
    const { theme } = useTheme();
    const { user , isAuthenticated, loadingAuth } = useAuth();
    const router = useRouter();
    
   useEffect(()=>{
     if(loadingAuth){
       setLoading(true)
     } else{
     if( user && !loadingAuth ){
       setLoading(false);
      }
     }
 
   },[loadingAuth, user ])
     

  async function getClients(user:{ user_name:string, token:string} | null ){
     
    if(!user || !user.token  )  { 
      return  router.push('/login') 
    }
      let query ={ search: pesquisa , orderBy:orderBy , ativo: ativos, 
      acesso:acesso
     }

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

       const resultApi = await api.get('/clientes',{
         headers:{ 'Authorization': user.token},
          params: query
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
    if( !loadingAuth){
      if(!user || !user.token|| user === null  ){
        router.push('/login');
      }else{
       getClients(user)
      }
    }

  },[user,   pesquisa, ativos, acesso])



  return (
    loading ? 
    <div className="flex-1 w-full">
      <ThreeDot  color="black"/>
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
      <SidebarInset>
        <SiteHeader pageName="Clientes" />
          <div className="flex flex-1 mt-2  " >
         <div className=" w-4/12 ml-10  flex items-center " >
        
           <Input
            onChange={(e)=> setPesquisa(e.target.value)}
           placeholder="pesquisar:"
           />
            <Button className="ml-1 mr-1"
              onClick={()=> getClients(user) }
             >
               pesquisar
             </Button>
          </div>
          
              <Separator
                  orientation="vertical"
                  className="mx-4 data-[orientation=vertical]:h-15"
                />
         <div className=" w-4/12 ml-10  items-center " >
          <h1 className="text-base font-medium mr-2  "> Situação Clientes </h1>
              <SelectActiveClient
                ativos={ativos}
                onChange={(value)=> setAtivos(value)}
                values={['S','N']}
                defaultValueActive="S"    
               />
       </div>
       <Separator
                  orientation="vertical"
                  className="mx-4 data-[orientation=vertical]:h-15"
                />
        <div className=" w-4/12 ml-10  items-center " >
            <h1 className="text-base font-medium mr-2  "> Acesso</h1>
            <SelectAcessoSistema
              acesso={acesso}
              setAcesso={setAcesso}
            list={['B', 'L','A']}
            />

          </div>
       </div>
           <Separator
                  className=" mt-2.5 data-[orientation=vertical]:h-9"
                />
                
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
                          <OrbitProgress variant="track-disc" speedPlus= {4} easing="linear" color={ theme ==='dark' ? '#FFF' : '#000'}/>
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
