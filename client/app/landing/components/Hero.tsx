'use client'

import { AnimatedTooltip } from '@/components/ui/animated-tooltip'
import { Button } from '@/components/ui/button'
import { Vortex } from '@/components/ui/vortex'
import img from '@/public/img.png'
import React from 'react'


const people = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    image: img
      },
  {
    id: 2,
    name: "Robert Johnson",
    designation: "Product Manager",
    image: img
  },
  {
    id: 3,
    name: "Jane Smith",
    designation: "Data Scientist",
    image: img
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "UX Designer",
    image: img
  },
];

function Hero() {
  return (
    <div className="w-[calc(100%-4rem)] mx-auto rounded-md  h-screen overflow-hidden">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={500}
        className="flex items-center flex-col justify-center px-2 md:px-10  py-4 w-full h-full"
      >
        <h2 className="text-white max-w-5xl text-2xl md:text-6xl font-bold text-center">
              Empower Your Future with Expert-Led Online Courses
        </h2>
        <p className="text-white text-sm md:text-2xl max-w-5xl mt-6 text-center">
              Join our community of learners and gain career-boosting skills at your own pace, anytime, anywhere, and transform your future with flexible, personalized learning experiences.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <Button className='text-white h-11 rounded-lg' size={'lg'} variant={'secondary'}>Student Stories</Button>
          <Button className='border-border border-4 h-11' size={'lg'}>Get Started</Button>
        </div>
        <div className='flex flex-row items-center justify-center pt-20 w-full'>
          <AnimatedTooltip items={people} />
          <p className='text-white ml-10 text-lg'>More than 5000+ Student Love SkillSync!</p>
        </div>
      </Vortex>
    </div>
  )
}

export default Hero