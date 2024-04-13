import { Suspense } from 'react';
import useCountries from '@/app/hooks/useCountries';
import useSearchModal from '@/app/hooks/useSearchModal';
import { differenceInDays } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { BiSearch } from 'react-icons/bi';

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useCountries();
  const locationValue = params?.get('location');
  const startDate = params?.get('startDate');
  const endDate = params?.get('endDate');
  const guestCount = params?.get('guestCount');

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }
    return 'Anywhere';
  }, [getByValue, locationValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);
      if (diff === 0) {
        diff = 1;
      }
      return `${diff} days`;
    }
    return 'Any week';
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }
    return 'Add Guests';
  }, [guestCount]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div
        onClick={searchModal.onOpen}
        className="
        w-full 
        md:w-auto 
        py-2 
        cursor-pointer
      "
      >
        <div className="pl-[100px] flex flex-row items-center justify-between">
          <div className="text-sm font-semibold rounded-full hover:bg-[#1a213b] py-3 px-6 text-[#1a213b] hover:text-white">
            {locationLabel}
          </div>
          <div className="hidden sm:block text-sm font-semibold rounded-full hover:bg-[#1a213b] text-[#1a213b] hover:text-white px-6 py-3 flex-1 text-center">
            {durationLabel}
          </div>
          <div className="text-sm rounded-full px-6 py-3 hover:bg-[#1a213b] text-[#1a213b] hover:text-white flex flex-row items-center gap-3">
            <div className="hidden sm:block">{guestLabel}</div>
            <div className="p-2 bg-green-500 rounded-full text-white">
              <BiSearch />
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Search;
