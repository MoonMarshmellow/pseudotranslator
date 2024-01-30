import NavBar from "@/components/navbar";
import Translator from "@/components/translator";
import { FaXTwitter } from "react-icons/fa6";

export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center content-center border-red-500 border-0">
        <div className="flex flex-col">
          <Translator />
          <div className="mt-8 text-[#ec5bff] text-lg font-bold font-sans">
            <p>What is IbPseudo?</p>
          </div>
          <div className="text-md text-white font-sans">
            <p>
              IbPseudo is the <p className="font-bold inline-block">all in one</p> AI platform for working with the IB Pseudocode platform used in the IB Computer Science course. 
              It is built to help you better learn and understand how write code for the IBDP.
            </p>
          </div>
          <div className="mt-4 text-[#ec5bff] text-lg font-bold font-sans">
            <p>How does it work?</p>
          </div>
          <div className="text-md text-white font-sans">
            <p>
              Translation and chat are powered by state of the art <p className="font-bold inline-block">AI language systems</p> that
              have been trained on the syntax of the IB pseudocode. Code
              tranlated into Python or Javascript using the translator can be run.
              Similarly, code generated by chat follows all the rules of the IB pseudocode set by the IBO.
            </p>
          </div>
        <div className="w-full text-center text-white font-sans font-semibold mt-10">
        <p>Built for IB students, by IB students.</p>
        </div>
        </div>
      </div>
    </>
  );
}
