import React from "react"

const variants= {
  primary: "",
  secondary: "",
  link: "",
  pill: "",
  nav: "px-6 py-2 rounded-lg hover:opacity-90",
  outline:"shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent hover:border-black hover:text-black border border-white  text-white rounded-lg font-bold transform hover:bg-white transition duration-500"
}


interface ButtonProperties extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string
  textClassName?: string
  variant?: keyof typeof variants

}

const Button = ({
  title,
  onClick,
  className = "",
  disabled = false,
  textClassName = "",
  variant = "primary",
  children,
  type,
  style,
  ...properties
}: ButtonProperties) => {
  const BASE_CLASS = "transition-all"

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={style}
      className={`${BASE_CLASS} ${variant && variants[variant]} ${className}`}
      {...properties}
      aria-label={"Name"}
    >
      {children && children}
      {title && <div className={` ${textClassName}`}>{title}</div>}
    </button>
  )
}

export default Button