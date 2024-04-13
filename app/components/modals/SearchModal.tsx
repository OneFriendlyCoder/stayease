import useSearchModal from "@/app/hooks/useSearchModal";
import Modal from "./Modal";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import queryString from "query-string";
import formatISO from "date-fns/formatISO";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import Heading from "../Heading";
import Calender from "../listings/Calender";
import Counter from "../inputs/Counter";
import { Suspense } from "react";

enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2
}

const SearchModal = () => {
    const router = useRouter();
    const params = useSearchParams();
    const searchModal = useSearchModal();
    const [location, setLocation] = useState<CountrySelectValue>();
    const [step, setStep] = useState(STEPS.LOCATION);
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });

    const onBack = useCallback(() => {
        setStep((value) => value - 1);
    }, [])

    const onNext = useCallback(() => {
        setStep((value) => value + 1);
    }, [])

    const onSubmit = useCallback(async () => {
        if (step !== STEPS.INFO) { return onNext(); }
        let currentQuery = {};
        if (params) { currentQuery = queryString.parse(params.toString()) }

        const updatedQuery: any = {
            ...currentQuery,
            guestCount,
            roomCount,
            bathroomCount
        }
        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }
        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate);
        }

        const url = queryString.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, { skipNull: true })

        setStep(STEPS.LOCATION);
        searchModal.onClose();
        router.push(url);
    }, [step, searchModal, location, router, guestCount, roomCount, bathroomCount, dateRange, onNext, params])

    const actionLabel = useMemo(() => {
        if (step === STEPS.INFO) {
            return 'Search'
        }
        return 'Next'
    }, [step])

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.LOCATION) { return undefined }
        return 'Back'
    }, [step])

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading title="Where you wanna go ?" subtitle="Find the perfect location" />
            <CountrySelect value={location} onChange={(value) => setLocation(value as CountrySelectValue)} />
            <hr />
        </div>
    )

    if (step === STEPS.DATE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="When you plan to go ?" subtitle="Make sure everyone is free" />
                <Calender value={dateRange} onChange={(value) => setDateRange(value.selection)} />
            </div>
        )
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="More information" subtitle="Find your perfect place" />
                <Counter title="Guests" subtitle="How many guests are coming?" value={guestCount} onChange={(value) => setGuestCount(value)} />
                <Counter title="Rooms" subtitle="How many rooms are coming?" value={roomCount} onChange={(value) => setRoomCount(value)} />
                <Counter title="BathRoom" subtitle="How many bathrooms are coming?" value={bathroomCount} onChange={(value) => setBathroomCount(value)} />
            </div>
        )
    }
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Modal isOpen={searchModal.isOpen} onClose={searchModal.onClose} onSubmit={onSubmit} title="Filters" actionLabel={actionLabel} body={bodyContent} secondaryAction={step === STEPS.LOCATION ? undefined : onBack} secondaryActionLabel={secondaryActionLabel} />
        </Suspense>
    );
}

export default SearchModal;
