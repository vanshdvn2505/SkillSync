import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { Navbar } from "@/components/Navbar";

export function BentoGridAbout() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <BentoGrid className="w-full mx-auto mt-4 lg:p-0 p-4 mb-4">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            icon={item.icon}
            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
          />
        ))}
      </BentoGrid>
    </div>
  );
}
const Skeleton = () => (
  <img className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100" />
);
const items = [
  {
    title: "Why SkillSync? 👋",
    description:
      "SkillSync is a platform that connects mentors with learners to share knowledge and develop new skills. Whether you want to grow professionally or personally, SkillSync helps you achieve your learning goals through expert guidance.",
    header: <Skeleton />,
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Our Mission 🎯",
    description:
      "Our mission is to create a space where learning and mentoring thrive. We connect passionate mentors with learners eager to develop new skills, empowering both sides to grow and succeed.",
    header: <Skeleton />,
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "How It Works 🔄",
    description:
      "At SkillSync, learners can browse through a wide range of mentors and choose the one that suits their needs. Mentors offer personalized sessions based on their expertise, helping learners unlock their potential at their own pace.",
    header: <Skeleton />,
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Join SkillSync Today 🚀",
    description:
      "Ready to start learning or teaching? Sign up today and be part of a growing community where knowledge is shared, skills are honed, and success is achieved together.",
    header: <Skeleton />,
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "For Learners 📚",
    description:
      "SkillSync offers learners the opportunity to gain one-on-one guidance from skilled mentors in various fields. Choose from flexible learning formats, including video calls, live chats, and more, to make your learning experience seamless and effective.",
    header: <Skeleton />,
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "For Mentors 🧑‍🏫",
    description:
      "As a mentor on SkillSync, you’ll have the chance to share your expertise with motivated learners. Whether you’re looking to earn income, build your professional network, or give back to the community, SkillSync offers a platform for you to teach what you love.",
    header: <Skeleton />,
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Why Choose Us? 💡",
    description:
      "SkillSync stands out because of its personalized learning approach, flexible schedules, and a wide range of topics. We prioritize building lasting relationships between mentors and learners, ensuring both sides benefit from every interaction.",
    header: <Skeleton />,
    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
  },
];
