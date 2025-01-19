'use client'

import { Button } from '@/components/ui/button'
import React from 'react'

function Navbar() {
  return (
    <div className='absolute z-40 top-0 w-[90%]'>
        <div className='flex items-center justify-between m-10'>
            <Button variant={'default'} size={'icon'}>S</Button>
            <ul className='flex text-white text-xl gap-6 bg-[#353535]/90 px-4 py-2 rounded-lg cursor-pointer'>
                <li id='#home'>Home</li>
                <li id='#about'>About</li>
                <li id='#services'>Services</li>
                <li id='contact'>Contact</li>
            </ul>
            <Button className='text-white text-xl py-6' variant={'ghost'}>Get Started</Button>
        </div>
    </div>
  )
}

export default Navbar