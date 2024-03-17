"use client"

// import Navbar from "@/components/header";
import { SignOutButton } from "@clerk/nextjs";
import Navbar from "@/components/navbar";
import Link from "next/link";
import { DotBackgroundDemo } from "@/components/ui/dot-background";
import { FaFacebook, FaGithub, FaTwitter } from 'react-icons/fa';
import Features from "@/components/feature-component";
import Team from "@/components/our-team";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import Footer from "@/components/footer";

// import useStoreUserEffect from "./useStoreUserEffect";

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
];

const userProfile = {
  name: 'John Doe',
  profileImageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};
const Items = [
  { text: 'Dashboard', href: '#' },
  { text: 'Team', href: '#' },
  { text: 'Projects', href: '#' },
  { text: 'Calendar', href: '#' },
]
const features: Feature[] = [
  {
    name: 'Push to deploy',
    description:
      'Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.',
    // icon: CloudArrowUpIcon,
  },
  {
    name: 'SSL certificates',
    description:
      'Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget. Sem sodales gravida quam turpis enim lacus amet.',
    // icon: LockClosedIcon,
  },
  {
    name: 'Simple queues',
    description:
      'Quisque est vel vulputate cursus. Risus proin diam nunc commodo. Lobortis auctor congue commodo diam neque.',
    // icon: ArrowPathIcon,
  },
  {
    name: 'Advanced security',
    description:
      'Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.',
    // icon: FingerPrintIcon,
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
    title: 'WebSocket infrastructure',
    description: 'Out-of-the-box edge network and reliable connection engine.',
  },
  // Add more features as needed
];
const TeamMemberArray = [


  {
    name: "Bonnie Green",
    role: "CEO/Co-founder",
    imageUrl: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png",
    social: [
      {
        name: "Facebook",
        href: "#",
        icon: <FaFacebook />
      },
      {
        name: "Twitter",
        href: "#",
        icon: <FaTwitter />
      },
      {
        name: "Github",
        href: "#",
        icon: <FaGithub />
      }
    ]
  },
  {
    name: "Bonnie Green",
    role: "CEO/Co-founder",
    imageUrl: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png",
    social: [
      {
        name: "Facebook",
        href: "#",
        icon: <FaFacebook />
      },
      {
        name: "Twitter",
        href: "#",
        icon: <FaTwitter />
      },
      {
        name: "Github",
        href: "#",
        icon: <FaGithub />
      }
    ]
  },
  {
    name: "Bonnie Green",
    role: "CEO/Co-founder",
    imageUrl: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png",
    social: [
      {
        name: "Facebook",
        href: "#",
        icon: <FaFacebook />
      },
      {
        name: "Twitter",
        href: "#",
        icon: <FaTwitter />
      },
      {
        name: "Github",
        href: "#",
        icon: <FaGithub />
      }
    ]
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
  }
]



export default function Home() {
  // const userId = useStoreUserEffect();
  // console.log(userId);
  return (
    <main className="flex  flex-col items-center justify-between   ">
      <Navbar navigation={navigation} userProfile={userProfile} Items={Items} />
      <DotBackgroundDemo >
        <div className="relative isolate px-6 pt-14 lg:px-8">
          {/* Background Shapes */}
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
          {/* Main Content */}
          <div className="mx-auto max-w-6xl py-32 sm:py-48 lg:py-56">

            <div className="text-center">
              <h1 className="p-2 text-4xl font-bold tracking-tight  sm:text-8xl bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
                <TypewriterEffect words={words} />

              </h1>
              <p className="mt-6  leading-8 text-white text-lg w-4/5 mx-auto">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
                fugiat veniam occaecat fugiat aliqua.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link href="#" className="rounded-md  px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm    ">
                  <button className="p-[3px] relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                    <div className="px-8 py-2   rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                      Start
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
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
          <div className="relative grid grid-cols-1 sm:grid-cols-2">
            <div>
              <Features features={features} />
            </div>
          </div>
          <Team teamMembers={TeamMemberArray} />

        </div>
        <Footer />
      </DotBackgroundDemo>
    </main>
  );
}
