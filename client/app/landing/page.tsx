'use client'
import React from 'react'
import Hero from './components/Hero'
import { Button } from '@/components/ui/button'
import Navbar from './components/Navbar'
import Features from './components/Features'

function page() {
  return (
    <>
        <div className='min-h-screen w-full flex flex-col justify-center items-center'>
            <Navbar />
            <Hero />
            <Features />
        </div>
    </>
  )
}

export default page