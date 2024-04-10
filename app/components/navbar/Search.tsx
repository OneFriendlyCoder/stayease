'use client';

import { BiSearch } from "react-icons/bi";


const Search = () => {
  return ( 
    <div
      className="
        w-full 
        md:w-auto 
        py-2 
        cursor-pointer
      "
    >
    <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold rounded-full hover:bg-yellow-300 py-3 px-6 text-green-900">
            Search
        </div>
        <div className="hidden sm:block text-sm font-semibold rounded-full hover:bg-yellow-300 text-green-900 px-6 py-3 flex-1 text-center">
            Any week
        </div>
        <div className="text-sm pl-6 pr-2 text-gray-900 flex flex-row items-center gap-3">
            <div className="hidden sm:block">
                Add Guests
            </div>
            <div className="p-2 bg-green-500 rounded-full text-white">
                <BiSearch />
            </div>
        </div>
    </div>
    </div>
  );
}
 
export default Search;