import { Button } from '@/components/ui/button';
import React, { useState } from 'react'
import Meetings from './Meetings';
import Resources from './Resources';
import Liked from './Liked';

const tabs = [
    {id: "meetings", label: "Meetings"},
    {id: "resources", label: "Resources"},
    {id: "liked", label: "Liked Posts"}
]

const Tabs = () => {

    const [activeTab, setActiveTab] = useState("meetings");
    const [loading, setLoading] = useState(true);

  return (
    <div className='w-full flex flex-col justify-center items-start'>
        <div className='flex justify-start items-center gap-4'>
            {tabs.map((tab, index) => (
                <Button key={index} className={`${activeTab == tab.id ? "bg-primary text-primary-foreground" : "bg-foreground text-muted hover:bg-foreground"} hover:text-primary-foreground `}
                onClick={() => setActiveTab(tab.id)}>{tab.label}</Button>
            ))}
        </div>
        
        <div className='flex flex-col justify-center items-start mt-5 flex-grow w-full'>
            <>
                {activeTab == "meetings" && <Meetings />}
                {activeTab == "resources" && <Resources />}
                {activeTab == "liked" && <Liked />}
            </>
        </div>

    </div>
  )
}

export default Tabs