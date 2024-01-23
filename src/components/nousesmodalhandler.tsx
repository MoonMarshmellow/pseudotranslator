import { useAuthState } from "react-firebase-hooks/auth";
import NoUsesModal from "./nousesmodal";
import { auth } from "@/firebase/firebase";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";

type ModalData = {
  title: string;
  body: string;
  buttonText: string;
};

type ModalHandlerProps = {
  open: boolean;
  setOpen: (boolean: boolean) => void;
};
const modalData: ModalData[] = [
  {
    title: "Oops! You ran out of uses!",
    body: "To reduce costs, anonymous users are limited to 5 translations or chat messages a month. To increase your monthly uses consider creating an account below!",
    buttonText: "Sign up",
  },
  {
    title: "Thank you for using ibpseudo.com",
    body: "Running this site is quite expensive so the amount of translations or chat messages free users can send are limited to 20 a month. To get unlimited translations and chat messages consider subscribing to the Premium Plan!",
    buttonText: "Lets go!",
  },
];

export default function NoUsesModalHandler({
  open,
  setOpen,
}: ModalHandlerProps) {
  const [user] = useAuthState(auth);
  const checkShow = (user: User | null | undefined, open: boolean) => {
    if (open && user) {
      return 1;
    } else if (open && !user) {
      return 0;
    }
    return 0;
  };

  const show = checkShow(user, open);

  return (
    <>
      <NoUsesModal
        title={modalData[show].title}
        body={modalData[show].body}
        buttonText={modalData[show].buttonText}
        setOpen={setOpen}
        open={open}
      />
    </>
  );
}
