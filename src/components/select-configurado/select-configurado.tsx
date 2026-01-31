import { IconCircleDashed, IconCircleDashedCheck, IconCircleDashedLetterX, IconCircleDashedX, IconSettingsCheck, IconSettingsX } from "@tabler/icons-react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

type listConfigurado = ['S', 'N' ]
type configurado = 'S'| 'N' 

type props=
{ 
    list:  listConfigurado, 
    configurado: configurado , 
    onChange:(value:configurado)=>void
}

export function SelectConfiguradoEfetuarBackup( { list , configurado, onChange}:props       ){

   return (
    <Select 
    defaultValue={configurado}
     onValueChange={(value:configurado)=>onChange(value)} >
      <SelectTrigger className=" min-w-[100px] md:w-[280px] p-2" >
        <SelectValue placeholder="Selecione o acesso" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
            {
                list && list.length > 0 &&
                list.map((i)=>(
                  <SelectItem   key={i} value={i}
                  // onClick={()=> setConfigurado(i)}
                   >
                       < span>
                        </span>
                       { i ==='S' &&  ( <> configurado <IconSettingsCheck color="green"/> </> )  }
                       { i ==='N' && ( <> Não configurado <IconSettingsX color="red"/></> ) }

                   </SelectItem>
                ))
            }
         
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}