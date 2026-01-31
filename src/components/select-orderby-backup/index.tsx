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

  type objectValues = { key: string, field:string}
 type values = objectValues[ ];

type props = {
    title?:string,
    placeholder?:string
    values : values,
    defaultValue: string 
    onChange: (value: string) =>void
  }

export function SelectOrderBy( {  defaultValue, onChange, placeholder , values    } :props )  {
  
    return (
    <Select
       defaultValue={defaultValue && defaultValue  }
       onValueChange={(value)=>onChange(value)}
    >
      <SelectTrigger className=" min-w-[100px] md:w-[280px] ">
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
