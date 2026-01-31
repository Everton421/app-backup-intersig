import { clientsRequest } from "@/app/@types/clients"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { IconAlertCircleFilled, IconArrowUpToArc, IconCircleCheckFilled, IconCircleXFilled, IconEdit, IconLoader, IconSettingsCancel } from "@tabler/icons-react";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { DrawerEditBackup } from "../drawer-edit-backup";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { ArrowBigUpDash, ArrowDownUp } from "lucide-react";
import { Button } from "../ui/button";
import { configApi } from "@/app/services/api";
import { Alert } from "../alert/alert";
import { useAuth } from "@/app/contexts/AuthContext";
import { ThreeDot } from "react-loading-indicators";
import { useTheme } from "next-themes";

type props = 
{
    clients:clientsRequest[]
}

export const TableBackups = ({clients }:props )=>{
    const { theme } = useTheme();

      const api = configApi()
      const { user  } = useAuth();
  
  const [ editBackup, setEditBackup ] = useState<clientsRequest>()
  const [ viewDrawer, setViewDrawer ] = useState(false)
      
  const [  loadingMessage, setLoadingMessage ] = useState(false);
  const [ visible, setVisible ] = useState(false);
  
  const [title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ codigoClientMessage, setCodigoClientMessage ] = useState(0);

  function handleEditBackup (client:clientsRequest){
  setEditBackup(client)
  setViewDrawer(true)
}

 

async function sendToQueue( codigo: string ){

      setCodigoClientMessage( Number(codigo) );

  try{
         if(!user ) return console.log('usuario nao esta autenticado ') 

      setLoadingMessage(true)
     const response   = await api.post(`/send-message-backup/${codigo}`,{}, {
           headers:{ 'Authorization': user.token},
     })
     console.log(response)
       if(response.status === 200 ){
            setLoadingMessage(false)
            setVisible(true)
            setDescription(response.data.msg)
            setTitle("Ok!")
        }

  }catch(e){
      setLoadingMessage(false)
            setTitle("Ok!")
            console.log("erro ", e);
            setVisible(true)
            setDescription("Erro ao tentar enviar o backup para a fila" )
  }finally{
      setLoadingMessage(false)

  }

}


return (
       <>
             {
                          visible && 
                            <Alert
                            setVisible={ setVisible}
                            visible={visible}
                            description={description}
                            title={title}
                            closeDrawer={ setVisible}
                            />
                         }

<Table >
 
  <TableHeader>
    <TableRow>
      <TableHead className="md:text-[15px] text-[10px]">Cód</TableHead>
      <TableHead className="md:text-[15px] text-[10px]">Nome</TableHead>
      <TableHead className="md:text-[15px] text-[10px]">Último Backup</TableHead>
      <TableHead className="md:text-[15px] text-[10px]">Status Backup</TableHead>
      <TableHead className="md:text-[15px] text-[10px]" >efetuar backup</TableHead>
      <TableHead className="md:text-[15px] text-[10px]" >banco de dados</TableHead>
      <TableHead className="md:text-[15px] text-[10px]" >Editar</TableHead>
     
      <TableHead className="md:text-[15px] text-[10px]" >Enviar para fila</TableHead>
      

    </TableRow>
  </TableHeader>
  <TableBody>
  {  
    clients.length > 0 ? 
        (
            clients.map((i)=>(
            <TableRow key={i.codigo}  >
                <TableCell className="font-medium md:text-[15px] text-[10px]"   >{i.codigo}</TableCell>
                
                <TableCell>
                   <Tooltip>
                    <TooltipTrigger asChild>
                     <span className=" font-sans md:text-[15px] text-[10px] " > 
                        { i.nomeFantasia}
                          </span>
                       </TooltipTrigger>
                            <TooltipContent>
                                  <p>cnpj: {i.cnpj}   </p>
                                  <p>Razao Social: {i.razaoSocial}  </p>
                                  <p> Nome Fantasia:  {i.nomeFantasia}  </p>
                                  <p>Nome Reduz:  {i.nomeReduz}  </p>
                                  <p>Nome radmin:  {i.nomeRadmin}  </p>
                                </TooltipContent>
                   </Tooltip>
                </TableCell>
                <TableCell  >
                    <span className=" font-sans md:text-[15px] text-[10px] ">
                      { 
                        i.data_ultimo_backup ? new Date(i.data_ultimo_backup).toLocaleString('pt-br', { day:"numeric",month: "long", year:'numeric' }) 
                        : '00-00-0000'
                      }
                    </span>

               </TableCell>
               
                <TableCell> 
                    { i.status_backup === 'finalizado' && 
                      <div className="flex font-sans  "> 
                         <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400 gap-1 ml-1 mr-1 " />
                         <Badge variant="outline" className="text-muted-foreground px-1.5">
                           finalizado
                         </Badge> 
                      </div>
                    }
                      { i.status_backup === 'pendente' && 
                      <div className="flex font-sans  "> 
                        <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex">
                                <IconAlertCircleFilled className="fill-orange-700 gap-1 ml-1 mr-1 "   />     
                              <Badge variant="outline" className="text-muted-foreground px-1.5">
                                  pendente
                                </Badge> 
                            </div>

                          </TooltipTrigger>
                                <TooltipContent>
                                 <p>{i.msg_backup && i.msg_backup }</p>
                                </TooltipContent>
                              </Tooltip>
                      </div>
                           
                     }                      
                      { i.status_backup ===  'erro' && 
                            <div className="flex font-sans  "> 
                                 <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="flex">
                                  <IconCircleXFilled className="fill-red-600 gap-1 ml-1 mr-1 " />
                                  <Badge variant="outline" className="text-muted-foreground px-1.5">
                                      erro 
                                  </Badge>
                                  </div>
                           
                                 </TooltipTrigger>
                                <TooltipContent>
                                  <p>{i.msg_backup && i.msg_backup }</p>
                                </TooltipContent>
                              </Tooltip>
                          
                            </div>
                       }  
                     { i.status_backup ===  'em-andamento' && 
                            <div className="flex font-sans  "> 
                            <IconLoader className="fill-gray-700 gap-1 ml-1 mr-1 " />
                            <Badge variant="outline" className="text-muted-foreground px-1.5">
                                em-andamento
                            </Badge>       
                          </div>
                      }  

                </TableCell>

                <TableCell >
                    { i.efetuar_backup && i.efetuar_backup === 'S' ?
                     ( 
                      <div className="flex font-sans  "> 
                         <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400 ml-1 mr-1" /> 
                         <Badge variant="outline" className="text-muted-foreground px-1.5" >
                              configurado {i.hora_agenda_backup}
                        </Badge> 
                      </div>
                     ) : ( 
                      <div className="flex font-sans  "> 
                         <IconSettingsCancel className="fill-gray-200 ml-1 mr-1" />
                        <Badge variant="outline" className="text-muted-foreground px-1.5" >
                            Não configurado
                        </Badge>       
                      </div>
                         )  } 
                 </TableCell>
                <TableCell> <span className=" font-sans " >  { i.nomeBanco ? i.nomeBanco : null}   </span></TableCell>

                <TableCell className="">
                  <Button variant={"outline"} className="cursor-pointer" onClick={()=>handleEditBackup(i)} >
                      <IconEdit    />
                  </Button>
                 </TableCell>

                <TableCell className="flex items-center justify-center  ">
                    {
                     loadingMessage &&  codigoClientMessage && i.codigo === codigoClientMessage ? 
                     ( 
                        <div>    
                          <ThreeDot
                           size="large"
                           color={ theme  === 'dark' ? '#FFF' : "#000"}
                          />
                       </div>
                      ) : (
                     <Button variant={"outline"}  className="cursor-pointer shadow-2xl"   onClick={( )=>sendToQueue(String(i.codigo))  }  >
                         <IconArrowUpToArc className=" " />
                      </Button>
                      )
                    }
                   
                 </TableCell>
           
                </TableRow>
            ))
        ): null
    }
     {
       viewDrawer && editBackup && 
           <DrawerEditBackup client={editBackup}  openDrawer={viewDrawer} setOpenDrawer={setViewDrawer} />
      
      }
  </TableBody>
</Table>
       </>

)
}