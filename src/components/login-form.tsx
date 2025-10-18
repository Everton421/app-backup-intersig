'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { configApi } from "@/app/services/api"
import { useActionState, useState } from "react"
import { useAuth } from "@/app/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { ThreeDot } from "react-loading-indicators"

  const api = configApi();

export function LoginForm({  className, ...props }: React.ComponentProps<"div">) {

const [ email, setEmail ] = useState<string>('');
const [ senha, setSenha ] = useState<string>('');
const [ msg, setMsg ] = useState<{erro:boolean, msg:string }>()
const [ loading, setLoading ] = useState(false);
  const {   login } =  useAuth();
  
  const router = useRouter();

  async function loginfunction(){

    if(!email || email === '' || email === undefined){
      setMsg({ erro:true, msg:'nenhum email informado!'})
      return
    }
    if(!senha || senha === ''){
      setMsg({ erro:true, msg:'nenhuma senha informada!'})
      return
    }
    
    try{
      setLoading(true)
      const result = await api.post('/login', { email:email, senha:senha}) 
        if(result.status === 200 ){
          setLoading(false)
            login( email, result.data.token)
            router.push('/backups')
          }
        console.log(result.data)
    }catch(e:any){
          setLoading(false) 
 
        console.log("Erro no login", e )
        if(e.response.status === 500 ){
         setMsg({ erro:true, msg:`Erro interno no servidor!`})
        } 
        if(e.response.status === 400 && e.response.data.msg ){
         setMsg({ erro:true, msg:`${e.response.data.msg}`})
        }
      }finally{
          setLoading(false)
         setMsg(undefined)

      }
  
    } 

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
     {  loading ? 
    <div className="flex items-center justify-center">
      <ThreeDot color='black' size='large' /> 
    </div>
      
      : 
      <Card>
        <CardHeader>
          <CardTitle > Login to your account</CardTitle>
          {
            msg && msg?.erro &&  msg?.msg && 
          <CardTitle className=" text-center text-red-500"> { msg?.msg }</CardTitle>
          }
  
        </CardHeader>
        <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={(e)=> setEmail( String(e.target.value))}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                
                </div>
                <Input 
                id="password" 
                type="password" required
                  onChange={(e)=> setSenha( String(e.target.value))}
                
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full"
                  onClick={()=> loginfunction()}
                >
                  Login
                </Button>
        
              </div>
            </div>
         
        </CardContent>
      </Card>
  }
    </div>
  )
}
