import { GamesFilterProps } from "./games"

// interface Props {
//   jwt?: string
//   auth_user?: Allow
//   seo?: Allow
//   jobs?: Allow[]
//   jobsMeta?: Allow
//   defaultAndFilter?: Allow
//   defaultPageSize?: number
// className: string
// }

interface filterprops {
  // Function to clear the applied filters
  clearFilters?: () => void
  Filters?: JobFilterProps | GamesFilterProps | CreatorsFilterProps | FiltersState
  searchWithFilters: () => void
  setFilters?:
    | React.Dispatch<React.SetStateAction<JobFilterProps>>
    | React.Dispatch<React.SetStateAction<CreatorsFilterProps>>
    | React.Dispatch<React.SetStateAction<GamesFilterProps>>
    | React.Dispatch<React.SetStateAction<JObResponseFilterProps>>
  // CreatorsFilterProps
  FilterArray?: FilterDetail[]
  country?: { label?: string; value?: string }[]

  setCountry?: React.Dispatch<React.SetStateAction<{ label?: string; value?: string }[]>>
  city?: string[]
  setCity?: React.Dispatch<React.SetStateAction<string[]>>
  loading?: boolean
  className?: string
}

interface FilterDetail<SO = { label: string; value: string | boolean | number }> {
  title?: string
  inputType:
    | "text"
    | "checkbox"
    | "radio"
    | "select"
    | "date"
    | "tags"
    | "file"
    | "number"
    | "phone"
  onTagsChange?: (tags: readonly string[]) => void
  placeholder?: string
  value?: string | boolean | Date | number | null | readonly string[]
  selectOptions?: { label?: SO["label"]; value?: SO["value"] }[]
  onChange?: (value: string | boolean | Date | number | File | string[]) => void
  className?: string
  Variant?: string
  accept?: string
  multiple?: boolean
  initialtags?: readonly string[]
  viewonlyPdf?: boolean
  downloadPDF?: boolean
  hidden?: boolean
  preview?: boolean
  errorMessage?: string | null
  onOptionClick?:(option:Option)=>void
  // this should be optimised and generalised later  , i have passed dimension from file creatportfolio just for sake of easeness
  dimensionsImage?: {
    height: number | null
    width: number | null
  }
  fullScreen?: boolean
  element?: "input" | "textarea"
}
type Errors<T> = {
  [K in keyof T]: string | null
}
