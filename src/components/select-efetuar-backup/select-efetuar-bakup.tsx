
type listEfetuarBackup = ['S', 'N']
type efetuarBackup = 'S'| 'N' 

type props=
{ 
    list:  listEfetuarBackup, 
    efetuarBackup: efetuarBackup , 
    setAcess:(acess:efetuarBackup)=>void
}

function selectEfetuarBackup( { list , efetuarBackup, setAcess}:props       ){

   return (
    <Select defaultValue={acess} onValueChange={setAcess} >
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Selecione o acesso" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
            {
                list && list.length > 0 &&
                list.map((i)=>(
                  <SelectItem   key={i} value={i} onClick={()=> setAcess(i)} >
                       < span>
                        </span>
                       { i ==='L' &&  ( <>Liberado <IconCircleDashedCheck color="green"/> </> )  }
                       { i ==='B' && ( <>Bloquado <IconCircleDashedLetterX color="red"/></> ) }
                       { i ==='A' && ( <>Avaliação <IconCircleDashedLetterA color="blue" /> </> )} 
                   </SelectItem>
                ))
            }
         
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}