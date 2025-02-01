'use client'

import React from 'react'
import CustomCard from '../../../components/CustomCard'
import {motion} from 'framer-motion'

const paths = [
    {
        title: "Introduction to HTML 5",
        description: "Learn the fundamental aspects of website framework development using HTML5, the latest standard in web markup languages.",
        link: "./learning.png"
    },
    {
        title: "Introduction to HTML 5",
        description: "Learn the fundamental aspects of website framework development using HTML5, the latest standard in web markup languages.",
        link: "./learning.png"
    },
    {
        title: "Introduction to HTML 5",
        description: "Learn the fundamental aspects of website framework development using HTML5, the latest standard in web markup languages.",
        link: "./learning.png"
    },
    {
        title: "Introduction to HTML 5",
        description: "Learn the fundamental aspects of website framework development using HTML5, the latest standard in web markup languages.",
        link: "./learning.png"
    },
    {
        title: "Introduction to HTML 5",
        description: "Learn the fundamental aspects of website framework development using HTML5, the latest standard in web markup languages.",
        link: "./learning.png"
    },
]

const duplicatedPaths = [...paths, ...paths];

function LearningPath() {
  return (
    <div className='flex flex-col justify-center items-center mt-40 mb-10'>
        <div className='text-white py-10 flex flex-col justify-center items-center'>
            <h1 className='text-3xl mb-5 md:text-5xl py-2 font-bold text-center'>Choose Your Learning Path</h1>
            <p className='text-xl mb-5 w-2/3 text-center'>Embark on a personalized and transformative journey towards achieving your dream career goals.</p>
        </div>

    <motion.div
      className="flex overflow-hidden w-full"
      style={{ display: "flex", whiteSpace: "nowrap" }}
    >
      <motion.div
        className="flex justify-evenly items-center"
        style={{ display: "flex" }}
        animate={{
          x: [-100 * paths.length, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {duplicatedPaths.map((path, index) => (
          <CustomCard
            key={index}
            title={path.title}
            description={path.description}
            link={path.link}
          />
        ))}
      </motion.div>
    </motion.div>
    </div>
  )
}

export default LearningPath