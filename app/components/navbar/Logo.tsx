'use client';

import { useRouter } from "next/navigation";
import Image from "next/image";
const Logo = () => {
  const router = useRouter();

  return ( 
    <div
      onClick={() => router.push('/')}
      className="md:block cursor-pointer text-green-500 text-5xl flex flex-cols"
    >
    <Image src="/images/logo.png" width={80} height={80} alt="StayEase"/>
    </div>
   );
}
 
export default Logo;