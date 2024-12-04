import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection.jsx'
import Categery from './Categery'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useAllJobs from '@/hooks/useAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  useAllJobs();
  const {user} = useSelector(store=>store.auth)
  const navigate = useNavigate();
  useEffect(()=>{
     if(user?.role === 'recruiter'){
      navigate('/admin/companies')
     }
  },[])
  return (
    <div>
    <Navbar/>
    <HeroSection/>
    <Categery/>
    <LatestJobs/>
    <Footer/>
    </div>
  )
}

export default Home
