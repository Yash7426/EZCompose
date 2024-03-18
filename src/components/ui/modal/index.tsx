import { Fragment } from "react"
import clsx from "clsx"

import { Dialog, Transition } from "@headlessui/react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
}

export default function Modal({ isOpen, onClose, children, className }: ModalProps) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto "
        onClose={onClose}
      >
        <div className="absolute inset-0 flex justify-center overflow-y-auto h-min top-[70px] ">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-[#00000080] " />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transform ease-out duration-500"
            enterFrom="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
            enterTo="translate-y-0 opacity-100 sm:scale-100"
            leave="transform ease-in duration-200"
            leaveFrom="translate-y-0 opacity-100 sm:scale-100"
            leaveTo="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
          >
            <div
              className={clsx(
                "relative  sm:w-[600px]  rounded-b-3xl rounded-t-3xl shadow-xl sm:max-w-screen-sm bg-[#202024] no-scrollbar no-scroll",
                className
              )}
            >
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
