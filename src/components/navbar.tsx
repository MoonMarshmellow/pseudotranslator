import Link from "next/link";
import Image from "next/image";
import User from "./user";

export default function NavBar() {
  return (
    <>
      <div className="align-middle pt-3 pb-3 mt-1 mb-1 flex flex-row content-center w-full font-sans text-white z-20">
        <Image
          className="mt-[1px] h-[30px] mr-2"
          src="/icon.png"
          height={30}
          width={30}
          alt="logo"
        />
        <p className="text-xl font-semibold mr-4">ibpseudo.com</p>
        <div className="flex flex-row space-x-2">
          <Link
            className="bg-lightgray/70 w-20 mt-[6px] rounded-full h-5 text-[13px] align-middle flex flex-row justify-center hover:bg-lightgray transition-all border border-gray-400"
            href="/"
          >
            Translator
          </Link>
          <Link
            className="bg-lightgray/70 w-12 mt-[6px] rounded-full h-5 text-[13px] align-middle flex flex-row justify-center hover:bg-lightgray transition-all border border-gray-400"
            href="/chat"
          >
            Chat
          </Link>
          <Link
            className="bg-lightgray/70 w-14 mt-[6px] rounded-full h-5 text-[13px] align-middle flex flex-row justify-center hover:bg-lightgray transition-all border border-gray-400"
            href="/pricing"
          >
            Pricing
          </Link>
        </div>
        <div className=" ml-auto">
          <User />
        </div>
      </div>
    </>
  );
}
