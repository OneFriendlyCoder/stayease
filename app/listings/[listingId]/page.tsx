import getListingById from "@/app/actions/getListingByIds";
import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";
import { User } from "@prisma/client";

interface IParams{
    listingId?: string;
}

const ListingPage = async ({params}:{params: IParams}) => {
    const listing = await getListingById(params);
    const reservations = await getReservations(params);
    const currentUser = await getCurrentUser() as User;
    if(!listing){
        return (
            <EmptyState />
        )
    }
    return (  
        <>
            <ListingClient listing={listing} currentUser={currentUser} reservations={reservations}/>
        </>
    );
}
 
export default ListingPage;