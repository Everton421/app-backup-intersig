'use client'
import Image from "next/image";
import { useAuth } from "./contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const {isAuthenticated, login, logout, user  } = useAuth();


  const router = useRouter();

   if(!user){
    router.push('/login')
   }
   if(isAuthenticated){
    router.push('/backups')
   }
}
