"use client";

import { auth, firestore } from "@/firebase/firebase";
import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";

type SignUpProps = {
  modal: (open: boolean) => void;
};

export default function SignUp({ modal }: SignUpProps) {
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [createUserWithEmailAndPassword, userCred, loading, userError] =
    useCreateUserWithEmailAndPassword(auth);

  //Firebase Logic

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (error) setError("");
    console.log(error);
    if (signUpForm.password !== signUpForm.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const user = await createUserWithEmailAndPassword(
      signUpForm.email,
      signUpForm.password
    );
    if (user) {
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
    modal(false);
  };
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="mt-4 flex flex-col ">
        <input
          required
          name="email"
          placeholder="Email"
          type="email"
          onChange={onChange}
          className="mb-2 transition-all shadow appearance-none  bg-lightgray border border-lightgray rounded-md w-full py-2 px-3 text-sm text-white leading-tight hover:bg-lightgray/80 focus:outline-none focus:border-white focus:shadow-outline"
          id="username"
        ></input>
        <input
          required
          name="password"
          placeholder="Password"
          type="password"
          onChange={onChange}
          className="mb-2 transition-all shadow appearance-none  bg-lightgray border border-lightgray rounded-md w-full py-2 px-3 text-sm text-white leading-tight hover:bg-lightgray/80 focus:outline-none focus:border-white focus:shadow-outline"
        ></input>
        <input
          required
          name="confirmPassword"
          placeholder="Confirm Password"
          type="password"
          onChange={onChange}
          className=" transition-all shadow appearance-none  bg-lightgray border border-lightgray rounded-md w-full py-2 px-3 text-sm text-white leading-tight hover:bg-lightgray/80 focus:outline-none focus:border-white focus:shadow-outline"
        ></input>
        <div className="text-sm text-red-500 text-center">
          {userError && <p>{userError.message}</p>}
          {error != "" && <p>{error}</p>}
        </div>
        <button
          type="submit"
          className="text-white transition-all font-semibold pt-1 pb-1 text-center bg-accent hover:bg-accent/70 rounded-md mt-4 lg:mb-0 md:mb-0 mb-4"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
}
