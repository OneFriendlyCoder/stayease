import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import CategoryBox from './CategoryBox';
import Container from '../Container';
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from 'react-icons/gi';
import { MdOutlineVilla } from 'react-icons/md';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export const categories = [
    {
        label: "Beach",
        icon: TbBeach,
        description: "Property close to Beach"
    },
    {
        label: "Windmills",
        icon: GiWindmill,
        description: "Property close to windmills"
    },
    {
        label: "Modern",
        icon: MdOutlineVilla,
        description: "Property is Modern"
    },
    {
        label: "CountrySide",
        icon: TbMountain,
        description: "Property is in countryside"
    },
    {
        label: "Pools",
        icon: TbPool,
        description: "Property has a Pool"
    },
    {
        label: "Islands",
        icon: GiIsland,
        description: "Property is at an Island"
    },
    {
        label: "Lake",
        icon: GiBoatFishing,
        description: "Property is near a Lake"
    },
    {
        label: "Skiing",
        icon: FaSkiing,
        description: "Property has skiing activities"
    },
    {
        label: "Castles",
        icon: GiCastle,
        description: "Property is in a Castle"
    },
    {
        label: "Camping",
        icon: GiForestCamp,
        description: "Property has camping activities"
    },
    {
        label: "Artic",
        icon: BsSnow,
        description: "Property is at a snow location"
    },
    {
        label: "Cave",
        icon: GiCaveEntrance,
        description: "Property is in a Cave"
    },
    {
        label: "Desert",
        icon: GiCactus,
        description: "Property is in the desert"
    },
    {
        label: "Barns",
        icon: GiBarn,
        description: "Property is in the Barns"
    },
    {
        label: "Lux",
        icon: IoDiamond,
        description: "Property is luxurious"
    },

];

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();
    const isMainPage = pathname === '/';
    if (!isMainPage) {
        return null;
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Container>
                <div className='pt-4 flex flex-row items-center justify-between overflow-x-auto'>
                    {categories.map((item) => (
                        <CategoryBox
                            key={item.label}
                            label={item.label}
                            selected={category === item.label}
                            icon={item.icon}
                        />
                    ))}
                </div>
            </Container>
        </Suspense>
    );
};

export default Categories;
