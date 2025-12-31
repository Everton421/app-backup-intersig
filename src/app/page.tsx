'use client'
import { useEffect, useState } from "react"
import { useAuth } from "./contexts/AuthContext"
import { useTheme } from "next-themes";
import { ThreeDot } from "react-loading-indicators";
import { useRouter } from "next/navigation";

export default function Page(){
    const { user, loadingAuth} = useAuth();
    const { theme } = useTheme();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

        
    
        useEffect(()=>{

            if(loadingAuth ){
                setLoading(true);
            }else{

                if(user && user.token && user.codigo){
                    router.push('/backups')
                }else{
                    router.push('/login')
                }
            }
        }, [ user, loadingAuth])
 
        

        return (
          loading &&
         <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
                <ThreeDot
                    size="large"
                    color={ theme  === 'dark' ? '#FFF' : "#000"}
                />

            </div>
        )

}