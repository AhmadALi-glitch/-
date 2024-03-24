import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import MainPage from './pages/Main'
import NotFoundPage from './pages/NotFound.jsx'
import TeamProfilePage from './pages/TeamProfile'
import AccountProfilePage from './pages/AccountProfile'
import WelcomePage from './pages/Welcome'
import SignupPage from './pages/Signup'
import GuidePage from './pages/Guide'
import EventPage from './pages/Event'
import "../app/profile.css"
import "../app/components.css"
import { Flag, House, UserCircle, UsersThree } from 'phosphor-react'
import LoadingPage from './pages/loadingPage'

import { DropdownMenu, DropdownMenuSeparator ,DropdownMenuContent, DropdownMenuTrigger, DropdownMenuGroup, DropdownMenuSubContent, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuPortal, DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import { Button } from './components/ui/button'

import { ThemeProvider } from './components/theme-provider'
import { useTheme } from './components/theme-provider'
import { httpClient } from './http'
import Login from './pages/login'
import Navbar from './pages/Navbar'


const router = createBrowserRouter([
  {
    path : "/",
    element : <MainPage/>,
    errorElement : <NotFoundPage/>
  },
  {
    path : "/teamProfile",
    element : <TeamProfilePage/>
  },
  {
    path : "/accountProfile",
    element : <AccountProfilePage/>
  },
  {
    path : "/welcome",
    element : <WelcomePage/>
  },
  {
    path : "/signup",
    element : <SignupPage/>
  },
  {
    path : "/guide",
    element : <GuidePage/>
  },
  {
    path : "/event",
    element : <EventPage/>
  },
  {
    path: '/loading',
    element : <LoadingPage />
  },
  {
    path: '/login',
    element : <Login />
  }
])


const login = (email, password) => {

  httpClient.post("http://localhost:3000/api/v1/account/login", {
    email: email,
    password: password
  }, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }).then(console.log)

}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='emerald-theme'>

      <div className="bg-background flex flex-col w-svw h-svh pl-10 pr-10 pt-6 font-main overflow-auto">

        <div className="w-full  border-b-[3px] border-[#A8BE69] pb-[1px] border-opacity-[0.1] flex justify-between items-center gap-2 text-[#C9DF8A]">

          <div className="logo basis-[95%]">
            <img width={50} src="src/assets/logo/logo-dark.svg"></img>
          </div>


          <div className="logins z-30 flex justify-center dark:bordee-5 gap-3 ">
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
          </div>

          <Navbar />

        </div>

        <div className="page basis-[100%]">
          <RouterProvider router={router}/>
        </div>

      </div>
   
    </ThemeProvider>
  </React.StrictMode>
)
