
import { User, UsersThree } from 'phosphor-react'
import { DropdownMenu, DropdownMenuSeparator ,DropdownMenuContent, DropdownMenuTrigger, DropdownMenuSubContent, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuPortal } from '@radix-ui/react-dropdown-menu'
import { Button } from './components/ui/button'
import { httpClient } from './http'
import { useContext  } from 'react'
import { loadingContext, loadingReducerContext } from "./pages/App"
import { accountContext, accountReducerContext } from './state/account'
import { login } from './service/account'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table'
import { useNavigate } from 'react-router-dom'

export default function Demo() {

    let loadingContextState = useContext(loadingContext)
    let useLoadingContextReducer = useContext(loadingReducerContext)
    let accountStateReducer = useContext(accountReducerContext)
    let navigator = useNavigate()

    const callLogin = (email, password) => {
        useLoadingContextReducer(true)
        login(email, password).then( (result) => {
            console.log(result)
            useLoadingContextReducer(false)
            accountStateReducer(result.data)
        })
    }

    const navigateToEvent = (eventId) => {
        navigator(`/event?event_id=${eventId}`)
    }

    return (
        <div className="logins z-30 flex font-main justify-center dark:bordee-5 gap-3 ">
            <Table>
                <TableCaption className="text-2xl">حسابات تجريبية</TableCaption>
                <TableHeader>
                    <TableRow className="text-2xl font-extrabold">
                        <TableHead className="text-center w-[100px]">الفعالية</TableHead>
                        <TableHead className="text-center w-[100px]">الحساب</TableHead>
                        <TableHead className="text-center w-[100px]">الفريق</TableHead>
                        <TableHead className="text-center w-[100px]">الدور</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="text-center font-medium">
                            <Button onClick={() => navigateToEvent(1)}> 
                                <div className="text text-xl flex justify-start">
                                    هاكاثون رمضان 
                                </div>
                            </Button>
                        </TableCell>
                        <TableCell className="text-center">
                            <Button className="flex items-center gap-2" onClick={() => callLogin('tarek@gmail.com', '111')}>
                                <User size={30}></User>
                                <div className="text text-xl flex justify-start">
                                    طارق العوزة 
                                </div>
                            </Button>
                        </TableCell>
                        <TableCell className="flex justify-center">
                            <Button className="flex items-center gap-2">
                                <UsersThree size={30}></UsersThree>
                                <div className="text text-xl flex justify-start">
                                    لا يوجد 
                                </div>
                            </Button>
                        </TableCell>
                        <TableCell className="text-center text-xl">منظّم الفعالية</TableCell>
                    </TableRow>
                    
                    <TableRow>
                        <TableCell className="text-center font-medium">
                            <Button onClick={() => navigateToEvent(1)}> 
                                <div className="text text-xl flex justify-start">
                                    هاكاثون رمضان 
                                </div>
                            </Button>
                        </TableCell>
                        <TableCell className="text-center">
                            <Button className="flex items-center gap-2" onClick={() => callLogin('ahmad@gmail.com', '111')}>
                                <User size={30}></User>
                                <div className="text text-xl flex justify-start">
                                    أحمد علي 
                                </div>
                            </Button>
                        </TableCell>
                        <TableCell className="flex justify-center">
                            <Button className="flex items-center gap-2">
                                <UsersThree size={30}></UsersThree>
                                <div className="text text-xl flex justify-start">
                                    فرسان البايت
                                </div>
                            </Button>
                        </TableCell>
                        <TableCell className="text-center text-xl">قائد الفريق</TableCell>
                    </TableRow>


                    <TableRow>
                        <TableCell className="text-center font-medium">
                            <Button onClick={() => navigateToEvent(1)}> 
                                <div className="text text-xl flex justify-start">
                                    هاكاثون رمضان 
                                </div>
                            </Button>
                        </TableCell>
                        <TableCell className="text-center">
                            <Button className="flex items-center gap-2" onClick={() => callLogin('abd@gmail.com', '111')}>
                                <User size={30}></User>
                                <div className="text text-xl flex justify-start">
                                    عبد الرحمن
                                </div>
                            </Button>
                        </TableCell>
                        <TableCell className="flex justify-center">
                            <Button className="flex items-center gap-2">
                                <UsersThree size={30}></UsersThree>
                                <div className="text text-xl flex justify-start">
                                    فرسان البايت
                                </div>
                            </Button>
                        </TableCell>
                        <TableCell className="text-center text-xl">عضو في الفريق</TableCell>
                    </TableRow>


                    <TableRow>
                        <TableCell className="text-center font-medium">
                            <Button onClick={() => navigateToEvent(1)}> 
                                <div className="text text-xl flex justify-start">
                                    هاكاثون رمضان 
                                </div>
                            </Button>
                        </TableCell>
                        <TableCell className="text-center">
                            <Button className="flex items-center gap-2" onClick={() => callLogin('adam@gmail.com', '111')}>
                                <User size={30}></User>
                                <div className="text text-xl flex justify-start">
                                    آدم محمود
                                </div>
                            </Button>
                        </TableCell>
                        <TableCell className="flex justify-center">
                            <Button className="flex items-center gap-2">
                                <UsersThree size={30}></UsersThree>
                                <div className="text text-xl flex justify-start">
                                    مبرمجون الشرق الأوسط
                                </div>
                            </Button>
                        </TableCell>
                        <TableCell className="text-center text-xl">قائد الفريق</TableCell>
                    </TableRow>
                    
                    <TableRow>
                        <TableCell className="text-center font-medium">
                            <Button onClick={() => navigateToEvent(1)}> 
                                <div className="text text-xl flex justify-start">
                                    هاكاثون رمضان 
                                </div>
                            </Button>
                        </TableCell>
                        <TableCell className="text-center">
                            <Button className="flex items-center gap-2" onClick={() => callLogin('mohammed@gmail.com', '111')}>
                                <User size={30}></User>
                                <div className="text text-xl flex justify-start">
                                    محمد عبدو
                                </div>
                            </Button>
                        </TableCell>
                        <TableCell className="flex justify-center">
                            <Button className="flex items-center gap-2">
                                <UsersThree size={30}></UsersThree>
                                <div className="text text-xl flex justify-start">
                                    مبرمجون الشرق الأوسط
                                </div>
                            </Button>
                        </TableCell>
                        <TableCell className="text-center text-xl">عضو في الفريق</TableCell>
                    </TableRow>

                </TableBody>
            </Table>

           
            {/* 
            <Button }>
                <div className="text text-xl w-full flex justify-start">
                login as Byte Kights Team Leader : Ahmad Ali
                </div>
            </Button>
            <Button >
                <div className="text text-xl w-full flex justify-start">
                login as Byte Kights Member: Abdelrhman Khaled
                </div>
            </Button> */}
        </div>
    )

}
