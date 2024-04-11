'use client';

import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return ( 
    <div
      onClick={() => router.push('/')}
      className="hidden md:block cursor-pointer text-green-500 text-5xl"
    >
    StayEase
    </div>
   );
}
 
export default Logo;