import NavBar from "@/components/navbar";
import Translator from "@/components/translator";
import { FaXTwitter } from "react-icons/fa6";

export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center content-center border-red-500 border-0">
        <div className="flex flex-col border-0 border-green-600 lg:w-3/4 md:w-3/4 sm:w-full">
          <NavBar />
          <Translator />
          <div className="mt-8 text-[#ec5bff] text-lg font-bold font-sans">
            <p>What is PseudoTranslator?</p>
          </div>
          <div className="text-md text-white font-sans">
            <p>
              This translator lets you convert IB Pseudocode to Python or
              Javascript and back. Designed with IB computer science students in
              mind, converted code follows the rules and syntax of the IB
              pseudocode language so that translated code always fits your
              needs.
            </p>
          </div>
          <div className="mt-4 text-[#ec5bff] text-lg font-bold font-sans">
            <p>How does it work?</p>
          </div>
          <div className="text-md text-white font-sans">
            <p>
              Translation is powered by state of the art AI language models that
              have been trained on the syntax of the IB pseudocode. Code
              tranlated into Python or Javascript can be run.
            </p>
          </div>
        </div>
      </div>
      <div className=" absolute w-full flex justify-center mb-1 mt-20">
        <div className="absolute w-full flex justify-center">
          <p className="text-gray-500 font-sans text-sm">
            Created by Marios Katzigkas
          </p>
          <div className="text-gray-200 mt-[3px] ml-1">
            <a href="https://twitter.com/MariosKatzigkas" target="_blank">
              <FaXTwitter />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
