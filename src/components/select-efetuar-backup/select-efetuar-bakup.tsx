import { IconCircleDashed, IconCircleDashedCheck, IconCircleDashedLetterX, IconCircleDashedX, IconSettingsCheck, IconSettingsX } from "@tabler/icons-react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

type listEfetuarBackup = ['S', 'N' ]
type efetuarBackup = 'S'| 'N' 

type props=
{ 
    list:  listEfetuarBackup, 
    efetuarBackup: efetuarBackup , 
    setEfetuarBackup:(acess:efetuarBackup)=>void
}

export function SelectEfetuarBackup( { list , efetuarBackup, setEfetuarBackup}:props       ){

   return (
    <Select defaultValue={efetuarBackup} onValueChange={setEfetuarBackup} >
      <SelectTrigger className="p-3 "  >
        <SelectValue placeholder="Selecione o acesso" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
            {
                list && list.length > 0 &&
                list.map((i)=>(
                  <SelectItem   key={i} value={i} onClick={()=> setEfetuarBackup(i)} >
                       < span>
                        </span>
                       { i ==='S' &&  ( <> Efetuar <IconSettingsCheck color="green"/> </> )  }
                       { i ==='N' && ( <> Não Efetuar <IconSettingsX color="red"/></> ) }
                       { i === null ||  !i && ( <> Não Efetuar <IconSettingsX color="red"/></> ) }

                   </SelectItem>
                ))
            }
         
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}