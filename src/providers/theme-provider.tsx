'use client';
    import { ThemeProvider as NextThemeprovider  } from "next-themes";
    import { type ThemeProviderProps  } from "next-themes";

export default function ThemeProvider({ children, ...props }: ThemeProviderProps){

    return <NextThemeprovider {...props} >
        {children}
    </NextThemeprovider>
}