
'use client'
import React, { createContext , useState, useContext, ReactNode, Children, useEffect  } from "react";

  export  interface AuthUser   {
            nome:string 
            token:string
            codigo:number
        }
    interface AuthContextType{
        isAuthenticated: boolean;
        user:  AuthUser | null 
        setUser: any
        logout: ()=> void;
        loadingAuth:boolean
    }

  const AuthContext = createContext<AuthContextType | undefined > (undefined);


    interface AuthProviderProps { 
        children: ReactNode
    }

export const AuthProvider = ( { children }: AuthProviderProps ) =>{
        const [ user, setUser ] = useState< { nome:string, token:string,codigo:number } | null> (null);
        const [ isAuthenticated, setIsAuthenticated ] = useState(false)
        const [ loadingAuth, setLoadingAuth]  = useState(true);

            const logout = ()=>{
                setIsAuthenticated(false)
                setUser(null)
                  localStorage.removeItem('authUser')
            }

            

 useEffect(()=>{
        const storedUser = localStorage.getItem('authUser');

        if(storedUser)  {
            try{
                setUser(JSON.parse(storedUser));
            }catch(e){
                console.error('Erro ao transformar usuario do localStorage ', e );
                localStorage.removeItem('authUser');
            }
        }
        setLoadingAuth(false);
    },[]);


            const values = { user, setUser, logout, isAuthenticated, loadingAuth}
            return(
                <AuthContext.Provider value={values} > 
                    { children }
                </AuthContext.Provider>

            )
    }

    export const useAuth = ()=>{
        const context = useContext( AuthContext)
        if( context === undefined ){
            throw new Error(" useAuth must be usd within an AuthProvider ");
        }
        return context;
    }


 