import React, { useEffect, useState } from "react"

interface Props {
  className?: string
  onChange?: (value: boolean) => void
  checked?: boolean
  id?: string
}

export default function Radio({ className, onChange, checked, id }: Props) {
  const [isChecked, setChecked] = useState<boolean>(checked != undefined ? checked : false)
  useEffect(() => {
    setChecked(checked != undefined ? checked : false)
  }, [checked])

  return (
    <div
      onClick={() => {
        setChecked(!isChecked)
        onChange && onChange(!isChecked)
      }}
      id={id}
      className={`text-white h-[18px] w-[18px] flex items-center justify-center p-[1px] border-[2px] ${
        isChecked ? "border-white" : "border-user_interface_6"
      }  bg-transparent rounded-full  ${className}`}
    >
      {isChecked && <span className="bg-white rounded-full w-[8px] h-[8px] m-auto"></span>}
    </div>
  )
}
