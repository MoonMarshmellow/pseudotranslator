import { auth } from "@/firebase/firebase";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { FcGoogle } from "react-icons/fc";

export default function OAuthButtons() {
  const [signInWithGoogle, userCred, loading, error] =
    useSignInWithGoogle(auth);

  return (
    <>
      <button
        onClick={() => {
          signInWithGoogle();
        }}
        className="flex text-gray-500 bg-white text-sm items-center font-sans font-semibold p-1 rounded-md mt-2 space-x-1"
      >
        <p>Continue with Google</p>
        <FcGoogle className="text-lg" />
      </button>
    </>
  );
}
