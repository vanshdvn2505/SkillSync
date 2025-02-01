import { MessageSquareText, Presentation, Star } from 'lucide-react'
import React from 'react'

const Stats = () => {
  return (
    <div className='pt-2'>
        <h2 className='text-primary-foreground font-bold text-xl'>Statistics</h2>
        <div className='py-5 flex flex-col justify-start items-start text-muted'>
            <div className='flex items-center space-x-2 pb-4'>
                <MessageSquareText color='#0a84ff'  className="w-5 h-5" />
                <p className='text-sm'>
                    Communities Joined: 10
                </p>
            </div>
            <div className='flex items-center space-x-2 pb-4'>
                <Presentation color='#00b8a3'  className="w-5 h-5" />
                <p className='text-sm'>
                    Meetings Attended: 10
                </p>
            </div>
            {/* <div className='flex items-center space-x-2 pb-4'>
                <MessageSquareText  className="w-5 h-5" />
                <p className='text-sm'>
                    Communities Joined: 10
                </p>
            </div> */}
            <div className='flex items-center space-x-2 pb-4'>
                <Star color='#f6a01a'  className="w-5 h-5" />
                <p className='text-sm'>
                    Rating: 10
                </p>
            </div>
        </div>
    </div>
  )
}

export default Stats