'use client'

import { SafeUser } from "@/app/types";
import { Listing, Reservation, User } from "@prisma/client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { categories } from '../../components/navbar/Categories';
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import useLoginModal from '@/app/hooks/useLoginModal';
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, eachDayOfInterval, setDate } from "date-fns";
import toast from "react-hot-toast";
import axios from "axios";
import ListingReservation from "@/app/components/listings/ListingReservation";
import { Range } from "react-date-range";


const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

interface ListingClientProps{
    reservations?: Reservation[];
    listing: Listing & {user: SafeUser};
    currentUser?: SafeUser;
}

const ListingClient:React.FC<ListingClientProps> = ({listing, currentUser, reservations=[]}) => {
    const category = useMemo(() => {
        return categories.find((item) => item.label === listing.category);
    }, [listing.category])

    const loginModal = useLoginModal();
    const router = useRouter();
    const disabledDates = useMemo(() => {
        let dates: Date[] = [];
        reservations.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            })
            dates = [...dates, ...range]
        })

        return dates;
    },[reservations])

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);

    const onCreateReservation = useCallback(() => {
        if(!currentUser){return loginModal.onOpen();}
        setIsLoading(true);
        axios.post('/api/reservations', {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing.id,
        }). then(() => {
            toast.success("Successfull Reservation")
            setDateRange(initialDateRange)
            //redirect to /trips
            router.refresh();
        }).catch(() => {
            toast.error("Something went wrong")
        }).finally(() => {
            setIsLoading(false);
        })
    }, [totalPrice, dateRange, listing?.id, currentUser, loginModal])

    useEffect(() => {
        if(dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInCalendarDays(dateRange.startDate, dateRange.endDate);
            if(dayCount && listing.price){
                setTotalPrice(listing.price * dayCount);
            }else{
                setTotalPrice(listing.price);
            }
        }
    }, [dateRange, listing.price])

    return (  
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead title={listing.title} imageSrc={listing.imageSrc} locationValue={listing.locationValue} id={listing.id} currentUser={currentUser}/>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                    <ListingInfo user={listing.user} category={category} description={listing.description} roomCount={listing.roomCount} guestCount={listing.guestCount} bathroomCount={listing.bathroomCount} locationValue={listing.locationValue}/>
                </div>
                <div className="order-first mb-10 md:order-last md:col-span-3">
                    <ListingReservation price={listing.price} dateRange={dateRange} totalPrice={totalPrice} onChangeDate={(value) => setDateRange(value)} onSubmit={onCreateReservation} disabledDates={disabledDates} />
                </div>
            </div>
        </Container>
    );
}
 
export default ListingClient;