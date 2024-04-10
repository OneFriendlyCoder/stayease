'use client';

interface MenuItemProps {
  onClick: () => void;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  onClick,
  label
}) => {
  return ( 
    <div 
      onClick={onClick} 
      className="
        px-3 
        py-2 
        hover:bg-green-100 
        text-sm
        text-center
        transition
      "
    >
      {label}
    </div>
   );
}
 
export default MenuItem;