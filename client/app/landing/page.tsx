'use client'
import React, { useEffect } from 'react'
import Hero from './components/Hero'
import { Button } from '@/components/ui/button'
import Navbar from './components/Navbar'
import Features from './components/Features'
import LearningPath from './components/LearningPath'
import Potential from './components/Potential'
import Footer from './components/Footer'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { CURRENT_USER } from '@/graphql/queries/authQueries'

function page() {

  const router = useRouter();

  const { data, loading, error } = useQuery(CURRENT_USER, {
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if(!loading && data){
      router.push('/home');
    }
  }, [loading, data, router])

  if(loading) return <div className='text-primary-foreground'>Loading...</div>
  if(error) return <div className='text-primary-foreground'>Error : {error.message}</div>

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