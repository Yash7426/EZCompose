import Sidebar from '@/components/sidebar'
import { FaHome } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { FaFolderClosed } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { IoDocumentSharp } from "react-icons/io5";
import React from 'react'
const navigation = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: <FaHome />,
        current: false,
        name: "dashboard"
    },
    {
        title: 'Team',
        href: '/team',
        icon: <FaUsers />,
        current: false,
        name: "team"
    },
    {
        title: 'Projects',
        href: '/projects',
        icon: <FaFolderClosed />,
        current: false,
        name: "projects"
    },
    {
        title: 'Calendar',
        href: '/calendar',
        icon: <FaCalendarAlt />,
        current: false,
        name: "calendar"
    },
    {
        title: 'Documents',
        href: '/documents',
        icon: <IoDocumentSharp />,
        current: false,
        name: "documents"
    }
]
const navsFooter = [
    {
        title: 'Settings',
        href: '/settings',
        icon: <FaHome />,
        current: false,
        name: "settings"
    },
    {
        title: 'Help',
        href: '/help',
        icon: <FaUsers />,
        current: false,
        name: "help"
    },
    {
        title: 'Privacy',
        href: '/privacy',
        icon: <FaFolderClosed />,
        current: false,
        name: "privacy"
    },
    {
        title: 'Terms',
        href: '/terms',
        icon: <FaCalendarAlt />,
        current: false,
        name: "terms"
    },
    {
        title: 'Logout',
        href: '/logout',
        icon: <IoDocumentSharp />,
        current: false,
        name: "logout"
    }
]
const page = () => {
    return (
        <>
            <Sidebar navigation={navigation} navsFooter={ navsFooter} />
        </>
    )
}

export default page
