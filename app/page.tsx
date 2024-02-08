'use client'

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";



export default  function Home() {



  const router = useRouter()
  const handleClick = () => {
    router.push('/login')
  }
  return (
    <main className="flex flex-col items-center justify-center w-[100vw] h-[100vh] gap-4">
      <div className="text-5xl font-bold">
        Amu Sahityotsav 
      </div>
      <span className="text-2xl font-semibold">Feb 10, 11, 12</span>
      
        <Button onClick={handleClick} className="text-black" variant={"outline"}>Login</Button>
      
        
    
    </main>
  );
}
