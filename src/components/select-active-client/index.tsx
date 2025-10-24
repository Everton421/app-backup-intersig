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

   type activeClient = 'S'|'N'
  
type props = {
    title?:string,
    placeholder?:string
    values: ['S','N' ],
    defaultValueActive: 'S' | 'N'
    ativos: string 
    onChange: (value:activeClient)=> void
  }

export function SelectActiveClient( {  ativos,onChange, placeholder , values, defaultValueActive  } :props )  {
  
    return (
    <Select
       defaultValue={ativos && ativos  }
       onValueChange={(value:activeClient)=>onChange( value)}
    >
      <SelectTrigger className=" min-w-[100px] md:w-[280px] ">
        <SelectValue  placeholder={ placeholder && placeholder}   />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          { /*<SelectLabel>North America</SelectLabel> */}

          <SelectItem 
              value={values[0]}
              >
                { values[0] && values[0] === 'S' && 'ativos' }
                <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400 gap-1 ml-1 mr-1 " />

            </SelectItem>
       
           <SelectItem 
            value={values[1]}
               >
             {  values[1] && values[1] === 'N' && 'inativos'  } 
                     <IconCircleXFilled className="fill-orange-700 gap-1 ml-1 mr-1 "   />     

           </SelectItem>

        </SelectGroup>
      </SelectContent>
    </Select> 
  )
}
