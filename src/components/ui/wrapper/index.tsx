import React from 'react'
import { IconContainer } from '../icon-container'
import { Radar } from '../radar'
import Convex from "@/assets/image/convex.svg"
import Nextjs from "@/assets/image/nextjs.svg"
import TypeScript from "@/assets/image/typescript.svg"
import Clerk from "@/assets/image/clerk.svg"
import FramerMotion from "@/assets/image/framer-motion.svg"
import HeadLessUI from "@/assets/image/framer-motion.svg"
const index = () => {
  return (
    <>
      <div className="relative flex h-96 w-full flex-col items-center justify-center space-y-4 overflow-hidden px-4 my-auto">
        <div className="mx-auto w-full max-w-3xl">
          <div className="flex w-full  items-center justify-center space-x-10 md:justify-between md:space-x-0 ">
            <IconContainer text="Web Development" delay={0.2} />
            <IconContainer
              delay={0.4}
              text="Convex"
              icon={Convex}
            />
            <IconContainer
              text="Next.js"
              delay={0.3}
              icon={Nextjs}
            />
          </div>
        </div>
        <div className="mx-auto w-full max-w-md">
          <div className="flex w-full items-center justify-center space-x-10 md:justify-between md:space-x-0 ">
            <IconContainer
              text="TypeScript"
              delay={0.5}
              icon={TypeScript}
            />
            <IconContainer
              text="Clerk"
              icon={
                Clerk
              }
              delay={0.8}
            />
          </div>
        </div>
        <div className="mx-auto w-full max-w-3xl">
          <div className="flex w-full items-center justify-center space-x-10 md:justify-between md:space-x-0 ">
            <IconContainer
              delay={0.6}
              text="Framer Motion"
              icon={FramerMotion}
            />
            <IconContainer
              delay={0.7}
              text="Headless UI"
              icon={HeadLessUI}
            />
          </div>
        </div>

        <Radar className="absolute -bottom-12" />
        <div className="absolute bottom-0 z-[41] h-px w-full bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      </div>

    </>
  )
}

export default index