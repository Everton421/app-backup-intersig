import { Dispatch, SetStateAction } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle   } from "../ui/alert-dialog";

type props = { 
    title:string,
    description:string,
    setVisible:(i:boolean)=>void,
     visible:boolean
     closeDrawer?: Dispatch<SetStateAction<boolean>>
}
export function Alert({ title, description,  setVisible, visible, closeDrawer }: props ){
  function click(){
setVisible(false) 
 closeDrawer && closeDrawer(false)
  }
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
                
                <AlertDialogAction onClick={()=>  click() } >Ok</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

        )
}