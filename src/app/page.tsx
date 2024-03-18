"use client";

// import Navbar from "@/components/header";
import { SignOutButton } from "@clerk/nextjs";
import Navbar from "@/components/navbar";
import Link from "next/link";
import { DotBackgroundDemo } from "@/components/ui/dot-background";
import { FaFacebook, FaGithub, FaTwitter } from "react-icons/fa";
import Features from "@/components/feature-component";
import Team from "@/components/our-team";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import Footer from "@/components/footer";
import ankit from "@/assets/image/ankit.jpg";
import akhil from "@/assets/image/akhil.jpeg";
import yash from "@/assets/image/yash.jpeg";
import { MdOutlineAccessTime } from "react-icons/md";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { FaCode } from "react-icons/fa6";
import { FaRobot } from "react-icons/fa";
import Wrapper from "@/components/ui/wrapper";

// import useStoreUserEffect from "./useStoreUserEffect";

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Projects", href: "/projects", current: false },

];

const userProfile = {
  name: "John Doe",
  profileImageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const Items = [
  { text: "Dashboard", href: "#" },
  { text: "Team", href: "#" },
  { text: "Projects", href: "#" },
  { text: "Calendar", href: "#" },
];
const features: Feature[] = [
  {
    name: "Scheduled Publish",
    description:
      "Scheduled Publish in EZCompose empowers users to plan and automate website launches, optimizing content deployment and project management.",
    icon: <MdOutlineAccessTime fill="black" />,
  },
  {
    name: "Real-time Collaboration",
    description:
      "Real-time Collaboration facilitates simultaneous editing and updating of projects among multiple users, fostering seamless teamwork and efficiency.",
    icon: <BsFillLightningChargeFill fill="black" />,
  },
  {
    name: "No-code Editor",
    description:  `
      The No-code Editor enables users to effortlessly design and customize websites without the need for coding knowledge, simplifying the web development process.`,
    icon: <FaCode fill="black" />,
  },
  {
    name: "AI powered Content Recommendations",
    description:
      "Our AI-powered auto-complete feature suggests content, speeding up your workflow and boosting productivity.",
    icon: <FaRobot fill="black" />,
  },
];

const features1 = [
  {
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 fill-[var(--gradient-color-center)] md:h-8 md:w-8"
      >
        {/* Your SVG path */}
      </svg>
    ),
    title: "WebSocket infrastructure",
    description: "Out-of-the-box edge network and reliable connection engine.",
  },
  // Add more features as needed
];
const TeamMemberArray = [
  {
    name: "Ankit Yadav",
    role: "Frontend Developer",
    imageUrl: ankit,
    social: [
      {
        name: "Github",
        href: "https://github.com/ANKITy102",
        icon: <FaGithub />,
      },
    ],
  },
  {
    name: "Akhilesh Jyotishi",
    role: "Frontend Developer",
    imageUrl: akhil,
    social: [
      {
        name: "Github",
        href: "https://github.com/AkhileshJyotishi",
        icon: <FaGithub />,
      },
    ],
  },
  {
    name: "Yash Agarwal",
    role: "Backend Developer",
    imageUrl: yash,
    social: [
      {
        name: "Github",
        href: "https://github.com/Yash7426",
        icon: <FaGithub />,
      },
    ],
  },

  // Add more team members as needed
];

const words = [
  {
    text: "Realtime",
    // className: "text-blue-600"
  },
  {
    text: "Team",
    // className: "text-green-500"
  },
  {
    text: "Harmony",
    // className: "text-indigo-400"
  },
  {
    text: "with",
    // className: "text-yellow-500"
  },
  {
    text: "No-Code",
    // className: "text-red-500"
  },
  {
    text: "Magic",
    // className: "text-purple-500"
  },
];

export default function Home() {
  // const userId = useStoreUserEffect();
  return (
    <main className="flex flex-col items-center justify-between   ">
      <Navbar navigation={navigation} userProfile={userProfile} Items={Items} />
      <DotBackgroundDemo>
        <div className="relative isolate px-6 pt-14 lg:px-8">
          {/* Background Shapes */}
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 h-screen">
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          {/* Main Content */}
          <div className="mx-auto max-w-6xl py-32 sm:py-36 lg:py-40">
            <div className="text-center">
              <h1 className="p-2 text-4xl font-bold tracking-tight  sm:text-8xl bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
                <TypewriterEffect words={words} />
              </h1>
              <p className="mt-6  leading-8 text-white text-lg w-4/5 mx-auto">
                Empower Collaboration, Create Responsive Websites with Ease -
                EZCompose: The Ultimate Real-Time No-Code Editor
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="#"
                  className="rounded-md  px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm    "
                >
                  <button className="p-[3px] relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                    <div className="px-8 py-2   rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                      Get Started
                    </div>
                  </button>
                </Link>
              </div>
            </div>
          </div>
          {/* Another Background Shape */}
          <div
            className="absolute inset-x-0 top-[calc(100%-26rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-45rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          <div className="relative grid grid-cols-1 sm:grid-cols-2 ">
            <div>
              <Features features={features} />
            </div>
            <div className="my-auto">
            <Wrapper />
            </div>
          </div>
          <Team teamMembers={TeamMemberArray} />
        </div>
        
        <Footer />
      </DotBackgroundDemo>
    </main>
  );
}
