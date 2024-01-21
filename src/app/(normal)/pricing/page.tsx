import FreeTierButton from "@/components/freetierbutton";
import PremiumButton from "@/components/premiumbutton";
import { auth } from "@/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaCheck } from "react-icons/fa";

export default function Pricing() {
  return (
    <>
      <div className="flex justify-center flex-col w-full border-0 border-green-500">
        <div className="border-0 font-sans font-semibold border-red-500 text-center text-lightaccent text-2xl">
          Pricing
        </div>
        <div className="text-gray-300 text-center mt-1 mb-10">
          Support the project and elevate your grades by subscibing to
          ibpseudo.com
        </div>
        <div className="flex justify-center align-middle ">
          <div className="flex border-0 border-green-500 lg:flex-row md:flex-row content-center flex-col-reverse justify-center align-middle lg:space-x-4 md:space-x-4 lg:space-y-0 md:space-y-0 space-y-10">
            <div className="p-2 pl-3 font-sans w-[230px] flex flex-col justify-center border-gray-500 border bg-lightgray/50 rounded-lg">
              <div className="text-gray-300 pb-1">Free</div>
              <div className="flex flex-row pb-1">
                <div className="text-white font-bold text-4xl">$0</div>
                <div className="flex mb-auto text-gray-300 ml-1 mt-4">/mo</div>
              </div>
              <div className="text-gray-300">Includes:</div>
              <div className="flex flex-col text-white text-sm">
                <div className="flex flex-row items-center">
                  <FaCheck className="mr-1 text-green-400" />
                  <p>Access to Translator</p>
                </div>
                <div className="flex flex-row items-center">
                  <FaCheck className="mr-1 text-green-400" />
                  <p>Access to AI Chat</p>
                </div>
                <div className="flex flex-row items-center">
                  <FaCheck className="mr-1 text-green-400" />
                  <p>20 Translations/Chat Messages</p>
                </div>
                <div className="flex flex-row items-center ml-4">
                  <p>/month</p>
                </div>
                <div className="mt-2 mb-1 flex justify-center">
                  <FreeTierButton />
                </div>
              </div>
            </div>
            <div className="transition-all shadow-card hover:shadow-card2 hover:scale-[113%] font-sans scale-110 w-[230px] flex flex-col justify-center bg-gradient-to-b from-[#a560ff] to-[#e008fc] bg-lightgray/50 rounded-lg">
              <div className="font-sans m-[2px] pl-3 h-full bg-lightgray/90 w-[226px] flex flex-col justify-center rounded-[7px]">
                <div className="text-[#a560ff] pb-1">Premium</div>
                <div className="flex flex-row pb-1">
                  <div className="text-white font-bold text-4xl">$5</div>
                  <div className="flex mb-auto text-gray-300 ml-1 mt-4">
                    /mo
                  </div>
                </div>
                <div className="text-gray-300">Includes:</div>
                <div className="flex flex-col text-white text-sm">
                  <div className="flex flex-row items-center">
                    <FaCheck className="mr-1 text-green-400" />
                    <p>Access to Translator</p>
                  </div>
                  <div className="flex flex-row items-center">
                    <FaCheck className="mr-1 text-green-400" />
                    <p>Access to AI Chat</p>
                  </div>
                  <div className="flex flex-row items-center">
                    <FaCheck className="mr-1 text-green-400" />
                    <p>Unlimited Translations</p>
                  </div>
                  <div className="flex flex-row items-center">
                    <FaCheck className="mr-1 text-green-400" />
                    <p>Unlimited Chat Messages</p>
                  </div>
                  <div className="mt-2 mb-1 mr-4 flex justify-center">
                    <PremiumButton />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
