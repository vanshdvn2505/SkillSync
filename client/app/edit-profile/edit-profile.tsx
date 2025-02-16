"use client"

import React, { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, Plus, X } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import FloatingLabelInput from './components/input-box';

const ProfilePage = () => {
  // State for managing skills
  const [skills, setSkills] = useState<string[]>(['React', 'TypeScript', 'Node.js', 'Python', 'AWS']);
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Function to add a new skill
  const handleAddSkill = () => {
    if (newSkill.trim() !== '' && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
    }
    setNewSkill('');
    setIsAddingSkill(false); // Hide input box after adding
  };

  // Handle clicking outside of input box
  const handleBlur = () => {
    setIsAddingSkill(false);
  };

  return (
    <div className="h-screen w-full bg-transparent z-50">
      <Navbar />
      <div className="flex flex-col gap-6 p-6 items-center h-full justify-center w-full text-accent mt-10">
        {/* Left Section */}
        <div className="w-full h-[56%] flex items-center justify-center">
          <Card className="bg-transparent h-full w-3/4 border-none shadow-secondary shadow-sm">
            <CardContent className="pt-6 h-full">
              {/* Profile Photo Section */}
              <div className="relative w-48 h-48 mx-auto mb-6">
                <img
                  src="/logo.png"
                  alt="Profile"
                  className="rounded-full w-full h-full object-cover"
                />
                <div className="absolute bottom-0 right-0 p-1 bg-foreground rounded-full cursor-pointer hover:opacity-80">
                  <Camera className="w-5 h-5 text-accent" />
                </div>
              </div>

              <div className="text-accent text-center mt-1">
                mokshe_2511
              </div>

              {/* Skills Section */}
              <div className="mb-6 mt-11 relative">
                <div className="flex items-center justify-between border-b py-1">
                  <h3 className="text-lg font-semibold text-accent">Skills</h3>
                  <button 
                    onClick={() => {
                      setIsAddingSkill(true);
                      setTimeout(() => inputRef.current?.focus(), 50); // Auto-focus input
                    }}
                    className="bg-primary p-1 rounded-full text-white hover:bg-primary/80"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>

                {/* Skills List */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {skills.map((skill) => (
                    <Badge 
                      key={skill} 
                      variant="secondary" 
                      className="bg-foreground text-accent border border-secondary flex items-center gap-1 px-2 cursor-pointer"
                    >
                      {skill}
                      <X 
                        className="h-3 w-3 ml-1 cursor-pointer text-red-500 hover:text-red-700" 
                        onClick={() => setSkills(skills.filter(s => s !== skill))}
                      />
                    </Badge>
                  ))}
                </div>

                {/* Floating Input Box for Adding Skills */}
                {isAddingSkill && (
                  <div className="absolute top-12 left-0 bg-background border border-primary p-2 rounded-lg shadow-lg w-60">
                    <input
                      ref={inputRef}
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
                      onBlur={handleBlur}
                      placeholder="Enter skill..."
                      className="bg-background border border-primary text-accent w-full p-2 rounded-lg"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Section (Form Fields) */}
        <div className="w-full text-accent h-[56%] flex items-center justify-center">
          <Card className="h-full shadow-secondary shadow-sm border-none bg-transparent w-3/4">
            <CardContent className="pt-6">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FloatingLabelInput label="First Name" />
                  <FloatingLabelInput label="Last Name" />
                  <FloatingLabelInput label="✉️ Email" type="email" />
                  <FloatingLabelInput label="💻 Github" />
                  <FloatingLabelInput label="🧍 Linked In" />
                  <FloatingLabelInput label="🏢 Company" />
                </div>
                <FloatingLabelInput label="📍 Address" />
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;