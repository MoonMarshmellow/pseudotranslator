"use client";

import { auth } from "@/firebase/firebase";
import { useState, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import SignUpModal from "./signupmodal";

export default function FreeTierButton() {
  const [user] = useAuthState(auth);

  const [open, setOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const cancelButtonRef = useRef(null);
  return (
    <>
      {user ? (
        <button className="transition-all cursor-default flex flex-row items-center bg-[#5b5b5b] text-md pt-1 pb-1 pl-2 pr-2  text-white rounded-md font-semibold">
          Current Plan
        </button>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="transition-all flex flex-row items-center bg-gradient-to-r from-[#a560ff] to-[#e008fc] text-md pt-1 pb-1 pl-2 pr-2 hover:scale-105 text-white rounded-md font-semibold hover:shadow-custom"
        >
          Sign Up
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
