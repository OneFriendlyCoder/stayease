import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingParams } from "./actions/getListings";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";

interface HomeProps{
  searchParams: IListingParams;
}

export default async function Home({searchParams}: HomeProps) {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <EmptyState showReset />
    );
  }

  return (
    <Container>
      <div className="pt-[140px] grid grid-cols-12 gap-8">
        {listings.map((listing: any) => (
          <div key={listing.id} className="col-span-2">
            <ListingCard data={listing} currentUser={currentUser} />
          </div>
        ))}
      </div>
    </Container>
  );
}
