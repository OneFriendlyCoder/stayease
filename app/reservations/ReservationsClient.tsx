'use client'

import toast from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Heading from "../components/Heading";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";
import { User, Reservation, Listing } from "@prisma/client";
import { Suspense } from "react";
interface ExtendedReservation extends Reservation {
    listing: Listing; 
}
interface ReservationClientProps{
    reservations: ExtendedReservation[];
    currentUser?: User | null;
}

const ReservationsClient:React.FC<ReservationClientProps> = ({reservations, currentUser}) => {
    const router = useRouter();
    const [deletingId, setDeletingId]= useState('');
    const onCancel = useCallback((id: string) => {
        setDeletingId(id);
        axios.delete(`/api/reservations/${id}`)
        .then(() => {
            toast.success("Reservation cancelled");
            router.refresh();
        }).catch(() => {
            toast.error("Something went wrong")
        }).finally(() => {
            setDeletingId('');
        })
    }, [router])

    return (  
        <Suspense fallback={<div>Loading...</div>}>
        <Container>
            <Heading title="Reservations" subtitle="Bookings on your property"/>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xlm:grid-cols-6 gap-8">
                {reservations.map((reservation) => (
                        <ListingCard reservation={reservation} key={reservation.id} data={reservation.listing} actionId={reservation.id} onAction={onCancel} disabled={deletingId === reservation.id} actionLabel="Cancel guest reservation" currentUser={currentUser} />
                    ))}
            </div>
        </Container>
        </Suspense>
    );
}
 
export default ReservationsClient;