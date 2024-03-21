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
import { Flag, House, UserCircle, UsersThree } from 'phosphor-react'

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
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <div className="bg-background w-svw h-svh pl-10 pr-10 pt-6">

      <div className="w-full border-b-[3px] border-[#A8BE69] pb-[1px] border-opacity-[0.1] flex justify-between items-center text-[#C9DF8A]">

        <div className="logo">
          <img width={50} src="src/assets/logo/logo-dark.svg"></img>
        </div>

        <div className="pages flex items-center justify-end gap-2 basis-[50%]">

          <div className="group-1 flex border-2 gap-5 border-[#C9DF8A] text-[#333] text-sm font-extrabold pl-2 pr-2 p-1 rounded-[5px] bg-[#C9DF8A]">
            <div className="cursor-pointer bg-[#A8BE69] flex items-center gap-5 basis-[20%] pr-2 pl-2 p-[2px] rounded-[4px] events-nav">
              <Flag size={25}/>
              <div>الفعاليات</div>
            </div>
            <div className="flex cursor-pointer items-center gap-5 teams-nav">
              <UsersThree size={25} />
              {/* <div>الفرق</div> */}
            </div>
            <div className="flex cursor-pointer items-center gap-5 home-nav">
              <House size={25}/>
              {/* <div>المنزل</div> */}
            </div>
          </div>
          
          <div className="group-2 border-2 rounded-[5px] text-sm border-[#C9DF8A] p-[6px]">
            <div className="flex cursor-pointer items-center gap-2 pl-1 pr-1 profile">
              <UserCircle size={25} className="text-[#C9DF8A]"/>
              {/* <div>صفحتي الشخصية</div> */}
            </div>
          </div>

        </div>

      </div>

      <RouterProvider router={router}/>

    </div>
  </React.StrictMode>,
)
