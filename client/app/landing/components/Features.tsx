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

const skills = [
  { title: "React", link: "/react.svg" },
  { title: "Vue", link: "/vue.svg" },
  { title: "Python", link: "/python.svg" },
  { title: "Kotlin", link: "/kotlin.svg" },
  { title: "Blender", link: "/blender.svg" },
  { title: "Laravel", link: "/laravel.svg" },
  { title: "HTML5", link: "/html.svg" },
  { title: "GoLang", link: "/golang.svg" },
  { title: "CSS", link: "/css.svg" },
  { title: "Tailwind", link: "/tailwind.svg" },
  { title: "JavaScript", link: "/javascript.svg" },
];

function Features() {

  return (
    <div className='flex flex-col'>
        <HoverEffect items={features} />
        <div className='flex flex-col justify-center items-center mt-30'>
          <div className='text-white py-10 flex flex-col justify-center items-center'>
              <h1 className='text-3xl mb-5 md:text-5xl py-2 w-2/3 font-bold text-center'>Mastering Various Tools for Your Needs</h1>
              <p className='text-xl'>Explore Frameworks and Technologies for Enhanced Development Skills</p>
          </div>
          <motion.div className='flex flex-shrink-0 gap-2 m-5'>
            {skills.map((skill, index) => (
              <SkillCard key={index} title={skill.title} link={skill.link} />
            ))}
          </motion.div>
          <motion.div className='flex flex-shrink-0 gap-2'>
            {skills.slice().reverse().map((skill, index) => (
                <SkillCard key={index} title={skill.title} link={skill.link} />
            ))}
          </motion.div>
        </div>
    </div>
  )
}

export default Features