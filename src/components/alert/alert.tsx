import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle   } from "../ui/alert-dialog";

type props = { 
    title:string,
    description:string,
    setVisible:(i:boolean)=>void,
     visible:boolean
}
export function Alert({ title, description,  setVisible,visible }: props ){
        return(
      <AlertDialog open={visible} onOpenChange={()=>{}}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle> {title}</AlertDialogTitle>
                <AlertDialogDescription>
                {description}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                
                <AlertDialogAction onClick={()=> setVisible(false)} >Ok</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

        )
}