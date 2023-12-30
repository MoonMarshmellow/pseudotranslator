"use client";

import { auth } from "@/firebase/firebase";
import { useState, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import SignUpModal from "./signupmodal";
import { PiLightningFill } from "react-icons/pi";

export default function PremiumButton() {
  const [user] = useAuthState(auth);

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
      ) : (
        <button className="transition-all flex flex-row items-center bg-gradient-to-r from-[#a560ff] to-[#e008fc] text-md pt-1 pb-1 pl-2 pr-2 hover:scale-105 text-white rounded-md font-semibold">
          <p>Upgrade</p>
          <PiLightningFill className="ml-[4px] mt-[1px]" />
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
