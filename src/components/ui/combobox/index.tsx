import React, { ChangeEvent, Fragment, useEffect, useState } from "react"
import clsx from "clsx"
import Fuse from "fuse.js"
import { PiWarningCircleFill } from "react-icons/pi"

import { Combobox, Transition } from "@headlessui/react"
import { IoMdCheckmark } from "react-icons/io";
import { HiMiniChevronUpDown } from "react-icons/hi2";
interface ComboboxInputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}

const ComboboxInput: React.FC<ComboboxInputProps> = ({ onChange, placeholder }) => (
  <Combobox.Input
    className="w-full py-2 pl-3 pr-10 text-sm leading-5  border-[0.1px] bg-ui2   focus:!ring-0  border-black text-white rounded-md "
    displayValue={(option: Option) => option?.label ?? ""}
    onChange={onChange}
    placeholder={placeholder}
  />
)

const ComboboxButton: React.FC = () => (
  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
    <HiMiniChevronUpDown className="w-5 h-5 text-gray-400 fill-text" aria-hidden="true" />
  </Combobox.Button>
)

interface ComboboxOptionsProps {
  filteredOptions: Option[]
  query: string
  setQuery: React.Dispatch<React.SetStateAction<string>>
  onOptionClick?: (option: Option) => void; 
}

const ComboboxOptions: React.FC<ComboboxOptionsProps> = ({ filteredOptions, query, setQuery,onOptionClick }) => (
  <Transition
    as={Fragment}
    leave="transition ease-in duration-100"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
    afterLeave={() => setQuery("")}
  >
    <Combobox.Options
      className="absolute w-full py-1 overflow-auto text-base rounded-md bg-white max-h-60 ring-1 ring-black focus:outline-none sm:text-sm flex flex-col "
      style={{ zIndex: 19 }}
    >
      {filteredOptions.length === 0 && query !== "" ? (
        <div
          className="relative px-4 py-2 cursor-default select-none text-text"
          style={{ zIndex: 19 }}
        >
          Nothing found.
        </div>
      ) : (
        filteredOptions.map((option) => (
          <Combobox.Option
            key={String(option.value)}
            className={({ active }) =>
              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                active ? "bg-ui3 text-white" : "bg-ui2 text-white"
              }`
            }
            onClick={() =>{if(onOptionClick) onOptionClick(option)}}
            value={option}
            style={{ zIndex: 19 }}
          >
            {({ selected, active }) => (
              <>
                <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                  {option?.label}
                </span>
                {selected ? (
                  <span
                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                      active ? "text-text" : "text-secondary"
                    }`}
                  >
                    <IoMdCheckmark className="w-5 h-5" aria-hidden="true"/>
                  </span>
                ) : null}
              </>
            )}
          </Combobox.Option>
        ))
      )}
    </Combobox.Options>
  </Transition>
)

interface ComboboxWrapperProps {
  selected: Option
  onChange: (value: Option) => void
  query: string
  setQuery: React.Dispatch<React.SetStateAction<string>>
  filteredOptions: Option[]
  placeholder?: string
  onOptionClick?: (option: Option) => void;

}

const ComboboxWrapper: React.FC<ComboboxWrapperProps> = ({
  query,
  setQuery,
  filteredOptions,
  placeholder,
  onOptionClick
}) => (
  <div className="w-full overflow-hidden text-left  cursor-default sm:text-sm">
    <ComboboxInput onChange={(event) => setQuery(event.target.value)} placeholder={placeholder} />
    <ComboboxButton />
    <ComboboxOptions filteredOptions={filteredOptions} query={query} setQuery={setQuery} onOptionClick={onOptionClick} />
  </div>
)
interface Option {
  label?: string
  value?: string | boolean | number
}

interface CustomComboboxProps {
  value: string | boolean | number
  onChange: (value: string) => void
  placeholder?: string
  options?: Option[]
  defaultSelected?: Option
  className?: string
  hidden?: boolean
  errorMessage?: string | null
  onOptionClick?: (option: Option) => void;
}

const CustomCombobox: React.FC<CustomComboboxProps> = ({
  onChange,
  options,
  defaultSelected,
  className,
  errorMessage,
  placeholder,
  value,
  onOptionClick,

}) => {
  "use client"
  const [, setSelected] = useState<Option>(
    defaultSelected || (options && options.length > 0 ? options[0] : {})
  )
  const [query, setQuery] = useState<string>("")
  const [val, setval] = useState<Option>(
    defaultSelected || (options && options.length > 0 ? options[0] : {})
  )
  const fuse = new Fuse(options || [], {
    keys: ["label"], // The properties you want to search
  })
  const filteredOptions =
    query === "" ? options : (fuse.search(query).map((item) => item.item) as Option[])

  useEffect(() => {
    if (value == "") {
      setval({ label: "", value: "" })
    }
  }, [value])
  return (
    <div className={clsx("relative ring-0 w-full", className)}>
      <Combobox
        value={val}
        onChange={(value) => {
          setSelected(value)
          setval(value)
          onChange((value.value as string) || "")
        }}
        
      >
        <ComboboxWrapper
          selected={val}
          onChange={setval}
          query={query}
          setQuery={setQuery}
          filteredOptions={filteredOptions || []}
          placeholder={placeholder}
          onOptionClick={onOptionClick}
        />
        {errorMessage ? (
          <span className="flex gap-1 p-1 text-red-500 text-[12px] items-center">
            <PiWarningCircleFill />
            <div>{errorMessage}</div>
          </span>
        ) : null}
      </Combobox>
    </div>
  )
}

export default CustomCombobox
