import Link from "next/link";
import Image from "next/image";
import User from "./user";
import logo from "../app/logo.png"
import { BsStars } from "react-icons/bs";

export default function NavBar() {
  return (
    <>
      <div className="h-[56px] align-middle pt-3 pb-3 mt-1 mb-1 flex flex-row content-center w-full font-sans text-white z-20">
        <Image
          className="mt-[1px] h-[30px] mr-2"
          src={logo}
          height={30}
          width={30}
          alt="logo"
        />
        <p className="text-xl font-semibold mr-4 sm:block lg:block md:block hidden">ibpseudo</p>
        <div className="flex flex-row space-x-2">
          <Link
            className="bg-lightgray/70 w-20 mt-[6px] rounded-full h-5 text-[13px] align-middle flex flex-row justify-center hover:bg-lightgray transition-all border border-gray-400"
            href="/"
          >
            Translator
          </Link>
          <Link
            
            className="bg-lightgray/70 has-tooltip mt-[6px] w-12 rounded-full h-5 text-[13px] align-middle flex flex-row justify-center hover:bg-lightgray transition-all border border-lightaccent"
            href="/chat"
          >
            <span className='tooltip flex flex-row items-center rounded shadow-lg pl-1 pr-1 bg-lightgray text-white ml-[120px]'><BsStars className="mr-1"/>New!</span>
            Chat
          </Link>

          {/* <Link
            className="bg-lightgray/70 w-14 mt-[6px] rounded-full h-5 text-[13px] align-middle flex flex-row justify-center hover:bg-lightgray transition-all border border-gray-400"
            href="/pricing"
          >
            Pricing
          </Link> */}
        </div>
        <div className=" ml-auto">
          <User />
        </div>
      </div>
    </>
  );
}
