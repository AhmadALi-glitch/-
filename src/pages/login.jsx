

import { DropdownMenu, DropdownMenuSeparator ,DropdownMenuContent, DropdownMenuTrigger, DropdownMenuGroup, DropdownMenuSubContent, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuPortal, DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import { Button } from '../components/ui/button'
import {UsersThree} from 'phosphor-react'
import { httpClient } from '@/http'

export default function Login() {

    const login = (email, password) => {

        httpClient.post("http://localhost:3000/api/v1/account/login", {
          email: email,
          password: password
        }, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }).then((result) => {
            localStorage.setItem("user", result)
        })
      
    }

    return (
        <>
            <DropdownMenu>

                <DropdownMenuTrigger className='p-2' asChild>
                <Button className="p-2">
                    <div className="change-user text-xl">Change User</div>
                </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className='flex gap-2 w-full text-xl font-main p-1 flex-col' sideOffset={15}>

                    <DropdownMenuSub>

                    <DropdownMenuSubTrigger className='flex items-center gap-2'>
                        <UsersThree size={30}></UsersThree>
                        <Button className="w-full" onClick={() => login(1)}>
                            <div className="text font-main text-xl">
                            Event : Hackathon Of Ramadan 
                            </div>
                        </Button>
                    </DropdownMenuSubTrigger>

                    <DropdownMenuPortal>
                        <DropdownMenuSubContent className="flex z-40 flex-col gap-2 bg-primary rounded-xl " sideOffset={10}>
                            <Button onClick={() => login('tarek@gmail.com', '111')}>
                            <div className="text text-xl w-full flex justify-start">
                                login as Organizer : Tarek Alouzey
                            </div>
                            </Button>
                            <Button onClick={() => login(2)}>
                            <div className="text text-xl w-full flex justify-start">
                                login as Byte Kights Team Leader : Ahmad Ali
                            </div>
                            </Button>
                            <Button onClick={() => login(2)}>
                            <div className="text text-xl w-full flex justify-start">
                                login as Byte Kights Member: Abdelrhman Khaled
                            </div>
                            </Button>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                    
                    </DropdownMenuSub>
                    <DropdownMenuSeparator className='bg-primary text-primary h-[1px]'></DropdownMenuSeparator>
                    <DropdownMenuSub>

                    <DropdownMenuSubTrigger className='flex items-center gap-2'>
                        <UsersThree size={30}></UsersThree>
                        <Button className="w-full" onClick={() => login(1)}>
                            <div className="text text-xl">
                            Writing Marathon
                            </div>
                        </Button>
                    </DropdownMenuSubTrigger>
                    
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent className="text-2xl z-40 flex flex-col gap-2 bg-primary rounded-xl " sideOffset={10}>
                            <Button onClick={() => login(2)}>
                            <div className="text text-xl w-full flex justify-start">
                                login as organizer : Ahmad Ali
                            </div>
                            </Button>
                            <Button onClick={() => login(2)}>
                            <div className="text text-xl w-full flex justify-start">
                                login as RomanWritersTeam Leader : Mohammed Mansour
                            </div>
                            </Button>
                            <Button onClick={() => login(2)}>
                            <div className="text text-xl w-full flex justify-start">
                                login as RomanWritersTeam member : Mahmoud Adam
                            </div>
                            </Button>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>

                    </DropdownMenuSub>

                </DropdownMenuContent>
                </DropdownMenu>
        </>
    )

}