"use client";

import SignUpModal from "@/components/signupmodal";
import { auth, firestore, functions } from "@/firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useAuthState, useUpdateProfile } from "react-firebase-hooks/auth";
import { AiOutlineLoading } from "react-icons/ai";
import usePremiumStatus from "../../../stripe/usePremiumStatus";
import { PiLightningFill } from "react-icons/pi";
import Link from "next/link";
import { getPortalUrl } from "../../../stripe/createCheckOutSession";
import { useRouter } from "next/navigation";

export default function Account() {
  const [user] = useAuthState(auth);
  const [updateProfile, updating, error] = useUpdateProfile(auth);
  const [displayName, setDisplayName] = useState("");
  const [uses, setUses] = useState(0);
  const premium = usePremiumStatus(user);
  const [open, setOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const cancelButtonRef = useRef(null);
  const router = useRouter();

  const manageSubscription = async () => {
    setLoading(true);
    const portalUrl = await getPortalUrl(auth, functions);
    setLoading(false);
    router.push(portalUrl);
  };

  useEffect(() => {
    async function getUses() {
      const docRef = doc(firestore, "users", user!.uid);
      const userDoc = await getDoc(docRef);
      const data = userDoc.data();
      setUses(data?.uses);
    }
    if (user) {
      getUses();
    }
  }, [user]);
  return (
    <>
      {user ? (
        <>
          <div className="text-white text-2xl font-sans">
            Hi {user?.displayName || user?.email?.split("@")[0]},
          </div>
          <div className="text-white text-lg font-sans">
            <div>Manage your account here:</div>
          </div>
          <div className="flex flex-col mt-3 font-sans">
            <div className="flex flex-col mb-2">
              <div className="text-gray-300 mb-1">Display Name: </div>
              <div className="text-white">
                <input
                  className="mr-2 transition-all shadow appearance-none  bg-lightgray border border-lightgray rounded-md py-1 px-2 text-sm text-white leading-tight hover:bg-lightgray/80 focus:outline-none focus:border-white focus:shadow-outline"
                  type="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder={user?.displayName || user?.email?.split("@")[0]}
                />
                {updating ? (
                  <button className="transition-all font-sans text-sm p-1 items-center w-10 justify-center  h-full text-center bg-bg text-white hover:bg-accent/70 rounded-md">
                    <AiOutlineLoading className="animate-spin" />
                  </button>
                ) : (
                  <button
                    className="transition-all h-full font-sans text-sm p-1 text-center bg-[#5b5b5b] text-white hover:bg-lightgray rounded-md"
                    onClick={async () => {
                      await updateProfile({ displayName });
                      const docRef = doc(firestore, "users", user!.uid);
                      await updateDoc(docRef, { displayName: displayName });
                    }}
                  >
                    Update
                  </button>
                )}
              </div>
            </div>
            <div className="flex flex-col mb-2">
              <div className="text-gray-300">Email: </div>
              <div className="text-white">{user.email}</div>
            </div>
            <div className="flex flex-col mb-2">
              <div className="text-gray-300">Uses Left: </div>
              <div className="text-white">{premium ? "Unlimited" : uses}</div>
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm font-sans">{error.message}</p>
          )}

          <div className="text-white text-lg font-sans mt-3">
            <div>Billing</div>
          </div>
          {premium ? (
            <>
              <div className="flex space-x-1 mb-2 mt-2">
                <div className="text-gray-300">Current Plan: </div>
                <div className="text-white">Premium</div>
              </div>
              {loading ? (
                <button className="transition-all w-[155px] h-7 cursor-default flex flex-row justify-center items-center bg-[#5b5b5b] text-sm pt-1 pb-1 pl-2 pr-2 text-white rounded-md">
                  <AiOutlineLoading className="animate-spin" />
                </button>
              ) : (
                <button
                  onClick={manageSubscription}
                  className="transition-all cursor-default flex flex-row items-center bg-[#5b5b5b] text-sm pt-1 pb-1 pl-2 pr-2 hover:bg-lightgray text-white rounded-md"
                >
                  Manage Subscription
                </button>
              )}
            </>
          ) : (
            <div className="text-gray-300">
              <div className="mb-1 mt-2">You are not currently subscribed.</div>
              <Link
                href="/pricing"
                className="transition-all w-[105px] flex flex-row items-center bg-gradient-to-r from-[#a560ff] to-[#e008fc] text-md pt-1 pb-1 pl-2 pr-2 hover:scale-105 text-white rounded-md font-semibold"
              >
                <p>Upgrade</p>
                <PiLightningFill className="ml-[4px] mt-[1px]" />
              </Link>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="flex justify-center">
            <div className="flex flex-col justify-center text-center text-white">
              <div className="mb-2">You are not logged in.</div>
              <div className="flex flex-row  space-x-2 font-sans">
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
            </div>
          </div>
        </>
      )}
    </>
  );
}
