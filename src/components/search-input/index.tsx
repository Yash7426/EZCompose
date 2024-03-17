import React from "react";
import clsx from "clsx";

interface SearchInputProps {
  id: string;
  placeholder: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ id, placeholder }) => {
  return (
    <form className="max-w-xl mx-auto  border-[0.1px] rounded-md p-1 backdrop-blur-md">
      <label htmlFor={id} className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none outline-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400 font-bold"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id={id}
          className={clsx(
            "block w-full p-2 px-10 text-sm text-neutral-400  bg-transparent outline-none",
          )}
          placeholder={placeholder}
          autoCorrect="off"
          spellCheck="false"
          required
        />
        <button
          type="submit"
          className={clsx(
            "bg-white text-black absolute right-2.5 bottom-0.5 font-medium rounded-lg text-sm px-4 py-1 ",
          )}
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchInput;
