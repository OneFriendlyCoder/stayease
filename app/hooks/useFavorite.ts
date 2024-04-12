import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";
import getCurrentUser from '@/app/actions/getCurrentUser';
import axios from "axios";
import { User } from "@prisma/client";
interface IUseFavorite{
    listingId: string;
    currentUser?: User | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        return list.includes(listingId);
    },[currentUser, listingId])


    const toggleFavorite = useCallback(async (e:React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation(); 
        if(!currentUser) {return loginModal.onOpen();}

        try{
            let request;
            if(hasFavorited) {request = () => axios.delete(`/api/favorites/${listingId}`)}  //[] => using dynamic routes
            else {request = () => axios.post(`/api/favorites/${listingId}`)}
        
            await request();
            router.refresh();
            toast.success("Favorited");
        } catch(error){
            toast.error("Something went wrong")
        }
    },[currentUser, hasFavorited, listingId, loginModal, router])

    return {
        hasFavorited,
        toggleFavorite
    }
}

export default useFavorite;
