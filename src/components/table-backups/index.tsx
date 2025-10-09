import { clientsRequest } from "@/app/@types/clients"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { IconAlertCircleFilled, IconCircleCheckFilled, IconCircleXFilled, IconLoader, IconSettingsCancel } from "@tabler/icons-react";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { DrawerEditBackup } from "../drawer-edit-backup";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type props = 
{
    clients:clientsRequest[]
}

export const TableBackups = ({clients }:props )=>{

  const [ editBackup, setEditBackup ] = useState<clientsRequest>()
  const [ viewDrawer, setViewDrawer ] = useState(false)

  function handleEditBackup (client:clientsRequest){
  setEditBackup(client)
  setViewDrawer(true)
}
return (
<Table >
 
  <TableHeader>
    <TableRow>
      <TableHead >Cód</TableHead>
      <TableHead>Nome</TableHead>
      <TableHead>Último Backup</TableHead>
      <TableHead>Último Arquivo</TableHead>
      <TableHead>Status Backup</TableHead>
      <TableHead >efetuar backup</TableHead>
      <TableHead >banco de dados</TableHead>

    </TableRow>
  </TableHeader>
  <TableBody>
  {  
    clients.length > 0 ? 
        (
            clients.map((i)=>(
            <TableRow key={i.codigo}  onClick={()=>handleEditBackup(i)}>
                <TableCell className="font-medium"   >{i.codigo}</TableCell>
                
                <TableCell> <span className=" font-sans " >  { i.nomeFantasia}   </span></TableCell>
                <TableCell  >
                    <span className=" font-sans ">
                      { 
                        i.data_ultimo_backup ? new Date(i.data_ultimo_backup).toLocaleString('pt-br', { day:"numeric",month: "long", year:'numeric' }) 
                        : '00-00-0000'
                      }
                    </span>

               </TableCell>
                  <TableCell >
                    <span className=" font-sans ">
                      { 
                        i.arquivoMaisRecente
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
)
}