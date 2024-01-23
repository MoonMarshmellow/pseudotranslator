import { auth, firestore } from "@/firebase/firebase";
import { User, UserCredential } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { FcGoogle } from "react-icons/fc";

export default function OAuthButtons() {
  const [signInWithGoogle, userCred, loading, error] =
    useSignInWithGoogle(auth);

  const onSubmit = async (user: UserCredential | undefined) => {
    if (user) {
      const userDocRef = doc(firestore, "users", user?.user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        return;
      }
      const userData = {
        ...user.user,
        accessToken: undefined,
        auth: undefined,
        proactiveRefresh: undefined,
        providerData: undefined,
        reloadUserInfo: undefined,
        stsTokenManager: undefined,
      };
      await fetch("/api/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
    }
  };

  return (
    <>
      <button
        onClick={async () => {
          const user = await signInWithGoogle();
          onSubmit(user);
        }}
        className="flex text-gray-500 bg-white text-sm items-center font-sans font-semibold p-1 rounded-md mt-2 space-x-1"
      >
        <p>Continue with Google</p>
        <FcGoogle className="text-lg" />
      </button>
    </>
  );
}
