"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Label } from "../ui/label"
import { Input } from "../ui/input"

import { ThreeDot } from 'react-loading-indicators'
import { clientsRequest } from "@/app/@types/clients"
import { DialogTitle } from "../ui/dialog"
import { IconCircleDashedCheck, IconCircleDashedLetterA, IconCircleDashedLetterX } from "@tabler/icons-react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

type props = {
client: clientsRequest,
openDrawer:boolean, 
setOpenDrawer : (value:boolean)=>void
}

  type listAcces = [ 'L', 'B', 'A']
  type acess = 'L' | 'B' | 'A'

function SelectAcessSsystem( { list , acess, setAcess} :{ list:  listAcces, acess: acess , setAcess:(acess:acess)=>void}     ){

   return (
    <Select defaultValue={acess} onValueChange={setAcess} >
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Selecione o acesso" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
            {
                list && list.length > 0 &&
                list.map((i)=>(
                  <SelectItem   key={i} value={i} onClick={()=> setAcess(i)} >
                       < span>
                        </span>
                       { i ==='L' &&  ( <>Liberado <IconCircleDashedCheck color="green"/> </> )  }
                       { i ==='B' && ( <>Bloquado <IconCircleDashedLetterX color="red"/></> ) }
                       { i ==='A' && ( <>Avaliação <IconCircleDashedLetterA color="blue" /> </> )} 
                   </SelectItem>
                ))
            }
         
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export function DrawerEditBackup({client, openDrawer , setOpenDrawer}:props) {

    const [loadingSave, setLoadingSave] = useState(false);
  const [visibleAlert, setVisibleAlert] = useState(false);

  //  const { user,  logout }:any = useAuth();

/*
  async function register() {
    try {
      
    // setLoadingSave(true)
      task.priority = Spriority
      task.status = sStatus
       console.log(task)
   const dataUpdate =   {
           title: task.title,
           description: task.description,
           status: task.status,
           priority: task.priority,
          };

      const resultCreateTask = await api.put(`/tasks/${task.id}`,dataUpdate ,{
             headers: {
                 authorization: user.token 
            },
        } 
          )
         
       if (resultCreateTask.status === 200) {
         console.log(resultCreateTask.data);
         setOpenDrawer(false)
         setVisibleAlert(true);
         setTitleResponse('Ok');
         setDescriptionResponse("Task registered sucessfully")
       }
      setLoadingSave(false)
     
     
 
    } catch (e) {
      setLoadingSave(false)
       setOpenDrawer(false)
        setVisibleAlert(true);
        setTitleResponse('Erro');
        setDescriptionResponse("Error registering task")

      console.log(`Erro ao tentar atualiza uma tarefa`, e )
       console.log(task)

    } finally {
       setOpenDrawer(false)
      setLoadingSave(false)    }

  }
*/
  return (
  <>
  
    <Drawer open={openDrawer} >
      <DrawerContent>
        <div className="mx-auto w-[70%]  ">
          <DrawerHeader >
            <DialogTitle>Editar Cliente</DialogTitle>
            <DrawerDescription>Editando Cliente.</DrawerDescription>

          </DrawerHeader>
           {  loadingSave ?
            <div className="grid gap-3 h-70">
              <ThreeDot color="black" />
            </div>
            :

            <>
              <div className="grid gap-3">

                <Label htmlFor="username-1">Status</Label>
                <SelectAcessSsystem  acess={client.acesso} list={['L', 'B','A']} setAcess={(acess)=> { client.acesso = acess} } />

                <DrawerTitle className=" text-start" >Nome Fantasia</DrawerTitle>
                <Input placeholder="Nome Fantasia"
                    defaultValue={client && client.nomeFantasia}
                    disabled={true}
                      //  onChange={(e) => task.title = String(e.target.value) } 

                  //onChange={(e) => setTitle(String(e.target.value))}
                />

          <DrawerTitle className=" text-start" >CNPJ</DrawerTitle>
                      <Input placeholder="Nome Fantasia"
                          defaultValue={client && client.cnpj}
                          disabled={true}
                            //  onChange={(e) => task.title = String(e.target.value) } 

                        //onChange={(e) => setTitle(String(e.target.value))}
                      />
                
              </div>
              <DrawerFooter>
                <Button
          disabled={true}
        //onClick={() => register()}
                 >Executar backup</Button>
                <DrawerClose asChild>
                  <Button 
                  variant="outline" onClick={ ()=> setOpenDrawer(false)}>Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </>
          }
        </div>
      </DrawerContent>

    </Drawer>
    
 
</>


  )
}


 