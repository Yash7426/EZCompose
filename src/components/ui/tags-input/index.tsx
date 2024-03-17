import React from "react"
// import clsx from "clsx"
import { PiWarningCircleFill } from "react-icons/pi"
import { MultiValue } from "react-select"
import CreatableSelect from "react-select/creatable"

// import CloseIcon from "@/components/icons/closeIcon"
// import AddIcon from "@/components/icons/plus"
// import { SecondaryTag } from "../badges"
// import TextInput from "../textInput"

interface TagsInputProps {
  predefinedTags: string[]
  onTagsChange: (tags: readonly string[]) => void
  id?: string
  className?: string
  initialtags?: readonly string[]
  errorMessage?: string | null
  placeholder: string | undefined
  value?: readonly string[]
}

const TagsInput: React.FC<TagsInputProps> = ({
  predefinedTags,
  onTagsChange,
  id,
  // className,
  initialtags,
  errorMessage,
  placeholder,
  value,
}) => {
  // const [tags, setTags] = useState<string[]>(initialtags ?? [])
  // const [inputValue, setInputValue] = useState<string>("")
  // const [suggestions, setSuggestions] = useState<string[]>([])

  // const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const inputText = e.target.value
  //   setInputValue(inputText)
  //   let matchedTags: string[] = []
  //   if (predefinedTags.length > 0) {
  //     matchedTags = predefinedTags.filter((tag) =>
  //       tag.toLowerCase().includes(inputText.toLowerCase().trim())
  //     )
  //   }

  //   setSuggestions(matchedTags)
  // }

  // const addTag = (tagText?: string) => {
  //   if (tagText) {
  //     onTagsChange([...tags, tagText])
  //     setTags((tags) => [...tags, tagText])
  //     setInputValue("")
  //     setSuggestions([])
  //   } else if (inputValue.trim() !== "") {
  //     onTagsChange([...tags, inputValue])
  //     setTags([...tags, inputValue])
  //     setInputValue("")
  //     setSuggestions([])
  //   }
  // }

  // const removeTag = (tagText: string) => {
  //   const updatedTags = tags.filter((tag) => tag !== tagText)
  //   setTags(updatedTags)
  //   onTagsChange(updatedTags)
  // }
  // const handleBlur = () => {
  //   setSuggestions([])
  // }

  // const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Enter") {
  //     addTag()
  //   }
  // }
  const handleTagsChange = (
    val: MultiValue<{
      label: string
      value: string
    }>
  ) => {
    const arr: string[] = val.map((v) => v.value)
    onTagsChange(arr)
  }
  const init = (initialtags ?? [])?.map((init) => ({ label: init, value: init }))
  const predefinedInit = (predefinedTags ?? []).map((tag) => ({ label: tag, value: tag }))
  const val = value?.map((mp) => ({ label: mp, value: mp }))
  return (
    <div className="flex flex-col items-start w-full ">
      <div className="flex flex-row justify-between w-full gap-1 p-1">
        {/* <TextInput
          type="text"
          placeholder={placeholder}
          name="tags"
          className={clsx(
            "bg-transparent rounded-md ",
            errorMessage && "border-accent_red focus:border-accent_red focus:shadow-accent_red"
          )}
          value={inputValue}
          onChange={handleInput}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
          id={id}
        />
        <AddIcon
          className="h-[40px] w-[46px] rounded-full bg-secondary cursor-pointer"
          handleclick={() => {
            addTag()
          }}
        /> */}
        <CreatableSelect
          isMulti
          id={id}
          defaultValue={init}
          options={predefinedInit}
          placeholder={placeholder}
          onChange={(val) => {
            handleTagsChange(val)
          }}
          closeMenuOnSelect
          className="rounded-md w-full border-[0.01px] border-[#505054] outline-none ring-0 ring-offset-0 ring-transparent text-text   "
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              border: "none",
              backgroundColor: "transparent",
              color: "white",
            }),
            option: (styles, { isDisabled, isFocused, isSelected }) => {
              return {
                ...styles,
                backgroundColor: isDisabled
                  ? undefined
                  : isSelected
                    ? "red"
                    : isFocused
                      ? "#101014"
                      : "#464E55",
                color: isFocused ? "white" : "black",
                ":active": {
                  ...styles[":active"],
                  backgroundColor: !isDisabled ? (isSelected ? "#161A1F" : "#161A1F") : undefined,
                },
              }
            },
            multiValueLabel: (styles) => ({
              ...styles,
              color: "white",
              gap: "4px",
            }),
            multiValueRemove: (styles) => ({
              ...styles,
              color: "#101014",
              ":hover": {
                backgroundColor: "#00B87D",
                color: "white",
              },
            }),
            menuList: (styles) => ({
              ...styles,
              backgroundColor: "black",
              zIndex: 18,
            }),
          }}
          theme={(theme) => ({
            ...theme,
            border: "none",
            colors: {
              ...theme.colors,
              primary25: "#464E55",
              primary: "transparent",
              neutral10: "#292F34",
              neutral20: "white",
              neutral0: "white",
            },
          })}
          value={val}
        />
      </div>

      {/* {suggestions.length > 0 && (
        <div
          className="absolute flex flex-col gap-2 p-4 mt-12 rounded-lg shadow-md bg-background "
          style={{ zIndex: 18 }}
        >
          {suggestions?.map((tag, index) => (
            <div
              key={index}
              className="p-2 cursor-pointer hover:bg-user_interface_2"
              onMouseDown={() => addTag(tag)}
              tabIndex={0}
            >
              {tag}
            </div>
          ))}
        </div>
      )} */}

      {errorMessage ? (
        <span className="flex gap-1 p-1 text-accent_red text-[12px] items-center">
          <PiWarningCircleFill />
          <div>{errorMessage}</div>
        </span>
      ) : null}
    </div>
  )
}

export default TagsInput

{
  /* another tag variant but looks bulky */
}
{
  /* {tags.map((tag, index) => (
                    <>
                        <span className='flex justify-start bg-user_interface_3 w-fit rounded-xl px-[5.5px] cursor-pointer mt-[6px]' >
                            <SecondaryTag name={tag} className='rounded-xl px-[1px] py-[1px]' />
                            <span
                                className="p-[1px] mt-[6px] "
                                onClick={() => removeTag(tag)}
                            >
                                <CloseIcon className='' />
                            </span>
                        </span>
                    </>
                ))} */
}
// <div className="flex flex-wrap gap-2 mt-2 ">
{
  // tags &&
  //   tags?.map((chip, index) => (
  //     <span key={index} className="flex items-center cursor-pointer">
  //       <div className="flex items-center justify-center px-2 py-1 m-1 font-medium border rounded-full hover:border-secondary">
  //         <span className="" onClick={() => removeTag(chip)}>
  //           <CloseIcon className="h-[15px] w-[12px] mt-[6px] fill-light hover:fill-red-500" />
  //         </span>
  //         <div className="text-xs font-normal leading-none max-w-full flex-initial p-[2px] break-all">
  //           {chip}
  //         </div>
  //       </div>
  //     </span>
  //   ))
}

// </div>
