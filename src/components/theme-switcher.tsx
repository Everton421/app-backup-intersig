'use client';

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

export default function ThemeSwitcher(){
    const { setTheme, theme } = useTheme();
    return(
        <div>
            <Button
                    onClick={()=> { 
                        theme === 'light' ?  
                           setTheme('dark')
                            :
                           setTheme('light')
                        } }  
                >
                    {
                        theme === 'light' ? 
                            <Moon  />
                                :
                            <Sun />
                    }
            </Button>     
        </div>
    )
}