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

type props = {
    title?:string,
    placeholder?:string
    values: ['S','N' ],
    defaultValueActive: 'S' | 'N'
    ativos: string 
    setAtivos:React.Dispatch<React.SetStateAction<string>>
  }

export function SelectActiveClient( {  ativos,setAtivos, placeholder , values, defaultValueActive  } :props )  {
  
    return (
    <Select
       defaultValue={ativos && ativos  }
       onValueChange={(v)=>setAtivos(v)}
    >
      <SelectTrigger className="w-[280px]">
        <SelectValue  placeholder={ placeholder && placeholder}   />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          { /*<SelectLabel>North America</SelectLabel> */}

          <SelectItem 
              value={values[0]}
              >
                { values[0] && values[0] === 'S' && 'ativo' }
                <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400 gap-1 ml-1 mr-1 " />

            </SelectItem>
       
           <SelectItem 
            value={values[1]}
               >
             {  values[1] && values[1] === 'N' && 'inativo'  } 
                     <IconCircleXFilled className="fill-orange-700 gap-1 ml-1 mr-1 "   />     

           </SelectItem>

        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
