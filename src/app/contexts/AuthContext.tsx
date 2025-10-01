
'use client'
import React, { createContext , useState, useContext, ReactNode, Children, useEffect  } from "react";

    interface AuthContextType{
        isAuthenticated: boolean;
        user: { user_name:string , token:string } | null 
        login: ( user_name: string, token:string) => void;
        logout: ()=> void;
        loadingAuth:boolean
    }

  const AuthContext = createContext<AuthContextType | undefined > (undefined);


    interface AuthProviderProps { 
        children: ReactNode
    }

export const AuthProvider = ( { children }: AuthProviderProps ) =>{
        const [ user, setUser ] = useState< { user_name:string, token:string  } | null> (null);
        const [ isAuthenticated, setIsAuthenticated ] = useState(false)
    const [ loadingAuth, setLoadingAuth]  = useState(false);

            const logout = ()=>{
                setIsAuthenticated(false)
                setUser(null)
                  localStorage.removeItem('authUser')
            }

            const login = ( user_name:string, token:string )=>{
                setIsAuthenticated(true)
                setUser({user_name, token })
              localStorage.setItem('authUser', JSON.stringify({ user_name, token }));  

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


            const values = { user, login, logout, isAuthenticated, loadingAuth}
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


 