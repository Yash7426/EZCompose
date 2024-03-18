import React, { useEffect, useState } from "react"
import Image from "next/image"

import tickwhiteIcon from "@/assets/svg/tick-white.svg"
import { FaCheckCircle } from "react-icons/fa";
import clsx from "clsx";
interface Props {
  checked?: boolean
  onChange?(value: boolean): void
}
export default function CheckBox({ checked: _checked, onChange }: Props) {
  const [checked, setChecked] = useState(_checked != undefined ? _checked : false)
  useEffect(() => {
    setChecked(_checked != undefined ? _checked : false)
  }, [_checked])

  return (
    <div
      onClick={() => {
        onChange && onChange(!checked)
        setChecked(!checked)
      }}
      className={`w-5 rounded-[3px] h-5 flex items-center cursor-pointer justify-center border-2 border-solid ${
        checked
          ? "bg-secondary border-secondary shadow-md  "
          : " border-user_interface_4 bg-user_interface_2 "
      }`}
    >
      <FaCheckCircle width={140} height={140} className={clsx("w-4",!checked ? "hidden":"block")}/>
     
    </div>
  )
}
