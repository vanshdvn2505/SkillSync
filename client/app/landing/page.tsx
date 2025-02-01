'use client'
import React from 'react'
import Hero from './components/Hero'
import { Button } from '@/components/ui/button'
import Navbar from './components/Navbar'
import Features from './components/Features'
import LearningPath from './components/LearningPath'
import Potential from './components/Potential'
import Footer from './components/Footer'

function page() {
  return (
    <>
        <div className='min-h-screen w-full flex flex-col justify-center items-center'>
            <Navbar />
            <Hero />
            <Features />
            <LearningPath />
            <Potential />
            <Footer />
        </div>
    </>
  )
}

export default page