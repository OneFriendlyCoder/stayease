import getListingById from "@/app/actions/getListingByIds";
import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ListingClient from "./ListingClient";
import { SafeUser } from "@/app/types";


interface IParams{
    listingId?: string;
}

const ListingPage = async ({params}:{params: IParams}) => {
    const listing = await getListingById(params);
    const currentUser = await getCurrentUser() as SafeUser;
    if(!listing){
        return (
            <EmptyState />
        )
    }
    return (  
        <>
            <ListingClient listing={listing} currentUser={currentUser}/>
        </>
    );
}
 
export default ListingPage;