"use client";

import { auth } from "@/firebase/firebase";
import { useState, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import SignUpModal from "./signupmodal";
import { PiLightningFill } from "react-icons/pi";
import { createCheckoutSession } from "../../stripe/createCheckOutSession";
import usePremiumStatus from "../../stripe/usePremiumStatus";
import { AiOutlineLoading } from "react-icons/ai";

export default function PremiumButton() {
  const [user] = useAuthState(auth);
  const userIsPremium = usePremiumStatus(user);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const cancelButtonRef = useRef(null);
  return (
    <>
      {!user ? (
        <button
          onClick={() => setOpen(true)}
          className="transition-all flex flex-row items-center bg-gradient-to-r from-[#a560ff] to-[#e008fc] text-md pt-1 pb-1 pl-2 pr-2 hover:scale-105 text-white rounded-md font-semibold hover:shadow-custom"
        >
          Sign Up
        </button>
      ) : !userIsPremium ? (
        !loading ? (
          <button
            onClick={() => {
              setLoading(true);
              createCheckoutSession(user.uid);
            }}
            className="transition-all flex flex-row items-center bg-gradient-to-r from-[#a560ff] to-[#e008fc] text-md pt-1 pb-1 pl-2 pr-2 hover:scale-105 text-white rounded-md font-semibold"
          >
            <p>Upgrade</p>
            <PiLightningFill className="ml-[4px] mt-[1px]" />
          </button>
        ) : (
          <button className="transition-all  w-20 h-7 flex flex-row justify-center items-center bg-gradient-to-r from-[#a560ff] to-[#e008fc] text-md pt-1 pb-1 pl-2 pr-2 hover:scale-105 text-white rounded-md font-bold">
            <AiOutlineLoading className="animate-spin" />
          </button>
        )
      ) : (
        <button className="transition-all cursor-default flex flex-row items-center bg-[#5b5b5b] text-md pt-1 pb-1 pl-2 pr-2  text-white rounded-md font-semibold">
          Current Plan
        </button>
      )}
      <SignUpModal
        open={open}
        setOpen={setOpen}
        login={login}
        cancelButtonRef={cancelButtonRef}
      />
    </>
  );
}
