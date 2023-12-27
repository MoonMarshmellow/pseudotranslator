"use client";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Login from "./login";
import SignUp from "./signup";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import Profile from "./profile";
import OAuthButtons from "./oauthbuttons";

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
          <Transition.Root show={open} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              initialFocus={cancelButtonRef}
              onClose={setOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-700  bg-opacity-75 transition-opacity" />
              </Transition.Child>

              <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
                <div className="  flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                    <Dialog.Panel className="relative  border-2 border-accent transform overflow-hidden rounded-lg bg-bg text-left shadow-xl  transition-all sm:my-8 sm:w-full sm:max-w-lg">
                      <div className="bg-bg px-4 pb-4pt-5 sm:p-6 sm:pb-4">
                        <div className="flex flex-col justify-center align-middle items-center mt-3 text-center w-full sm:mt-0 sm:text-left">
                          <Dialog.Title
                            as="h1"
                            className="text-base text-center font-sans font-semibold leading-6 text-white"
                          >
                            {login ? "Login" : "Sign Up"}
                          </Dialog.Title>
                          <OAuthButtons />
                          {login ? (
                            <Login modal={setOpen} />
                          ) : (
                            <SignUp modal={setOpen} />
                          )}
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
        </>
      )}
    </>
  );
}
