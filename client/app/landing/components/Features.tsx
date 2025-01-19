'use client'

import SkillCard from '@/components/skill-card'
import { HoverEffect } from '@/components/ui/card-hover-effect'
import { motion } from 'framer-motion'
import React from 'react'

const features = [
  {
    "title": "Expert Instructors",
    "description": "Our courses are led by industry experts with years of real-world experience. Gain insights and knowledge from professionals who are passionate about teaching and dedicated to your success",
    "link": "."
  },
  {
    "title": "Flexible Learning",
    "description": "Learn at your own pace with our flexible online courses. Whether you're balancing work, family, or other commitments, our platform allows you to study when and where it’s convenient for you.",
    "link": ""
  },
  {
    "title": "Comprehensive Support",
    "description": "We offer a robust support system to help you succeed. From interactive forums and live Q&A sessions to one-on-one mentorship, our community is here to support you every step of the way.",
    "link": "/"
  },
]

function Features() {

  return (
    <div className='flex flex-col'>
        <div className='flex justify-evenly items-center'>
          <HoverEffect items={features} />
        </div>
        <div className='flex flex-col justify-center items-center'>
          <div className='text-white py-10 flex flex-col justify-center items-center'>
              <h1 className='text-3xl md:text-5xl py-2 w-2/3 font-bold text-center'>Mastering Various Tools for Your Needs</h1>
              <p className='text-xl'>Explore Frameworks and Technologies for Enhanced Development Skills</p>
          </div>
          <motion.div className='flex flex-shrink-0 gap-2 mb-5'>
            <SkillCard title="React" link='/react.svg' />
            <SkillCard title="Vue" link='/vue.svg' />
            <SkillCard title="Pyhton" link='/python.svg' />
            <SkillCard title="Kotlin" link='/kotlin.svg' />
            <SkillCard title="Blender" link='/blender.svg' />
            <SkillCard title="Laravel" link='/laravel.svg' />
            <SkillCard title="HTML5" link='/html.svg' />
            <SkillCard title="GoLang" link='/golang.svg' />
            <SkillCard title="CSS" link='/css.svg' />
            <SkillCard title="Tailwind" link='/tailwind.svg' />
            <SkillCard title="JavaScript" link='/javascript.svg' />
          </motion.div>
          <motion.div className='flex flex-shrink-0 gap-2'>
            <SkillCard title="JavaScript" link='/javascript.svg' />
            <SkillCard title="Tailwind" link='/tailwind.svg' />
            <SkillCard title="CSS" link='/css.svg' />
            <SkillCard title="GoLang" link='/golang.svg' />
            <SkillCard title="HTML5" link='/html.svg' />
            <SkillCard title="Laravel" link='/laravel.svg' />
            <SkillCard title="Blender" link='/blender.svg' />
            <SkillCard title="Kotlin" link='/kotlin.svg' />
            <SkillCard title="Pyhton" link='/python.svg' />
            <SkillCard title="Vue" link='/vue.svg' />
            <SkillCard title="React" link='/react.svg' />
          </motion.div>
        </div>
        <div className='h-[100vh]'></div> 
    </div>
  )
}

export default Features