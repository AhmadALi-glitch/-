import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Router, RouterProvider, createBrowserRouter } from 'react-router-dom'
import MainPage from './pages/Main'
import NotFoundPage from './pages/NotFound.jsx'
import TeamProfilePage from './pages/TeamProfile'
import AccountProfilePage from './pages/AccountProfile'
import WelcomePage from './pages/Welcome'
import SignupPage from './pages/Signup'
import GuidePage from './pages/Guide'
import EventPage from './pages/Event'
import Teams from './pages/Teams'
import "../app/profile.css"
import "../app/components.css"
import LoadingPage from './pages/loadingPage'
import { ThemeProvider } from './components/theme-provider'
import Login from './pages/login'
import Navbar from './pages/Navbar'
import Demo from './demo'
import App from './pages/App'
import CreateEventPage from './pages/createEvent'

const router = createBrowserRouter([
  {
    path : "/",
    element :
    <App>
      <MainPage/>
    </App>,
    errorElement : <NotFoundPage/>
  },
  {
    path : "/teamProfile",
    element : <App>
      <TeamProfilePage/>
    </App>
  },
  {
    path : "/accountProfile",
    element : <App>
      <AccountProfilePage/>
    </App>
  },
  {
    path : "/welcome",
    element : <App>
      <WelcomePage/>
    </App> 
  },
  {
    path : "/signup",
    element : <App>
      <SignupPage/>
    </App>
  },
  {
    path : "/guide",
    element : <App>
      <GuidePage/>
    </App>
  },
  {
    path : "/event",
    element : <App>
      <EventPage/>
    </App>
  },
  {
    path : "/teams",
    element : <App>
      <Teams />
    </App>
  },
  {
    path: '/loading',
    element : <App>
      <LoadingPage />
    </App>
  },
  {
    path: '/login',
    element : <App>
      <Login />
    </App>
  },
  {
    path: '/create-event',
    element : <App>
      <CreateEventPage />
    </App>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
)
