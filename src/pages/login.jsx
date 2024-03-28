

import { DropdownMenu, DropdownMenuSeparator ,DropdownMenuContent, DropdownMenuTrigger, DropdownMenuGroup, DropdownMenuSubContent, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuPortal, DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import { Button } from '../components/ui/button'
import { UsersThree} from 'phosphor-react'
import { httpClient } from '@/http'
import Demo from '@/demo'
import { Tabs,TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import SignupPage from './Signup'

export default function Login() {

    const login = (email, password) => {

        httpClient.post("http://localhost:3000/api/v1/account/login", {
          email: email,
          password: password
        }, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })

    }

    return (
        <>
            <div className="wrapper">
                <div className="pt-10 content">
                        <Demo></Demo>
                </div>
            </div>
        </>
    )

}