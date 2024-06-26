export const dynamic = 'force-dynamic'
import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListing";
import FavoritesClient from "./FavoritesClient";

const ListingPage = async () => {

    const listings = await getFavoriteListings();
    const currentUser = await getCurrentUser();
    
    if (listings.length === 0) {
        return (
            <EmptyState title="No favorites found" subtitle="You do not have any favorite listings"/>
        );
    }

    if (!currentUser) {
        return (
            <EmptyState title="User not found" subtitle="Unable to retrieve user information"/>
        );
    }

    return (  
        <FavoritesClient listings={listings} currentUser={currentUser}/>
    );
}
 
export default ListingPage;
