"use client"

import Categories from "./Categories";
interface NavbarProps{
  currentUser?: User | null;               
}

import { User } from "@prisma/client";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./Usermenu";
import { SafeUser } from "@/app/types";
const Navbar:React.FC<NavbarProps> = ({currentUser}) => {
  return ( 
    <div className="fixed w-full z-10 bg-[#a8d4e4]/80">
      <div className="py-4">
      <Container>
        <div 
          className="
            flex 
            flex-row 
            items-center 
            justify-between
            md:gap-0
          "
        >
            <Logo/>
            <Search />
            <UserMenu currentUser={currentUser}/>
        </div>
      </Container>
    </div>
    <hr />
    <Categories />
  </div>
  );
}


export default Navbar;