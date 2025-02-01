'use client'
import { Navbar } from '@/components/Navbar'
import React from 'react'
import { motion } from 'framer-motion'
import LeftBox from './components/LeftBox'
import RightBox from './components/RightBox'

const page = () => {
  return (
    <div className='min-h-screen w-full'>
        <Navbar />
      <motion.div
        className="h-full p-4 pt-0 transition-all duration-300 ease-in-out"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 h-full p-4">
          <div className="lg:w-[30%] h-full">
            <LeftBox />
          </div>
          <div className="lg:w-[70%] h-full">
            <RightBox />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default page