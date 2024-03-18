"use client"
import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { IoChevronDownSharp } from "react-icons/io5";
import Link from 'next/link';
type MenuItem = {
  id: number;
  name: string;
  onClick?: () => void;
  href?: string;
  icon: JSX.Element;
};

type Props = {
  items: MenuItem[];
  name: string
};

const DropdownMenu: React.FC<Props> = ({ items,name }) => {
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const handleItemClick = (id: number) => {
    setActiveItem(activeItem === id ? null : id);
  };

  return (
    <Menu as="div" className="relative mx-1 inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md bg-ui2 px-2 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
          {name}
          <IoChevronDownSharp   className="-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100"
            aria-hidden="true"/>
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
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          {items.map((item) => (
            <div key={item.id} className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  item.href ? (
                    <Link
                      href={item.href}
                      className={`${
                        active ? 'bg-violet-500 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  ) : (
                    <button
                      className={`${
                        active ? 'bg-violet-500 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={item.onClick}
                    >
                      {item.icon}
                      {item.name}
                    </button>
                  )
                 
                )}
              </Menu.Item>
            </div>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default DropdownMenu;
