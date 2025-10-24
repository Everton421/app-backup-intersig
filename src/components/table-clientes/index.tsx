import { clientsRequest } from "@/app/@types/clients"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { CircleCheckBig, CircleX } from "lucide-react"
import { OrbitProgress} from 'react-loading-indicators';
import { IconAlertCircleFilled, IconCircleCheckFilled, IconCircleXFilled, IconLoader, IconSettingsCancel } from "@tabler/icons-react";
import { Badge } from "../ui/badge";
import { DrawerEditclient } from "../drawer-edit-client";
import { useState } from "react";

type props = 
{
    clients:clientsRequest[]
}

export const TableClientes = ({clients }:props )=>{

const [ editClient, setEditClient ] = useState<clientsRequest>()
const [ viewDrawer, setViewDrawer ] = useState(false)

function handleEditClient (client:clientsRequest){
 setEditClient(client)
 setViewDrawer(true)
}

return (

<Table >
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Cód</TableHead>
      <TableHead>Nome</TableHead>
      <TableHead>cnpj</TableHead>
      <TableHead>Data Liberação</TableHead>
      <TableHead  >Acesso</TableHead>
      <TableHead  >ativo</TableHead>

    </TableRow>
  </TableHeader>
  <TableBody>
  {  
    clients.length > 0 ? 
        (
            clients.map((i)=>(
            <TableRow key={i.codigo} onClick={()=> handleEditClient(i)}>
                <TableCell className="font-medium md:text-[15px] text-[10px] ">{i.codigo}</TableCell>
                
                <TableCell> <span className=" font-sans md:text-[15px] text-[10px]">  { i.nomeFantasia}   </span></TableCell>
                <TableCell>
                    <span className=" font-sans md:text-[15px] text-[10px]">
                      { 
                         i.cnpj
                      }
                    </span>
               </TableCell>
                    <TableCell>
                    <span className=" font-sans ">
                         <Badge variant="outline" className="text-muted-foreground px-1.5" >
                          { 
                             i.dataLiberacao &&  i.dataLiberacao  
                          }
                        </Badge> 

                    </span>
               </TableCell>
           
                <TableCell >
                    { i.acesso && i.acesso === 'L' ?
                     ( 
                      <div className="flex font-sans  "> 
                         <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" /> 
                         <Badge variant="outline" className="text-muted-foreground px-1.5" >
                              Liberado
                        </Badge> 
                      </div>
                     ) : ( 
                        i.acesso === 'B'  ?
                      <div className="flex font-sans  "> 
                          <IconAlertCircleFilled className="fill-orange-700 gap-1 "   />     
                        <Badge variant="outline" className="text-muted-foreground px-1.5">
                            Bloqueado
                        </Badge>       
                      </div>
                      :
                      i.acesso === 'A'  &&
                       <div className="flex font-sans  "> 
                          <IconAlertCircleFilled className="fill-orange-700 gap-1 "   />     
                        <Badge variant="outline" className="text-muted-foreground px-1.5">
                            Avaliação
                        </Badge>       
                      </div>

                         )  } 
                 </TableCell>
              
                  <TableCell >
                    { i.ativo && i.ativo === 'S' ?
                         <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400 gap-1 ml-1 mr-1 " />
                      :
                         <IconCircleXFilled className="fill-orange-700 gap-1 ml-1 mr-1 "   />     
                      }
                   </TableCell>
          

                </TableRow>
            ))
        ): null
    }
   {
    viewDrawer && editClient && 
        <DrawerEditclient client={editClient}  openDrawer={viewDrawer} setOpenDrawer={setViewDrawer} />
   
   }

  </TableBody>
</Table>
    
)
}