"use client";
import React, { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import Link from "next/link";
import SearchInput from "../search-input";
import { FaBell } from "react-icons/fa";
import Button from "../ui/button";
import { IoMdAddCircle } from "react-icons/io";
import Image from "next/image";
import Logo from "@/assets/image/EZCOMPOSEX.png";
import { IoClose } from "react-icons/io5";
import { HiBars3 } from "react-icons/hi2";
import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
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
  isSearch?: boolean;
}
interface MenuItem {
  text: string;
  href: string;
}

const Navbar: React.FC<Props> = ({
  navigation,
  userProfile,
  Items,
  isSearch = false,
}) => {
  const [mPr, setMPr] = useState({
    showNewWebsite: false,
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
                  {open ? (
                    <IoClose className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <HiBars3 className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start p-2">
                <div className="flex flex-shrink-0 items-center">
                  <Image
                    className="h-8 w-auto"
                    height={800}
                    width={800}
                    src={Logo}
                    alt="Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4 my-auto">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={clsx(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
                {isSearch && (
                  <SearchInput
                    id="default-search"
                    placeholder="Search Mockups, Logos..."
                  />
                )}
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="relative rounded-full  p-2 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <FaBell className="h-6 w-6" aria-hidden="true" />
                </button>

                <UserButton appearance={{ baseTheme: dark }} />
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
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
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
