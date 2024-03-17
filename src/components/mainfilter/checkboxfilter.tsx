// CheckboxFilter.tsx

import React from "react"
import { PiWarningCircleFill } from "react-icons/pi"
import CheckBox from "../ui/checkbox"


interface CheckboxFilterProps {
  values: string[]
  onChange: (value: string[]) => void
  options?: { label?: string; value?: string | boolean | number }[]
  errorMessage?: string | null
}

const CheckboxFilter: React.FC<CheckboxFilterProps> = ({
  values,
  onChange,
  options,
  errorMessage,
}) => {
  const handleCheckboxChange = (value: string) => {
    const updatedValues = values.includes(value)
      ? values.filter((v) => v !== value)
      : [...values, value]
    onChange(updatedValues)
  }
  return (
    <>
      <div className="flex flex-col items-start gap-y-[18px]">
        {options?.map((option, index) => (
          <>
            <span key={index} className="flex flex-row flex-wrap items-center gap-x-2">
              <CheckBox
                checked={values.includes(option?.value as string)}
                onChange={() => handleCheckboxChange(option?.value as string)}
              />
              <span className="text-[14px] break-all">{option?.label}</span>
            </span>
          </>
        ))}
      </div>
      {errorMessage ? (
        <span className="flex gap-1 items-center p-1 text-accent_red  font-[10px] text-[12px]">
          <PiWarningCircleFill />
          <div>{errorMessage}</div>
        </span>
      ) : null}
    </>
  )
}

export default CheckboxFilter
