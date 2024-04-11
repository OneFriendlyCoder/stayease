import { TbBeach } from 'react-icons/tb';
import CategoryBox from './CategoryBox';
import Container from '../Container';
import { GiWindmill } from 'react-icons/gi';
import { MdOutlineVilla } from 'react-icons/md';

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

]

const Categories = () => {
    return (  
        <Container>
            <div className='pt-4 flex flex-row items-center justify-between overflow-x-auto'>
                {categories.map((item) => (
                    <CategoryBox
                        key={item.label}
                        label={item.label}
                        description={item.description}
                        icon={item.icon}
                    />
                ))}
            </div>
        </Container>
    );
}
 
export default Categories;