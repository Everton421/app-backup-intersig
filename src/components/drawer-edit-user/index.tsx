"use client"

import { useEffect, useState } from "react"
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
import { useAuth } from "@/app/contexts/AuthContext"
import { configApi } from "@/app/services/api"
import { Alert } from "../alert/alert"
import { useRouter } from "next/navigation"


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
     const [ visibleAlert, setVisibleAlert] = useState(false);
     const [ descriptionMsg, setDescriptionMsg ] = useState('');
     const [ titleMsg, setTiteMsg ] = useState('');
  
     const api = configApi()
     const router = useRouter()

    const { user,  logout }:any = useAuth();


   useEffect(()=>{
      if(!user && !user.token ){
        router.push('/login')
       }
    },[user])

  async function save (){

      setLoadingSave(true)
      try{
          const result = await api.put(`/usuarios/${usuario.id}`,{
                "email": usuario.email_user,
                "senha": usuario.senha,
                "nome": usuario.nome_user
          },{
              headers:{ 'Authorization': user.token},
          }
        );
        console.log(result)
            if( result.status === 201 || result.status === 200 ){
           setLoadingSave(false)
                setDescriptionMsg(`Usuário registrado com sucesso!`)
                setTiteMsg("Ok!")
               setVisibleAlert(true)
            }
      }catch(e){
        console.log("Erro: ", e)
         setLoadingSave(false)
                setDescriptionMsg("")
                setTiteMsg(`ocorreu um erro ao tentar registrar o usuario!`)
               setVisibleAlert(true)
      }finally{
          setLoadingSave(false)
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
              <ThreeDot color="black" />
            :
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
               }
                   
              <DrawerFooter>
                <Button
                onClick={() => save()}
                 >Salvar</Button>
                <DrawerClose asChild>
                  <Button 
                  variant="outline" onClick={ ()=> setOpenDrawer(false)}>Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
         
         
        </div>
      </DrawerContent>

    </Drawer>
    {

       <Alert
            description={descriptionMsg}
            setVisible={setVisibleAlert}
            title={titleMsg}
            visible={visibleAlert}
          />
     }
 

</>


  )
}


 