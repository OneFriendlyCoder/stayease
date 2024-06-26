'use client'

import useCountries from "@/app/hooks/useCountries";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import { User } from "@prisma/client";
interface ListingInfoProps{
    user: User;
    description: string;
    guestCount: number;
    roomCount: number;
    bathroomCount: number;
    category: {
        icon: IconType;
        label: string;
        description: string;
    } | undefined;
    locationValue: string;
}

const ListingInfo:React.FC<ListingInfoProps> = ({user, description, guestCount, roomCount, bathroomCount, category, locationValue}) => {
    const {getByValue} = useCountries();
    const location = getByValue(locationValue);
    return (  
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div className="text-xl font-semibold flex flex-row items-center gap-2">
                    <div>Hosted by {user?.name}</div>
                    <Avatar src={user?.image}/>
                </div>
                <div className="flex flex-row items-center gap-4 font-light text-neutral-500 mb-[10px]">
                    <div>{guestCount} Guests</div>
                    <div>{roomCount} Rooms</div>
                    <div>{bathroomCount} Bathrooms</div>
                </div>
                <hr/>
                {category && (<ListingCategory icon={category.icon} label={category.label} description={category.description}/>)}
                <hr/>
            </div>
        </div>
    );
}
 
export default ListingInfo;