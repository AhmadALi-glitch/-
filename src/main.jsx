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

      <div className="w-full flex justify-between items-end border-b-[1px] pb-1 border-[#C9DF8A] text-[#C9DF8A]">
        <div className="logo">
          <img width={50} src="src/assets/logo/logo-dark.svg"></img>
        </div>
        <div className="pages flex items-center justify-center gap-5 basis-[50%]">
          <div className="cursor-pointer flex items-center gap-5 basis-[20%] rounded-xl events-nav">
            <Flag size={30} className="text-[#C9DF8A]"/>
            <div>الفعاليات</div>
          </div>
          <div className="flex cursor-pointer items-center gap-5 teams-nav">
            <UsersThree size={30} className="text-[#C9DF8A]"/>
            <div>الفرق</div>
          </div>
          <div className="flex cursor-pointer items-center gap-5 home-nav">
            <House size={30} className="text-[#C9DF8A]"/>
            <div>المنزل</div>
          </div>
        </div>
        <div className="flex cursor-pointer items-center gap-5 profile">
          <UserCircle size={30} className="text-[#C9DF8A]"/>
            <div>صفحتي الشخصية</div>
        </div>
      </div>

      <RouterProvider router={router}/>

    </div>
  </React.StrictMode>,
)
