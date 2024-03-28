
import { UsersThree } from 'phosphor-react'
import { DropdownMenu, DropdownMenuSeparator ,DropdownMenuContent, DropdownMenuTrigger, DropdownMenuSubContent, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuPortal } from '@radix-ui/react-dropdown-menu'
import { Button } from './components/ui/button'
import { httpClient } from './http'
import { useContext  } from 'react'
import { loadingContext, loadingReducerContext } from "./pages/App"
import { accountContext, accountReducerContext } from './state/account'
import { login } from './service/account'

export default function Demo() {

    let loadingContextState = useContext(loadingContext)
    let useLoadingContextReducer = useContext(loadingReducerContext)
    let accountStateReducer = useContext(accountReducerContext)

    const callLogin = (email, password) => {
        useLoadingContextReducer(true)
        login(email, password).then( (result) => {
            console.log(result)
            useLoadingContextReducer(false)
            accountStateReducer(result.data)
        })
    }

    const navigateToEvent = (eventId) => {
        window.location.replace(`event?event_id=${eventId}`)
    }

    return (
        <div className="logins z-30 flex justify-center dark:bordee-5 gap-3 ">
            <DropdownMenu>

            <DropdownMenuTrigger className='p-2' asChild>
                <Button className="p-2">
                    <div className="change-user text-xl">Demo</div>
                    {/* <div className="lo">loading : {loadingContextState}</div> */}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className='flex gap-2 w-full text-xl font-main p-1 flex-col' sideOffset={15}>

                <DropdownMenuSub>

                    <DropdownMenuSubTrigger className='flex items-center gap-2'>
                        <UsersThree size={30}></UsersThree>
                        <Button className="w-full" onClick={() => navigateToEvent(1)}>
                        <div className="text font-main text-xl">
                            Event : Hackathon Of Ramadan 
                        </div>
                        </Button>
                    </DropdownMenuSubTrigger>

                    <DropdownMenuPortal>
                        <DropdownMenuSubContent className="flex z-40 flex-col gap-2 bg-primary rounded-xl " sideOffset={10}>
                            <Button onClick={() => callLogin('tarek@gmail.com', '111')}>
                                <div className="text text-xl w-full flex justify-start">
                                login as Organizer : Tarek Alouzey
                                </div>
                            </Button>
                            <Button onClick={() => callLogin('ahmad@gmail.com', '111')}>
                                <div className="text text-xl w-full flex justify-start">
                                login as Byte Kights Team Leader : Ahmad Ali
                                </div>
                            </Button>
                            <Button onClick={() => callLogin('abd@gmail.com', '111')}>
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
                        <Button className="w-full" onClick={() => navigateToEvent(1)}>
                        <div className="text text-xl">
                            Writing Marathon
                        </div>
                        </Button>
                    </DropdownMenuSubTrigger>
                      
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent className="text-2xl z-40 flex flex-col gap-2 bg-primary rounded-xl " sideOffset={10}>
                        <Button onClick={() => callLogin('ahmad@gmail.com', '111')}>
                            <div className="text text-xl w-full flex justify-start">
                            login as organizer : Ahmad Ali
                            </div>
                        </Button>
                        <Button onClick={() => callLogin('mohammed@gmail.com', '111')}>
                            <div className="text text-xl w-full flex justify-start">
                            login as RomanWritersTeam Leader : Mohammed Mansour
                            </div>
                        </Button>
                        <Button onClick={() => callLogin('adam@gmail.com')}>
                            <div className="text text-xl w-full flex justify-start">
                            login as RomanWritersTeam member : Adam Mahmoud
                            </div>
                        </Button>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>

                </DropdownMenuSub>

            </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )

}
