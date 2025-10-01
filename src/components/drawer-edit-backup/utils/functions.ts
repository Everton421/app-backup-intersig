import { clientsRequest } from "@/app/@types/clients"
import { useAuth } from "@/app/contexts/AuthContext"
import { configApi } from "@/app/services/api"
import { Dispatch, SetStateAction } from "react"


export const utils = ()=>{
    const api = configApi()

    type propsPutBackup = {
         setLoadingSave? : Dispatch<SetStateAction<boolean>>
         setOpenDrawer? : Dispatch<SetStateAction<boolean>> 
         setVisibleAlert? : Dispatch<SetStateAction<boolean>>
         setTitleResponse? : Dispatch<SetStateAction<string>>
         setDescriptionResponse? : Dispatch<SetStateAction<string>>
    }
        
    type dataUpdate =
      {
      hora_agenda_backup? : string,
      efetuar_backup? :  'S' | 'N',
      senhaMysql? : string,
      portaMysql? : string | number,
      usuarioMysql? : string,
      acesso? :  'L' | 'A' | 'B'
    }

    const { user  } = useAuth();
 
  async function patchtBackupCLient ( props:propsPutBackup, dataUpdate:dataUpdate, codigo:string )  {
         if(!user ) return console.log('usuario nao esta autenticado ') 
       
      const { setOpenDrawer, setDescriptionResponse, setLoadingSave, setTitleResponse,setVisibleAlert } = props
         try {
           
       //const resultCreateTask = await api.patch(`/clientes/${codigo}`,   
       const resultCreateTask = await api.patch(`/clientes/1`,   

            {
               "hora_agenda_backup": String( dataUpdate.hora_agenda_backup),
               "efetuar_backup": String(dataUpdate.efetuar_backup),
               "senhaMysql": String(dataUpdate.senhaMysql),
               "portaMysql": String(dataUpdate.portaMysql),
               "usuarioMysql": String(dataUpdate.usuarioMysql),
            },
          
      )
          
          if (resultCreateTask.status === 200) {
            setOpenDrawer &&  setOpenDrawer(false)
            setVisibleAlert && setVisibleAlert(true);
            setTitleResponse && setTitleResponse('Ok');
            setDescriptionResponse && setDescriptionResponse("Configurações atualizadas com sucesso")
          }
       setLoadingSave && setLoadingSave(false)
  
     } catch (e) {
         setLoadingSave && setLoadingSave(false)
         setOpenDrawer && setOpenDrawer(false)
         setVisibleAlert && setVisibleAlert(true);
         setTitleResponse && setTitleResponse('Erro');
         setDescriptionResponse && setDescriptionResponse("Erro ao tentar atualizar configurações do cliente ")
 
       console.log(`Erro ao tentar atualizar o cliente `, e )
 
     } finally {
        setOpenDrawer && setOpenDrawer(false)
        setLoadingSave && setLoadingSave(false)
     }
      
  }

  type propsExecBackup = {
    setLoading?: Dispatch<SetStateAction<boolean>>
    setTitleResponse? : Dispatch<SetStateAction<string>>
    setDescriptionResponse? : Dispatch<SetStateAction<string>>
    setVisibleAlert? : Dispatch<SetStateAction<boolean>>

  }
    async function execBackup(codigo:number,props:propsExecBackup ) {
         if(!user ) return console.log('usuario nao esta autenticado ') 

      const { setLoading, setDescriptionResponse, setTitleResponse, setVisibleAlert} = props
   
      setLoading && setLoading(true)
   
      try {
      const result = await api.post(`/executar-backup/${codigo}`,
        {
           headers:{ 'Authorization': user.token}

        }
      )
      if (result.status === 200) {
        setLoading && setLoading(false)

        setTitleResponse && setTitleResponse('OK!');
        setDescriptionResponse && setDescriptionResponse('Backup iniciado, aguarde alguns minutos até que finalizamos a exportação dos bancos de dados! ')
        setVisibleAlert && setVisibleAlert(true)
      }

    } catch (e: any) {
      setLoading && setLoading(false)

       setTitleResponse && setTitleResponse('Erro!');
      setDescriptionResponse && setDescriptionResponse (e.response.data)
      setVisibleAlert && setVisibleAlert(true)

    } finally {
      setLoading && setLoading(false)
    }
  }


    type propsTestConnection = {
    setLoading?: Dispatch<SetStateAction<boolean>>
    setTitleResponse? : Dispatch<SetStateAction<string>>
    setDescriptionResponse? : Dispatch<SetStateAction<string>>
    setVisibleAlert? : Dispatch<SetStateAction<boolean>>
      setLoadingTestConnection?: Dispatch<SetStateAction<boolean>>
  }
   async function testConnection(client:clientsRequest, props:propsTestConnection) {
    if(!user ) return console.log('usuario nao esta autenticado ') 
     
    const { setLoading,setLoadingTestConnection,  setDescriptionResponse, setTitleResponse, setVisibleAlert} = props

    setLoading && setLoading(true)
          setLoadingTestConnection && setLoadingTestConnection(true)

      try {
        const result = await api.post(`/conexao/teste`, {
          host: String(client.host),
          porta: String(client.portaMysql),
          usuario: String(client.usuarioMysql),
          senha: String(client.senhaMysql)
        },{
           headers:{ 'Authorization': user.token},
        })

        if (result.status === 200) {
          setLoading && setLoading(false)
          setLoadingTestConnection && setLoadingTestConnection(false)
          setVisibleAlert && setVisibleAlert(true)
          setTitleResponse && setTitleResponse('Ok!')
          setDescriptionResponse && setDescriptionResponse(result.data.msg)
        }
      } catch (e: any) {
        if (e.status === 500) {
          console.log(e.response.data.message)
          setLoading && setLoading(false)
          setLoadingTestConnection && setLoadingTestConnection(false)
          setVisibleAlert && setVisibleAlert(true)
          setTitleResponse && setTitleResponse('Erro!')
          setDescriptionResponse && setDescriptionResponse(e.response.data.message)
        }
        if (e.status === 400) {
          console.log(e.response.data.message)
          setLoading && setLoading(false)
          setLoadingTestConnection && setLoadingTestConnection(false)
          setVisibleAlert && setVisibleAlert(true)
          setTitleResponse && setTitleResponse('Erro!')
          setDescriptionResponse && setDescriptionResponse(e.response.data.msg)
        }

      } finally {
          setLoadingTestConnection && setLoadingTestConnection(false)
        setVisibleAlert && setVisibleAlert(true)
        setLoading && setLoading(false)
      }

  }


  return  { patchtBackupCLient , execBackup , testConnection}
}
