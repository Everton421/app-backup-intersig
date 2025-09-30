"use client"

import { useEffect, useState } from "react"
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
import { api } from "@/app/services/api"
import { Alert } from "../alert/alert"
import { IconSend, IconSettingsCog } from "@tabler/icons-react"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"

type props = {
  client: clientsRequest,
  openDrawer: boolean,
  setOpenDrawer: (value: boolean) => void
}

type listAcces = ['L', 'B', 'A']
type acess = 'L' | 'B' | 'A'



export function DrawerEditBackup({ client, openDrawer, setOpenDrawer }: props) {

  const [loadingSave, setLoadingSave] = useState(false);
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [titleMsg, setTitleMsg] = useState('');
  const [descriptionMsg, setDescriptionMsg] = useState('');
  const [loadingExecBackup, setLoadingExecBackup] = useState(false)
  const [loadingTestConnection, setLoadingTestConnection] = useState(false)

  const [titleMsgTestConnection, setTitleMsgTestConnection] = useState('');
  const [descriptionMsgTestConnection, setDescriptionMsgTestConnection] = useState('');
  const [visibleAlertTestConnection, setVisibleAlertTestConnection] = useState(false);

  async function testConnection() {

    setLoadingTestConnection(true)
    try {
      const result = await api.post(`/conexao/teste`, {
        host: String(client.host),
        porta: String(client.portaMysql),
        usuario: String(client.usuarioMysql),
        senha: String(client.senhaMysql)
      })

      if (result.status === 200) {
        setLoadingTestConnection(false)
        setVisibleAlertTestConnection(true)
        setTitleMsgTestConnection('Ok!')
        setDescriptionMsgTestConnection(result.data.msg)
      }
    } catch (e: any) {
      if (e.status === 500) {
        console.log(e.response.data.message)
        setLoadingTestConnection(false)
        setVisibleAlertTestConnection(true)
        setTitleMsgTestConnection('Erro!')
        setDescriptionMsgTestConnection(e.response.data.message)
      }
      if (e.status === 400) {
        console.log(e.response.data.message)
        setLoadingTestConnection(false)
        setVisibleAlertTestConnection(true)
        setTitleMsgTestConnection('Erro!')
        setDescriptionMsgTestConnection(e.response.data.msg)
      }

    } finally {
      setVisibleAlertTestConnection(true)
      setLoadingTestConnection(false)
    }

  }


  async function execBackup() {
    setLoadingExecBackup(true)
    try {
      const result = await api.post(`/executar-backup/${client.codigo}`)
      if (result.status === 200) {
        setLoadingExecBackup(false)

        setTitleMsg('OK!');
        setDescriptionMsg('Backup iniciado, aguarde alguns minutos até que finalizamos a exportação dos bancos de dados! ')
        setVisibleAlert(true)
      }

    } catch (e: any) {
      setLoadingExecBackup(false)

      setTitleMsg('Erro!');
      setDescriptionMsg(e.response.data)
      setVisibleAlert(true)

    } finally {
      setLoadingExecBackup(false)

    }
  }

  function formatHours(stringHour: string) {
    const horaFormatada = new Date('2023-01-01 ' + stringHour).toLocaleTimeString('pt-br', { hour: '2-digit', minute: '2-digit' })
    return horaFormatada
  }

  async function putBackupCLient() {
    console.log(client)
  }

  //  const { user,  logout }:any = useAuth();


  async function register() {
    /* try {
       
    
 
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
       setLoadingSave(false)
     }
     */

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

                  {/**  ------ Configuração Mysql ------  
                 {
                  loadingTestConnection ?
                  
                    <div className="border-1 p-1 rounded-2xl items-center flex justify-center ">
                      <ThreeDot color="black" />
                    </div>
                   :
                    (
                    <div className="border-1 p-1 rounded-2xl ">
                      <DrawerTitle className="text-gray-500 font-sans text-center text-2xl" >Configuração Mysql</DrawerTitle>

                   </div>
                  )
                 }
                 
           {/** ------------------------------------ */}

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
                            <Button className="w-[60%]" onClick={() => testConnection()} >
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
                                    formatHours(client.hora_agenda_backup) : '00:00'}
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
                  <Button onClick={() => execBackup()} variant={"default"} className="bg-green-600 hover:bg-green-700">
                    Executar backup
                  </Button>
                  <Button
                    onClick={() => putBackupCLient()}
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
      />
      <Alert
        description={descriptionMsgTestConnection}
        setVisible={setVisibleAlertTestConnection}
        title={titleMsgTestConnection}
        visible={visibleAlertTestConnection}
      />

    </>


  )
}


