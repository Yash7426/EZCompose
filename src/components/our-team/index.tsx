import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface SocialLink {
  name: string;
  href: string;
  icon: JSX.Element;
}

interface TeamMember {
  name: string;
  role: string;
  imageUrl: StaticImageData;
  social: SocialLink[];
}

interface Props {
  teamMembers: TeamMember[];
}

const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => (
  <div className="text-center text-white p-2">
    <Image
      className="mx-auto mb-4 w-36 h-36 rounded-full"
      src={member.imageUrl}
      alt={`${member.name} Avatar`}
      height={400}
      width={400}
    />
    <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      <Link href="#">{member.name}</Link>
    </h3>
    <p className="text-xl font-600 text-slate-600">{member.role}</p>
    <ul className="flex justify-center mt-4 space-x-4">
      {member.social.map((link, index) => (
        <li key={index}>
          <Link href={link.href} className="text-white text-2xl">
            {link.icon}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const Team: React.FC<Props> = ({ teamMembers }) => (
  <section className="">
    <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
      <div className="mx-auto mb-8 max-w-screen-sm lg:mb-16">
        <h2 className="mb-4 text-6xl tracking-tight font-extrabold text-gray-900 dark:text-white">
          Our team
        </h2>
      </div>
      <div className="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3  p-4 ">
        {teamMembers.map((member, index) => (
          <TeamMemberCard key={index} member={member} />
        ))}
      </div>
    </div>
  </section>
);

export default Team;
