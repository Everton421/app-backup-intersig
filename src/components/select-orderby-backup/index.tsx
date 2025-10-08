import * as React from "react"
 import {
     Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { IconAlertCircleFilled, IconCircleCheckFilled, IconCircleXFilled } from "@tabler/icons-react"

 type values = { key: string, field:string}[ ];

type props = {
    title?:string,
    placeholder?:string
    //values: ['codigo','nomeFantasia', 'data_ultimo_backup', 'hora_agenda_backup' ],
    values : values,
    defaultValue: string 
    setValue:React.Dispatch<React.SetStateAction<string>>
  }

export function SelectOrderBy( {  defaultValue, setValue, placeholder , values    } :props )  {
  
    return (
    <Select
       defaultValue={defaultValue && defaultValue  }
       onValueChange={(v)=>setValue(v)}
    >
      <SelectTrigger className="w-[280px]">
        <SelectValue  placeholder={ placeholder && placeholder}   />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
            {
              values && values.length > 0 && values.map((i)=>(
                <SelectItem 
                value={i.key}
                key={i.key}
               >
                { i.field }
            </SelectItem>
              
              ) )  }
   
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
