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

                if(user && user.token){
                    router.push('/backups')
                }else{
                    router.push('/login')
                }
            }
    
        },[])

        return (
            loading &&
            <div className=" flex w-full items-center justify-between">

                <ThreeDot
                    size="large"
                    color={ theme  === 'dark' ? '#FFF' : "#000"}
                />

            </div>
        )

}