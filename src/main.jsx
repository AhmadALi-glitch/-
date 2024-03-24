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
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
