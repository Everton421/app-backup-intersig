"use client"

import { Dispatch, SetStateAction, useEffect, useState } from "react"
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
import { SelectEfetuarBackup } from "../select-efetuar-backup/select-efetuar-bakup"
import { configApi } from "@/app/services/api"
import { Alert } from "../alert/alert"
import { IconSend, IconSettingsCog } from "@tabler/icons-react"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { utils } from "./utils/functions"
import { useAuth } from "@/app/contexts/AuthContext"

type props = {
  client: clientsRequest,
  openDrawer: boolean,
  setOpenDrawer: Dispatch<SetStateAction<boolean>>
}
 
export function DrawerEditBackup({ client, openDrawer, setOpenDrawer }: props) {

  const api = configApi();
    const { user  } = useAuth();

  const [loadingSave, setLoadingSave] = useState(false);
  const [visibleAlert, setVisibleAlert] = useState(false);

  const [visibleAlertConnection, setVisibleAlertConnection] = useState(false);

  const [titleMsg, setTitleMsg] = useState('');
  const [descriptionMsg, setDescriptionMsg] = useState('');
  const [loadingExecBackup, setLoadingExecBackup] = useState(false)
  const [loadingTestConnection, setLoadingTestConnection] = useState(false)

  const utilsFunctions = utils();

  type dataUpdate =
     {
      hora_agenda_backup? : string,
      efetuar_backup? :  'S' | 'N',
      senhaMysql? : string,
      portaMysql? : string | number,
      usuarioMysql? : string,
      acesso? :  'L' | 'A' | 'B'
    }

 


  function formatHours(stringHour: string) {
    const horaFormatada = new Date('2023-01-01 ' + stringHour).toLocaleTimeString('pt-br', { hour: '2-digit', minute: '2-digit' })
    return horaFormatada
  }

  function patch(){
   
    if(!client.usuarioMysql || client.usuarioMysql === ''){
        setVisibleAlert(true);
        setTitleMsg('Erro');
        setDescriptionMsg("É necessario informar o usuario do mysql")
      return   
    }

    const dataPatch:dataUpdate = {
        efetuar_backup: client.efetuar_backup,
        hora_agenda_backup: client.hora_agenda_backup || '08:00',
        portaMysql: String(client.portaMysql) ||  3306 ,
        senhaMysql: client.senhaMysql || '',
        usuarioMysql: client.usuarioMysql 
    }
     console.log(dataPatch)
    
    utilsFunctions.patchtBackupCLient(
          {   setDescriptionResponse: setDescriptionMsg,
              setLoadingSave:setLoadingSave ,
              setTitleResponse: setTitleMsg,
              setVisibleAlert: setVisibleAlert,
            },
            dataPatch,
             client.codigo 
          )  
          
    }

 function backup(){
    utilsFunctions.execBackup(client.codigo, 
      {
        setDescriptionResponse:setDescriptionMsg,
         setLoading: setLoadingSave,
         setTitleResponse: setTitleMsg,
         setVisibleAlert: setVisibleAlert, 
       }
    )
 }
 

 function connection(){
  utilsFunctions.testConnection(client,{
    setDescriptionResponse:  setTitleMsg,
    setLoading: setLoadingSave, 
    setTitleResponse:setDescriptionMsg,
    setVisibleAlert: setVisibleAlertConnection,
     setLoadingTestConnection: setLoadingTestConnection
  })
 }

  return (
    <>
      <Drawer open={openDrawer} >
        <DrawerContent>
          <div className="mx-auto w-[70%]  ">
            <DrawerHeader >
              <DialogTitle>Configurações de backups</DialogTitle>
              <DrawerDescription>Editando Configurações de backups do cliente {client.nomeFantasia}</DrawerDescription>

            </DrawerHeader>
            {loadingExecBackup ?
              <div className="grid gap-3 h-70">
                <ThreeDot color="black" />
              </div>
              :
              <>
                <div className="grid gap-3  ">
          
                  {
                    loadingTestConnection ?
                      <div className="border-1 p-1 rounded-2xl items-center flex justify-center ">
                        <ThreeDot color="black" />
                      </div>
                      :
                      <Card >
                        <CardHeader>
                          <CardTitle className="text-center font-sans ">Configuração Mysql</CardTitle>
                        </CardHeader>
                        <CardContent >


                          <div className="flex justify-between">
                            <div>
                              <DrawerTitle className=" text-start" >Host</DrawerTitle>
                              <Input placeholder="Host"
                                defaultValue={client && client.host}
                                onChange={(e) => { client.host = e.target.value }}
                              />
                            </div>
                            <div>
                              <DrawerTitle className=" text-start" >Usuário</DrawerTitle>
                              <Input placeholder="Usuário"
                                defaultValue={client && String(client.usuarioMysql)}
                                onChange={(e) => client.usuarioMysql = String(e.target.value)}
                              />
                            </div>
                            <div >
                              <DrawerTitle className=" text-start" >Senha</DrawerTitle>
                              <Input placeholder="Senha"
                                //type="password"
                                defaultValue={client && String(client.senhaMysql)}
                                onChange={(e) => client.senhaMysql = String(e.target.value)}
                              />
                            </div>
                            <div>
                              <DrawerTitle className=" text-start" >Porta</DrawerTitle>
                              <Input placeholder="Host"
                                defaultValue={client && String(client.portaMysql)}
                                onChange={(e) => client.portaMysql = String(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="items-center flex justify-center m-5" >
                            <Button className="w-[60%]" onClick={() => connection()} >
                              Testar Conexão
                            </Button>
                          </div>
                          <div className="items-center flex justify-between">
                            <div>
                              <Label htmlFor="username-1" className="m-1">Efetuar backup </Label>
                              <SelectEfetuarBackup efetuarBackup={client.efetuar_backup} list={['S', 'N']} setEfetuarBackup={(i) => { client.efetuar_backup = i }} />
                            </div>
                            <div>
                              <Label htmlFor="username-1" className="m-1">Horario backup </Label>
                              <Input placeholder="Horario para efetuar backup"
                                type="time"
                                defaultValue={
                                  client && client.hora_agenda_backup &&
                                    client.hora_agenda_backup != null ?
                                    formatHours(client.hora_agenda_backup) : '00:00'
                                  }
                                  onChange={(e)=>  client.hora_agenda_backup = e.target.value+':00' }
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                  }

                  <div className="flex justify-between">


                  </div>
                </div>
                <DrawerFooter>
                  <Button onClick={() => backup()} variant={"default"} className="bg-green-600 hover:bg-green-700">
                    Executar backup
                  </Button>
                  <Button
                    onClick={() => patch()}
                  >
                    Salvar Configurações
                  </Button>
                  <DrawerClose asChild>
                    <Button
                      variant="outline" onClick={() => setOpenDrawer(false)}>Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </>
            }
          </div>
        </DrawerContent>

      </Drawer>
      <Alert
        description={descriptionMsg}
        setVisible={setVisibleAlert}
        title={titleMsg}
        visible={visibleAlert}
        closeDrawer={setOpenDrawer}
      />
  <Alert
        description={descriptionMsg}
        setVisible={setVisibleAlertConnection}
        title={titleMsg}
        visible={visibleAlertConnection}
      />
 

    </>


  )
}


