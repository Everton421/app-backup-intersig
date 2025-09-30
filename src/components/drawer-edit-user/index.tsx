"use client"

import { useState } from "react"
import { FolderPlus, } from "lucide-react"

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
import { Input } from "../ui/input"

import { ThreeDot } from 'react-loading-indicators'
import { DialogTitle } from "../ui/dialog"


type usuario = {
       id: number,
       email_user: string,
       nome_user:string
        senha?:string
      }

type props = {
usuario: usuario,
openDrawer:boolean, 
setOpenDrawer : (value:boolean)=>void
}


export function DrawerEditUser({usuario, openDrawer , setOpenDrawer}:props) {

    const [loadingSave, setLoadingSave] = useState(false);
     const [visibleAlert, setVisibleAlert] = useState(false);

  //  const { user,  logout }:any = useAuth();

  async function save (){
      try{
        
      }catch(e){

      }
  }
 
 
  return (
  <>
    <Drawer open={openDrawer} >
      <DrawerContent>
        <div className="mx-auto w-[70%]  ">
          <DrawerHeader >
            <DialogTitle>Editar Usuário</DialogTitle>
            <DrawerDescription>Editando Usuário.</DrawerDescription>

          </DrawerHeader>
           {  loadingSave ?
            <div className="grid gap-3 h-70">
              <ThreeDot color="black" />
            </div>
            :

            <>
              <div className="grid gap-3">

                <DrawerTitle className=" text-start" >Nome  </DrawerTitle>
                <Input placeholder="Nome Fantasia"
                    defaultValue={usuario && usuario.nome_user}
                   onChange={(e) => { usuario.nome_user =   String(e.target.value) }}
                />

               <DrawerTitle className=" text-start" >E-mail</DrawerTitle>
                      <Input placeholder="Nome Fantasia"
                          defaultValue={usuario && usuario.email_user}
                        onChange={(e) =>  { usuario.email_user = String(e.target.value) } }
                      />
               <DrawerTitle className=" text-start" >Senha</DrawerTitle>
                      <Input 
                        placeholder=""
                        type="password"
                        onChange={(e) =>  { usuario.senha = String(e.target.value) } }
                      />
                
              </div>
              <DrawerFooter>
                <Button
            disabled={true}
          onClick={() => save()}
                 >Salvar</Button>
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
    {

      /* <Alert
            description={descriptionMsgTestConnection}
            setVisible={setVisibleAlertTestConnection}
            title={titleMsgTestConnection}
            visible={visibleAlertTestConnection}
          />
    */}
 
</>


  )
}


 