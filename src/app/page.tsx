'use client'
import Image from "next/image";
import { useAuth } from "./contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const {isAuthenticated, login, logout,loadingAuth, user  } = useAuth();

  const router = useRouter();

  useEffect(() => {
      if (!loadingAuth) {
        if (!user) {
          router.push('/login'); // Redireciona para a página de login (ajuste se for outra)
        }
    }
  }, [user, loadingAuth, router]);

 
   if(isAuthenticated && user){
    router.push('/backups')
   }

}
