'use client'

import { Reservation, User, Listing } from "@prisma/client";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface ExtendedReservation extends Reservation {
    listing: Listing; 
}

interface TripsClientProps{
    reservations: ExtendedReservation[];
    currentUser?: User | null;
}

const TripsClient:React.FC<TripsClientProps> = ({reservations, currentUser}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);
        axios.delete(`/api/reservations/${id}`).then(() => {toast.success("Reservation cancelled"); router.refresh();}).catch((error: any) => {toast.error("Something went wrong")}).finally(() => {setDeletingId('')})
    }, [router])

    return (  
        <Container>
            <Heading title="Trips" subtitle="Where you have been and where are you going"/>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xlm:grid-cols-6 gap-8">
                {reservations.map((reservation) => (
                    <ListingCard reservation={reservation} key={reservation.id} data={reservation.listing} actionId={reservation.id} onAction={onCancel} disabled={deletingId === reservation.id} actionLabel="Cancel Reservation" currentUser={currentUser} />
                ))}
            </div>
        </Container>
    );
}
 
export default TripsClient;