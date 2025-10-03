import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useState } from "react";
import { DrawerEditUser } from "../drawer-edit-user";

type usuario = {
       id: number,
       email_user: string,
        user_name:string
}

type props = {
  usuarios: usuario[]
}


export const TableUsers = ({usuarios }:props )=>{

const [ editUser, setEditUser ] = useState<usuario>()
const [ viewDrawer, setViewDrawer ] = useState(false)

function handleEditClient (usuario:usuario){
 setEditUser(usuario)
 setViewDrawer(true)
}

return (

<Table >
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Cód</TableHead>
      <TableHead>Nome</TableHead>
 
    </TableRow>
  </TableHeader>
  <TableBody>
  {  
    usuarios.length > 0 ? 
        (
            usuarios.map((i)=>(
            <TableRow key={i.id} onClick={()=> handleEditClient(i)}>
                <TableCell className="font-medium">{i.id}</TableCell>
                <TableCell> <span className=" font-sans ">  { i.user_name}   </span></TableCell>

                </TableRow>
            ))
        ): null
    }
   {
    viewDrawer && editUser && 
        <DrawerEditUser usuario={editUser}  openDrawer={viewDrawer} setOpenDrawer={setViewDrawer} />
   }

  </TableBody>
</Table>
    
)
}