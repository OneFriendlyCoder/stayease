import { Listing, User } from "@prisma/client";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import { Suspense } from "react";
interface FavoritesClientProps{
    listings: Listing[];
    currentUser?: User;
}

const FavoritesClient:React.FC<FavoritesClientProps> = ({listings, currentUser}) => {

    return (  
        <Suspense fallback={<div>Loading...</div>}>
        <div>
            <Container>
                <Heading title="Favorites" subtitle="List of your favorite places"/>
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xlm:grid-cols-6 gap-8">
                {listings.map((listing) => (
                    <ListingCard key={listing.id} data={listing} currentUser={currentUser} />
                ))}
                </div>
            </Container>
        </div>
        </Suspense>
    );
}
 
export default FavoritesClient;