import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Dispatch, SetStateAction, useState } from "react"
import { SelectActiveClient } from "../select-active-client"
import { SelectConfiguradoEfetuarBackup } from "../select-configurado/select-configurado"
import { SelectOrderBy } from "../select-orderby-backup"
import { SelectGroupBy } from "../select-groupby-backup"
import { filterRequest } from "@/app/backups/page"

   type typeObjectGrouperBy = { key: string, field:string}[ ];

   type valuesGroupBy =  'host'|'codigo' 

   type typeObjectOrderBy = { key: string, field:string}[ ];
   type valuesOrderBy =  'nomeFantasia'|'data_ultimo_backup'|'hora_agenda_backup'|'codigo'
   type activeClient = 'S'|'N'
    type configuredExecBackup = 'S'|'N'


 

type props = {
open: boolean
setOpen:Dispatch<SetStateAction<boolean>>,
filterRequest:filterRequest
updateFilter: (key: keyof filterRequest, value: filterRequest[keyof filterRequest])=>void
}

export function SheetfiltroBackup({ open, setOpen ,filterRequest, updateFilter}: props) {

const [ valuesOrderBy ] = useState<typeObjectOrderBy>([ 
  {field:'codigo', key:'codigo'},
  {field:'nome fantasia', key:'nomeFantasia'},
  {field:'data ultimo backup', key:'data_ultimo_backup'},
  {field:'hora agenda backup', key:'hora_agenda_backup'} 
]) 

const [ valuesGroupBy  ] = useState<typeObjectGrouperBy>([
{ field:'codigo', key:'codigo' },
{field:'host banco de dados', key:'host'},
{field:'nome banco de dados', key:'nomeBanco'}

])

  return (
    <Sheet open={open} >
      <SheetTrigger asChild>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>filtros</SheetTitle>
          <SheetDescription>
           selecione um filtro
          </SheetDescription>
        </SheetHeader>
          <div className=" flex-col flex items-center justify-center" >

           <div className=" mt-3 flex-col flex items-center justify-center border-1 w-[90%] rounded-md p-3" >
             <div className=" mt-3">
              <Label className="">  Ativos/Inativos</Label>
              <SelectActiveClient
                ativos={filterRequest.ativo}
                onChange={(value)=>updateFilter( "ativo", value  )}
                values={['S','N']}
                placeholder="clientes"
                defaultValueActive="S"    
               />
               </div>

              <div className="flex flex-col mt-3 items-center justify-center ">
                <Label className="mb-1 text-center">  Configurados para efetuar backup</Label>
                <SelectConfiguradoEfetuarBackup
                  configurado={filterRequest.efetuar_backup}
                  list={['S','N']}
                  onChange={(value)=>updateFilter("efetuar_backup", value)}
                />
               </div>

           </div>

           <div className=" mt-3 flex-col flex items-center justify-center border-1 w-[90%] rounded-md p-3" >
            <Label className="m-3">  Ordernar por:</Label>

            <SelectOrderBy
              defaultValue={filterRequest.orderBy}
              onChange={ (value)=> updateFilter("orderBy", value)}
              values={valuesOrderBy}
              />
            </div>
             <div className=" mt-3 flex-col flex items-center justify-center border-1 w-[90%] rounded-md p-3" >
            <Label className="m-3">  Agrupar por:</Label>

            <SelectGroupBy
              defaultValue={filterRequest.groupBy}
              onChange={ (value)=> updateFilter("groupBy", value)}
              values={valuesGroupBy}
              />
            </div>
           </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button  onClick={()=> setOpen(false )}>Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
