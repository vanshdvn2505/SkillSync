'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function Navbar() {
  return (
    <div className='absolute z-40 top-0 w-[90%]'>
        <div className='flex items-center justify-between m-10'>
            <Button variant={'default'} size={'icon'}>S</Button>
            <ul className='flex text-primary-foreground text-xl gap-6 bg-foreground px-4 py-2 rounded-lg cursor-pointer'>
                <li id='#home'>Home</li>
                <li id='#about'>About</li>
                <li id='#services'>Services</li>
                <li id='contact'>Contact</li>
            </ul>
            <Link href={'/signup'}>
              <Button className='text-white text-xl py-6' variant={'ghost'}>Get Started</Button>
            </Link>
        </div>
    </div>
  )
}

export default Navbar