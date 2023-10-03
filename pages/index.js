import { useEffect, useContext } from 'react';
import { AppContext } from '@/settings/globals';
import Image from 'next/image';
import Link from "next/link";
import { useRouter } from 'next/router';
import { AiOutlineDoubleRight } from 'react-icons/ai'
import { BiHelpCircle } from 'react-icons/bi'

export default function Home() {
  const router = useRouter();
  const { ip, signedIn } = useContext(AppContext);


  console.log(ip, signedIn);
  // console.log(router.query.language);

  // useEffect(()=>{
  //   setTimeout(()=>{
  //     router.push('/account/make-transfer')
  //   },5000)
  // },[]);

  return (
    <>
      
      <div className="h-screen w-full flex flex-col justify-around mobile-bg sm:tablet-bg lg:desktop-bg">
        <Image src="/imgs/bg-mobile.jpg" width={60} height={60} className="h-screen w-full sm:hidden" alt="cover image" />
        <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-4 px-8 sm:px-10 lg:px-24">
          <div className="w-full sm:min-h-[480px] bg-indigo-300/20 py-6 sm:py-10 px-[40px] rounded-lg">
            <h1 className="text-indigo-800 text-4xl sm:text-6xl font-mono font-bold">facepal</h1>
            <h2 className="text-2xl sm:text-3xl mt-4">The Coolest way to connect with friends and hold money!</h2>
          </div>
          <div className="w-full sm:min-h-[480px] flex flex-col gap-5 justify-end">

            <div className="w-full grid grid-cols-2 gap-3">
              <Link href='/auth/signup' className="w-full h-12 bg-violet-950 rounded-lg text-white font-bold gap-4 flex flex-row justify-center items-center">
                Get Started
                <AiOutlineDoubleRight />
              </Link>
              <Link href='#' className="w-full h-12 bg-violet-600 rounded-lg text-white font-bold flex flex-row justify-center items-center gap-4 ">
                Get Help
                <BiHelpCircle />
              </Link>
            </div>

            <p className="text-2xl text-white">Want to become a facepal partner? <Link href="/partner-signup" className="underline">Become a Partner</Link></p>
          </div>
        </div>
      </div>
    </>
  )
}
