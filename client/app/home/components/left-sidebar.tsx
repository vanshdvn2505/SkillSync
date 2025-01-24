"use client";
import { motion } from 'framer-motion';
import { CardSpotlightDemo } from './left-sidebar-cards';
// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card-ui"

const recentCommunities = [
  "React Enthusiasts",
  "Python Developers",
  "AI/ML Experts",
  "Web3 Innovators",
  "UX/UI Designers"
]

const topCommunities = [
  "JavaScript Ninjas",
  "Data Science Hub",
  "Cloud Computing Pros",
  "Mobile App Devs",
  "DevOps Masters"
]

const myCommunities = [
  "JavaScript Ninjas",
  "Data Science Hub",
  "Cloud Computing Pros",
  "Mobile App Devs",
  "DevOps Masters"
]

export default function LeftSidebar() {
  return (
    <aside className="w-64 pr-4">
      <div className="sticky top-20 py-1 space-y-4 flex flex-col">
        <motion.div
          initial={{ y: -10 }}
          animate={{ y: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
            duration: 0.5,
            repeatType: "reverse",
          }}
        >
          <CardSpotlightDemo  />
        </motion.div>
        <motion.div
          initial={{ y: -10 }}
          animate={{ y: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
            duration: 0.5,
            repeatType: "reverse",
          }}
        >
          <CardSpotlightDemo />
        </motion.div>
        <motion.div
          initial={{ y: -10 }}
          animate={{ y: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
            duration: 0.5,
            repeatType: "reverse",
          }}
        >
          <CardSpotlightDemo />
        </motion.div>
      </div>
    </aside>
  )
}