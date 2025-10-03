import {  IconAlertCircleFilled, IconCircleCheckFilled, IconCircleXFilled, IconClockHour4, IconSettingsCheck, IconSettingsX } from "@tabler/icons-react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

type listaAcesso = ['B', 'L' ,'A']
type acesso = 'L'| 'B' | 'A' 

type props=
{ 
    list:  listaAcesso, 
    acesso: acesso , 
    setAcesso:(acess:acesso)=>void
}

export function SelectAcessoSistema( { list , acesso, setAcesso}:props       ){

   return (
    <Select defaultValue={acesso} onValueChange={setAcesso} >
      <SelectTrigger className="p-3" >
        <SelectValue placeholder="Selecione o acesso" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
            {
                list && list.length > 0 &&
                list.map((i)=>(
                  <SelectItem   key={i} value={i} onClick={()=> setAcesso(i)} >
                       < span>
                        </span>
                       { i ==='L' &&  ( <> Liberado <IconCircleCheckFilled color="green"/> </> )  }
                       { i ==='B' && ( <> Bloqueado <IconCircleXFilled color="red"/></> ) }
                       { i ==='A' && ( <> Avaliacao <IconAlertCircleFilled className="fill-orange-700 gap-1 " /></> ) }
                            

                   </SelectItem>
                ))
            }
         
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}