// Filter.tsx

import React from "react"
import clsx from "clsx"
import dynamic from "next/dynamic"
// import DatePicker from "react-date-picker"
import { PiWarningCircleFill } from "react-icons/pi"
import { PhoneInput } from "react-international-phone"


// import CustomCombobox from "@/components/ui/Combobox"

// import CheckboxFilter from "./checkboxfilter"
// import FileFilter from "./Filefilter"
// import RadioFilter from "./radiofilter"
import "react-international-phone/style.css"
// import SelectFilter from "./selectfilter"
// import "react-date-picker/dist/DatePicker.css"
// import "react-calendar/dist/Calendar.css"
import { FilterDetail } from "@/interfaces/filter"
import TextInput from "../ui/text-input"
// const DatePicker = dynamic(() => import("react-date-picker"), {
//   ssr: false,
// })

const CustomCombobox = dynamic(() => import("../ui/combobox"), {
  loading: () => {
    return <div className="w-full bg-gray-400 animate-pulse h-[150px]"></div>
  },
})
const TagsInput = dynamic(() => import("../ui/tags-input"), {
  loading: () => {
    return <div className="w-full bg-gray-400 animate-pulse h-[150px]"></div>
  },
})
const CheckboxFilter = dynamic(() => import("./checkboxfilter"), {
  loading: () => {
    return <div className="w-full bg-gray-400 animate-pulse h-[150px]"></div>
  },
})
const RadioFilter = dynamic(() => import("./radiofilter"), {
  loading: () => {
    return <div className="w-full bg-gray-400 animate-pulse h-[150px]"></div>
  },
})

const Filter: React.FC<FilterDetail> = ({
  title,
  placeholder,
  value,
  onChange,
  inputType,
  onTagsChange,
  selectOptions,
  className,
  Variant,
  accept,
  multiple,
  initialtags,
  preview,
  errorMessage,
  dimensionsImage,
  fullScreen,
  element,
  viewonlyPdf,
  downloadPDF,
  onOptionClick
  // hidden
}) => {
  const handleCheckboxChange = (newValue: string[]) => {
    if (onChange) {
      onChange(newValue)
    }
  }
  const handleRadioChange = (newValue: boolean) => {
    if (onChange) {
      onChange(newValue)
    }
  }
  const handleSelectChange = (newValue: string | string[]) => {
    if (onChange) {
      onChange(newValue)
    }
  }
  const handleTagsChange = (tags: readonly string[]) => {
    if (onTagsChange) {
      onTagsChange(tags)
    }
  }
  const handleFileChange = (files: File) => {
    if (onChange) {
      onChange(files)
    }
  }
  return (
    <div className={clsx(Variant)}>
      <label className="font-medium text-white " htmlFor={title}>
        {title}
      </label>
      {inputType === "text" && (
        <>
          <TextInput
            onChange={(e) => onChange!(e.target.value)}
            type="text"
            className={`${className} !bg-ui2 !text-white`}
            value={value as string}
            name="text"
            placeholder={placeholder}
            id={title}
            errorMessage={errorMessage}
            element={element}
          />
        </>
      )}
      {inputType === "number" && (
        <>
          <TextInput
            onChange={(e) => onChange!(e.target.value)}
            type="number"
            className={className}
            value={value as number}
            name="number"
            placeholder={placeholder}
            id={title}
            errorMessage={errorMessage}
          />
        </>
      )}

      {inputType === "checkbox" && (
        <>
          <CheckboxFilter
            values={value as string[]}
            onChange={handleCheckboxChange}
            options={selectOptions}
            errorMessage={errorMessage}
          />
          {/* {errorMessage} */}
        </>
      )}
      {inputType === "radio" && (
        <>
          <RadioFilter
            onChange={handleRadioChange}
            options={selectOptions}
            value={value as boolean}
            errorMessage={errorMessage}
          />
        </>
      )}

      {inputType === "select" && (
        <>
          <CustomCombobox
            onChange={handleSelectChange}
            value={value as string}
            options={selectOptions}
            errorMessage={errorMessage}
            // className={className}
            
            defaultSelected={(selectOptions ?? [])?.filter((item) => item.value == value)[0] ?? []}
            placeholder={placeholder}
            onOptionClick={onOptionClick}
          />
          {/* <SelectFilter
            onChange={handleSelectChange}
            value={value as string}
            options={selectOptions}
            errorMessage={errorMessage}

          // hidden={hidden}
          /> */}
        </>
      )}
      {/* {inputType === "date" && (
        <>
          <DatePicker
            name="date"
            onChange={(date) => onChange!(date as Date)}
            value={value as Date}
            id={title}
          />
          {errorMessage ? (
            <span className="flex gap-1 p-1 text-accent_red text-[12px] items-center">
              <PiWarningCircleFill />
              <div>{errorMessage}</div>
            </span>
          ) : null}
        </>
      )} */}
      {inputType === "tags" && (
        <TagsInput
          onTagsChange={handleTagsChange}
          id={title}
          value={((value || []) ?? []) as string[]}
          placeholder={placeholder}
          predefinedTags={selectOptions?.map((option) => option.value as string) || []}
          initialtags={initialtags}
          errorMessage={errorMessage}
        />
      )}
      {/* {inputType === "file" && (
        <>
          <FileFilter
            id={title}
            accept={accept || ""}
            multiple={multiple || false}
            onChange={(files) => {
              files && handleFileChange(files)
            }}
            className={className}
            preview={preview}
            value={value as string}
            errorMessage={errorMessage}
            fullScreen={fullScreen}
            viewonlyPdf={viewonlyPdf}
            download={downloadPDF}
          />
          {dimensionsImage &&
            dimensionsImage?.width !== null &&
            dimensionsImage?.height !== null && (
              <span className="italic">
                Dimensions:{dimensionsImage?.width}x{dimensionsImage?.height}
              </span>
            )}
        </>
      )} */}
      {inputType === "phone" && (
        <>
          <PhoneInput
            defaultCountry="nl"
            className="bg-transparent w-full"
            countrySelectorStyleProps={{
              buttonClassName:
                "!border-[0.1px] !border-user_interface_4 !p-1 hover:!bg-transparent",
              dropdownStyleProps: {
                className: "!text-text !bg-user_interface_4 w-[250px] sm:w-[300px]",
                listItemClassName: " hover:!bg-user_interface_2",
              },
            }}
            inputClassName={
              "!bg-transparent !text-text !border-[0.1px] !border-user_interface_4 !w-full !shadow-sm !px-[12px] !py-[9px]"
            }
            value={(value as string) || ""}
            onChange={(phone) => onChange!(phone)}
          />
          {errorMessage ? (
            <span className="flex gap-1 p-1 text-accent_red text-[12px] items-center">
              <PiWarningCircleFill />
              <div>{errorMessage}</div>
            </span>
          ) : null}
        </>
      )}
    </div>
  )
}

export default Filter
