"use client"
import React, { Fragment, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';
import Link from 'next/link';
import SearchInput from '../search-input';
import { FaBell } from 'react-icons/fa';
import Button from '../ui/button';
import { IoMdAddCircle } from "react-icons/io";
// import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
}

interface UserProfile {
  name: string;
  profileImageUrl: string;
}

interface Props {
  navigation: NavigationItem[];
  userProfile: UserProfile;
  Items: MenuItem[];
  isSearch?: boolean
}
interface MenuItem {
  text: string;
  href: string;

}
<button className="">
  Figma Outline
</button>

const Navbar: React.FC<Props> = ({ navigation, userProfile, Items, isSearch = false }) => {
  const [mPr, setMPr] = useState({
    showNewWebsite: false
});
  return (
    <Disclosure as="nav" className="bg-transparent absolute z-50 w-full">
      {({ open }) => (
        <>
          <div className="  px-2 sm:px-6 lg:px-8 w-full">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden ">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {/* {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )} */}
                  x
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start p-2">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4 my-auto">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={clsx(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
                {
                  isSearch && <SearchInput id="default-search" placeholder="Search Mockups, Logos..." />
                }

              </div>
              <div>
                <Button variant={"outline"} className='flex items-center gap-2 text-lg' onClick={() => setMPr({ ...mPr, showNewWebsite: true })}>
                <IoMdAddCircle className='text-'/>
                  Add New Project
                </Button>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-2 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <FaBell className="h-6 w-6" aria-hidden="true" />

                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={userProfile.profileImageUrl}
                        alt={userProfile.name}
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {Items.map((item) => (
                        <Menu.Item key={item.text}>
                          {({ active }) => (
                            <Link href={item.href} className={clsx(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                              {item.text}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}

                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden bg-white">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={clsx(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
