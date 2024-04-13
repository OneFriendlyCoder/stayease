'use client';

import useCountries from "@/app/hooks/useCountries";
import useSearchModal from "@/app/hooks/useSearchModal";
import { differenceInDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";


const Search = () => {

  const searchModal = useSearchModal();
  const params = useSearchParams();
  const {getByValue} = useCountries();
  const locationValue = params?.get('location');
  const startDate = params?.get('startDate');
  const endDate = params?.get('endDate');
  const guestCount = params?.get('guestCount');
  
  const locationLabel = useMemo(() => {
    if(locationValue){
      return getByValue(locationValue as string)?.label;
    }
    return 'Anywhere';
  }, [getByValue, locationValue])

  const durationLabel = useMemo(() => {
    if(startDate && endDate){
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);
      if(diff === 0){diff = 1;}
      return `${diff} days`;
    }
    return 'Any week'
  }, [startDate, endDate])

  const guestLabel = useMemo(() => {
    if(guestCount){
      return `${guestCount} Guests`
    }
    return 'Add Guests'
  }, [guestCount])

  return ( 
    <div
    onClick={searchModal.onOpen}
      className="
        w-full 
        md:w-auto 
        py-2 
        cursor-pointer
      "
    >
    <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold rounded-full hover:bg-yellow-300 py-3 px-6 text-green-900">
            {locationLabel}
        </div>
        <div className="hidden sm:block text-sm font-semibold rounded-full hover:bg-yellow-300 text-green-900 px-6 py-3 flex-1 text-center">
            {durationLabel}
        </div>
        <div className="text-sm pl-6 pr-2 text-gray-900 flex flex-row items-center gap-3">
            <div className="hidden sm:block">
                {guestLabel}
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