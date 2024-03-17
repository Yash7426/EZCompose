// SelectFilter.tsx
import React from "react"
import clsx from "clsx"
import Select from "../ui/select"


interface SelectFilterProps {
  value: string
  onChange: (value: string) => void
  options?: { label?: string; value?: string | boolean | number }[]
  hidden?: boolean
  errorMessage?: string | null
}

const SelectFilter: React.FC<SelectFilterProps> = ({
  value,
  onChange,
  options,
  hidden,
  errorMessage,
}) => {
  return (
    <>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={clsx("p-1 border rounded-md border-user_interface_4", hidden ? "hidden" : "")}
        options={options}
        errorMessage={errorMessage || ""}
      />

      {/* {errorMessage ? (
        <span className=" p-1 text-accent_red  font-[10px]">{errorMessage}</span>
      ) : null} */}
    </>
  )
}

export default SelectFilter
