import React from "react"
import Radio from "../ui/radio";


interface RadioFilterProps {
  value: boolean
  options?: { label?: string; value?: boolean | string | number }[]
  onChange: (value: boolean) => void
  errorMessage?: string | null
}

const RadioFilter: React.FC<RadioFilterProps> = ({ value, options, onChange, errorMessage }) => {
  return (
    <>
      <div className="flex flex-col items-start gap-y-[18px]">
        {options?.map((option, index) => (
          <span key={index} className="flex flex-row flex-wrap items-center gap-x-2 ">
            <Radio
              checked={value === option.value}
              onChange={() => onChange(option.value as boolean)}
            />
            <span className="text-[14px] break-all">{option.label}</span>
          </span>
        ))}
      </div>
      {errorMessage ? (
        <span className="flex gap-1 items-center p-1 text-accent_red  font-[10px]">
          <div>{errorMessage}</div>
        </span>
      ) : null}
    </>
  )
}

export default RadioFilter
