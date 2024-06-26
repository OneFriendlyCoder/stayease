'use client'

import { User, Listing } from "@prisma/client";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";
import { Suspense } from "react";
interface PropertiesClientProps{
    listings: Listing[];
    currentUser?: User | null;
}

const PropertiesClient:React.FC<PropertiesClientProps> = ({listings, currentUser}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);
        axios.delete(`/api/listings/${id}`).then(() => {toast.success("Listing Deleted"); router.refresh();}).catch((error: any) => {toast.error("Something went wrong")}).finally(() => {setDeletingId('')})
    }, [router])

    return (  
        <Suspense fallback={<div>Loading...</div>}>
        <Container>
            <div className="mt-[50px]">
                <Heading title="Properties" subtitle="List of your properties"/>
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xlm:grid-cols-6 gap-8">
                    {listings.map((listing) => (
                        <ListingCard key={listing.id} data={listing} actionId={listing.id} onAction={onCancel} disabled={deletingId === listing.id} actionLabel="Delete Property" currentUser={currentUser} />
                    ))}
                </div>
            </div>
        </Container>
        </Suspense>
    );
}
 
export default PropertiesClient;