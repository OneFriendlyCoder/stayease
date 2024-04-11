import getCurrentUser from "./actions/getCurrentUser";
import getListings from "./actions/getListings";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";

export default async function Home() {
  const listings = await getListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <EmptyState showReset />
    );
  }

  return (
    <Container>
      <div className="pt-24 grid grid-cols-12 gap-8">
        {listings.map((listing: any) => (
          <div key={listing.id} className="col-span-2">
            <ListingCard data={listing} currentUser={currentUser} />
          </div>
        ))}
      </div>
    </Container>
  );
}
