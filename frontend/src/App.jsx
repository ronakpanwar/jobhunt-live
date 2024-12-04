import { useState } from 'react'
import Navbar from './components/shared/Navbar.jsx'
import Home from './components/Home.jsx';
import Signup from './components/auth/Signup.jsx'
import Login from './components/auth/Login.jsx'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import Jobs from './components/Jobs.jsx';
import Browse from './components/Browse.jsx';
import Profile from './components/Profile.jsx';
import JobDetails from './components/JobDetails.jsx';
import Companies from './components/Admin/Companies.jsx';
import CreateCompany from './components/Admin/CreateCompany.jsx';
import SetUpCompany from './components/Admin/SetUpCompany.jsx';
import AdminJobs from './components/Admin/AdminJobs.jsx';
import PostJob from './components/Admin/PostJob.jsx';
import Applicents from './components/Admin/Applicents.jsx';

const appRoute = createBrowserRouter([
{
  path:'/',
  element:<Home/>
},
{
  path:'/login',
  element:<Login/>
},
{
  path:'/signup',
  element:<Signup/>
},
{
  path:'/jobs',
  element:<Jobs/>
},
{
  path:'/browse',
  element:<Browse/>
},
{
  path:'/profile',
  element:<Profile/>
},
{
  path:'/jobDetails/:id',
  element:<JobDetails/>
},
// for recruiters

{
  path:'/admin/companies',
  element:<Companies/>
},
{
  path:'/admin/companies/create',
  element:<CreateCompany/>
},

{
  path:'/admin/companies/:id',
  element:<SetUpCompany/>
},
{
  path:'/admin/jobs',
  element:<AdminJobs/>
},
{
  path:'/admin/jobs/create',
  element:<PostJob/>
},
{
  path:'/admin/jobs/:id/applicents',
  element:<Applicents/>
},

])

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <RouterProvider router={appRoute}/>
    </>
  )
}

export default App
