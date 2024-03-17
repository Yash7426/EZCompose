// import React, { SelectHTMLAttributes } from "react"

interface Props {
    value: string | number
    name?: string
    onChange?: React.ChangeEventHandler<HTMLSelectElement>
    options?: { label?: string; value?: string | boolean | number }[]
    errorMessage?: string
    className?: string
  }
  
  export default function Select({ name, value, onChange, options, errorMessage, className }: Props) {
    return (
      <div className="flex flex-col items-start w-full">
        <select
          className={
            "flex flex-row items-center gap-2 bg-user_interface_3 px-2 md:px-[23px] w-full rounded-[10px] py-[10px] " +
            className
          }
          name={name}
          value={value}
          onChange={onChange}
        >
          {options?.map((opt, idx) => (
            <option className="dark:text-light " value={opt.value as string} key={idx}>
              {opt.label}
            </option>
          ))}
        </select>
        {errorMessage ? <span className="mt-2 text-accent_red">{errorMessage}</span> : <></>}
      </div>
    )
  }
  