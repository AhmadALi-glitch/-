import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import MainPage from './pages/Main'
import NotFoundPage from './pages/NotFound.jsx'
import Frame1Page from './pages/Frame1'
import TeamProfilePage from './pages/TeamProfile'
import Frame5Page from './pages/Frame5'
import AccountProfilePage from './pages/AccountProfile'
import WelcomePage from './pages/Welcome'
import SignupPage from './pages/Signup'

const router = createBrowserRouter([
  {
    path : "/",
    element : <MainPage/>,
    errorElement : <NotFoundPage/>
  },
  {
    path : "/frame1",
    element : <Frame1Page/>
  },
  {
    path : "/frame5",
    element : <Frame5Page/>
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
    path : "/welcomePage",
    element : <WelcomePage/>
  },
  {
    path : "/signup",
    element : <SignupPage/>
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
