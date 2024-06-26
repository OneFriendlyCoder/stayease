'use client';

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItems from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRentModal from "@/app/hooks/useRentModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";


interface UsermenuProps{
    currentUser?: User | null;
}

const UserMenu:React.FC<UsermenuProps> = ({currentUser}) => {
    const router = useRouter()
    const rentModal = useRentModal();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = useCallback(()=>{
        setIsOpen((value) => !value);
    },[])

    const onRent = useCallback(()=>{
        if(!currentUser){return loginModal.onOpen();}
        rentModal.onOpen();

    },[currentUser,loginModal])

  return ( 
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div 
          onClick={onRent}
          className="
            hidden
            md:block
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-[#1a213b]
            transition 
            cursor-pointer
            text-[#1a213b] hover:text-white
          "
        >
                Rent your home
            </div>
            <div
                onClick={toggleOpen}
                className="
                    p-4
                    md:py-1
                    md:px-2
                    flex
                    flex-row
                    items-center
                    gap-3 
                    rounded-full
                    cursor-pointer

                "
            >
                <div className="md:block h-[40px] w-[40px]">
                    <Avatar src = {currentUser?.image ? currentUser?.image : "/images/logo1.png"}/>
                </div>
            </div>
        </div>
        {isOpen && (
            <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                <div className="flex flex-col cursor-pointer">
                    {currentUser? (
                        <>
                            <MenuItems onClick={()=>{router.push('/trips')}} label="My trips"/>
                            <MenuItems onClick={()=>{router.push('/favorites')}} label="My Favourites"/>
                            <MenuItems onClick={()=>{router.push('/reservations')}} label="My Reservations"/>
                            <MenuItems onClick={()=>{router.push('/properties')}} label="My Properties"/>
                            <MenuItems onClick={rentModal.onOpen} label="Rent my Home"/>
                            <hr/>
                            <MenuItems onClick={() => signOut()} label="Logout"/>                      
                        </> 
                    ):(
                       <>
                           <MenuItems onClick={loginModal.onOpen} label="Login"/>
                           <MenuItems onClick={registerModal.onOpen} label="SignUp"/>                      
                       </> 
                    )}
                </div>
            </div>
        )}
    </div>
   );
}
 
export default UserMenu;