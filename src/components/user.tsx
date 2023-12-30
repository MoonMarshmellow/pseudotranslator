"use client";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Login from "./login";
import SignUp from "./signup";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import Profile from "./profile";
import OAuthButtons from "./oauthbuttons";
import SignUpModal from "./signupmodal";

export default function user() {
  const [open, setOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [user, loading, error] = useAuthState(auth);

  const cancelButtonRef = useRef(null);

  return (
    <>
      {user ? (
        <>
          <Profile user={user} />
        </>
      ) : (
        <>
          <div className="flex flex-row basis-1/2 space-x-2 font-sans">
            <button
              onClick={() => {
                setLogin(true);
                setOpen(true);
              }}
              className=" transition-all w-16 h-7 text-center bg-none text-gray-300 hover:text-white hover:bg-lightgray rounded-md"
            >
              Login
            </button>
            <button
              onClick={() => {
                setLogin(false);
                setOpen(true);
              }}
              className="transition-all font-semibold w-20 h-7 text-center bg-accent text-white hover:bg-accent/70 rounded-md"
            >
              Sign Up
            </button>
          </div>
          <SignUpModal
            open={open}
            setOpen={setOpen}
            login={login}
            cancelButtonRef={cancelButtonRef}
          />
        </>
      )}
    </>
  );
}
