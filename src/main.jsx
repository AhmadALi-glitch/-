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
import LoadingPage from './pages/loadingPage'
import { ThemeProvider } from './components/theme-provider'
import Login from './pages/login'
import Navbar from './pages/Navbar'
import Demo from './demo'
import App from './pages/App'

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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ThemeProvider defaultTheme='dark' storageKey='emerald-theme'>

          <App>
            
            <div className="bg-background flex flex-col w-svw h-svh pl-10 pr-10 pt-6 font-main overflow-auto">

              <div className="w-full border-b-[3px] border-[#A8BE69] pb-[1px] border-opacity-[0.1] flex justify-between items-center gap-2 text-[#C9DF8A]">

                <div className="logo basis-[95%]">
                    <img width={50} src="src/assets/logo/logo-dark.svg"></img>
                </div>


                <Demo></Demo>

                <Navbar />

              </div>

              <div className="page basis-[100%]">
                <RouterProvider router={router}/>
              </div>

            </div>

          </App>

      </ThemeProvider>
  </React.StrictMode>
)
