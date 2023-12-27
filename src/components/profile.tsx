import { User, signOut } from "firebase/auth";
import { FaUserCircle } from "react-icons/fa";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { auth } from "@/firebase/firebase";
import { CiSettings } from "react-icons/ci";
import { MdOutlineLogout } from "react-icons/md";
import Link from "next/link";

type ProfileProps = {
  user: User | null;
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Profile({ user }: ProfileProps) {
  const logout = async () => {
    await signOut(auth);
    //clear community state
  };
  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="flex justify-center content-center items-center">
          <div>{user?.displayName || user?.email?.split("@")[0]}</div>
          {user?.photoURL ? (
            <img className="rounded-full w-8 ml-2" src={user.photoURL} />
          ) : (
            <FaUserCircle className="text-[20px] ml-2 mt-1" />
          )}
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-lightgray shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/account"
                    className={classNames(
                      active ? "bg-accent/50 text-white" : "text-white",
                      "flex items-center flex-row px-4 py-2 text-sm transition-colors"
                    )}
                  >
                    <p>Account settings</p>
                    <CiSettings className="ml-auto" />
                  </Link>
                )}
              </Menu.Item>

              <form method="POST" action="#">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={logout}
                      className={classNames(
                        active ? "bg-accent/50 text-white" : "text-white",
                        "flex items-center flex-row w-full px-4 py-2 text-left text-sm transition-colors"
                      )}
                    >
                      <p>Sign out</p>
                      <MdOutlineLogout className="ml-auto" />
                    </button>
                  )}
                </Menu.Item>
              </form>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}
