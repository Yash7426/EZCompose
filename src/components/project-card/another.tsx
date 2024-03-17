import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProjectCardProps {
    imageUrl: string;
    title: string;
    description: string;
    link: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ imageUrl, title, description, link }) => {
    return (

        <div className=" w-full relative max-w-md">
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
            <div className="relative shadow-xl bg-gray-900 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
                <div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-2 w-2 text-gray-300"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
                        />
                    </svg>
                </div>
                <Link href={link}>
                    <Image className="rounded-t-lg" src={imageUrl} alt={title} width={600} height={600} />
                </Link>
                <div className="hover:translate-x-4 transition duration-200">

                    <h1 className="font-bold text-xl text-white my-4 relative z-50">
                        Meteors because they&apos;re cool
                    </h1>

                    <p className="font-normal text-base text-slate-500 mb-4 relative z-50">
                        I don&apos;t know what to write so I&apos;ll just paste something
                        cool here. One more sentence because lorem ipsum is just
                        unacceptable. Won&apos;t ChatGPT the shit out of this.
                    </p>

                    <button className="shadow-[inset_0_0_0_2px_#616467] px-4 py-2 rounded-md tracking-widest capitalize  bg-transparent hover:bg-gray-700 hover:text-white dark:text-neutral-200 transition duration-200">
                        Open
                    </button>
                </div>

            </div>
        </div>
    );
}
export default ProjectCard