import { Box } from '@/components/Box'
import React from 'react'
import Tabs from './right-box/Tabs'
import Charts from './right-box/Charts'

const RightBox = () => {
  return (
    <div className="flex flex-col space-y-4">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 flex-grow">
            <Box className="bg-foreground flex-1 aspect-video">
                <div></div>
            </Box>
            <Box className="bg-foreground flex-1 aspect-video">
                <div></div>
            </Box>
        </div>
        <Box className="flex-grow bg-foreground flex-1">
            <Charts isStudent={true} />
        </Box>
        <Box className="flex-grow bg-foreground overflow-scroll no-scrollbar max-h-[504px]">
            <Tabs />
        </Box>
  </div>
  )
}

export default RightBox