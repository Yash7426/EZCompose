"use client"
import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../navbar';

interface MenuItem {
  href: string;
  name: string;
  icon?: JSX.Element;
}

interface NestedMenuProps {
  items: MenuItem[];
  children: React.ReactNode;
}

const Menu: React.FC<NestedMenuProps> = ({ children, items }) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div>
      <button
        className="w-full flex items-center justify-between text-gray-600 p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 duration-150"
        onClick={() => setIsOpened(!isOpened)}
      >
        <div className="flex items-center gap-x-2">{children}</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`w-5 h-5 duration-150 ${isOpened ? 'rotate-180' : ''}`}
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpened && (
        <ul className="mx-4 px-2 border-l text-sm font-medium">
          {items.map((item, idx) => (
            <li key={idx}>
              <a
                href={item.href}
                className="flex items-center gap-x-2 text-gray-600 p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 duration-150"
              >
                {item.icon && <div className="text-gray-500">{item.icon}</div>}
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

interface SidebarProps {
  navigation: MenuItem[];
  navsFooter: MenuItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ navigation, navsFooter }) => {
  const nestedNav = [
    { name: 'Cards', href: 'javascript:void(0)', icon: <></> },
    { name: 'Chekouts', href: 'javascript:void(0)', icon: <></> },
    { name: 'Payments', href: 'javascript:void(0)', icon: <></> },
    { name: 'Get paid', href: 'javascript:void(0)', icon: <></> },
  ];


  const navigation2 = [
    { name: "Home", href: "/", current: true },
    { name: "Projects", href: "/projects", current: false },
  
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
  const profileRef = useRef<HTMLButtonElement>(null);
  const [isProfileActive, setIsProfileActive] = useState(false);

  useEffect(() => {
    const handleProfile = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setIsProfileActive(false);
    };
    document.addEventListener('click', handleProfile);
    return () => {
      document.removeEventListener('click', handleProfile);
    };
  }, []);

  return (
    <>
    <Navbar navigation={navigation2} userProfile={userProfile} Items={Items} />
    <aside className="fixed top-0 left-0 w-full h-full border-r bg-white space-y-8 sm:w-80 invert mt-20">
      <div className="flex flex-col h-full px-4">
        <div className="h-20 flex items-center pl-2">
          <div className="w-full flex items-center gap-x-4">
            <img src="https://randomuser.me/api/portraits/women/79.jpg" className="w-10 h-10 rounded-full" />
            <div>
              <span className="block text-gray-700 text-sm font-semibold">Alivika tony</span>
              <span className="block mt-px text-gray-600 text-xs">Hobby Plan</span>
            </div>
            <div className="relative flex-1 text-right">
              <button
                ref={profileRef}
                className="p-1.5 rounded-md text-gray-500 hover:bg-gray-50 active:bg-gray-100"
                onClick={() => setIsProfileActive(!isProfileActive)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path
                    fillRule="evenodd"
                    d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {isProfileActive && (
                <div className="absolute z-10 top-12 right-0 w-64 rounded-lg bg-white shadow-md border text-sm text-gray-600">
                  <div className="p-2 text-left">
                    <span className="block text-gray-500/80 p-2">alivika@gmail.com</span>
                    <a href="javascript:void(0)" className="block w-full p-2 text-left rounded-md hover:bg-gray-50 active:bg-gray-100 duration-150">
                      Add another account
                    </a>
                    <div className="relative rounded-md hover:bg-gray-50 active:bg-gray-100 duration-150">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-4 h-4 absolute right-1 inset-y-0 my-auto pointer-events-none"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <select className="w-full cursor-pointer appearance-none bg-transparent p-2 outline-none">
                        <option disabled selected>Theme</option>
                        <option>Dark</option>
                        <option>Light</option>
                      </select>
                    </div>
                    <button className="block w-full p-2 text-left rounded-md hover:bg-gray-50 active:bg-gray-100 duration-150">Logout</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="overflow-auto">
          <ul className="text-sm font-medium flex-1">
            {navigation.map((item, idx) => (
              <li key={idx}>
                <a
                  href={item.href}
                  className="flex items-center gap-x-2 text-gray-600 p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 duration-150"
                >
                  <div className="text-gray-500">{item.icon}</div>
                  {item.name}
                </a>
              </li>
            ))}
            <li>
              <Menu items={nestedNav}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-500"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                </svg>
                Billing
              </Menu>
            </li>
          </ul>
          <div className="pt-2 mt-2 border-t">
            <ul className="text-sm font-medium">
              {navsFooter.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.href}
                    className="flex items-center gap-x-2 text-gray-600 p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 duration-150"
                  >
                    <div className="text-gray-500">{item.icon}</div>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </aside>
    </>
  );
};

export default Sidebar;
