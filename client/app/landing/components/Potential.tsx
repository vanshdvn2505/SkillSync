import React from 'react'
import PotentialCard from './PotentialCard'

const Potential = () => {
  return (
    <div className='flex flex-col justify-center items-center mt-40 mb-10'>
        <div className='text-white py-10 flex flex-col justify-center items-center'>
            <h1 className='text-3xl mb-5 md:text-5xl py-2 font-bold text-center'>Unlock Your New Potential With SkillSync</h1>
            <p className='text-xl mb-5 w-2/3 text-center'>Collaborative learning with community support, earn certificates, and explore diverse career paths.</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            <PotentialCard title='Explore Career Paths' description='Discover career paths aligned with your interests.' link='./bento-1.png' />
            <PotentialCard title='Ask the Community' description='Collaborative learning solutions through community interaction.' link='./bento-2.png' />
            <PotentialCard title='Get Certificate' description='Receive recognition with achievement certificates.' link='./bento-3.png' />
        </div>
    </div>
  )
}

export default Potential