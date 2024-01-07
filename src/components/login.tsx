"use client";

import { auth } from "@/firebase/firebase";
import { useEffect, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

type LoginProps = {
  modal: (open: boolean) => void;
};

export default function Login({ modal }: LoginProps) {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  //Firebase Logic

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signInWithEmailAndPassword(loginForm.email, loginForm.password);
    if (!error) {
      modal(false);
    }
  };
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {
    console.log(error?.message);
  }, [error]);
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
          className=" transition-all shadow appearance-none  bg-lightgray border border-lightgray rounded-md w-full py-2 px-3 text-sm text-white leading-tight hover:bg-lightgray/80 focus:outline-none focus:border-white focus:shadow-outline"
        ></input>
        {error && <p className="text-red-500">{error.message}</p>}
        <button
          type="submit"
          className="text-white transition-all font-semibold pt-1 pb-1 text-center bg-accent hover:bg-accent/70 rounded-md mt-4 lg:mb-0 md:mb-0 mb-4"
        >
          Log In
        </button>
      </div>
    </form>
  );
}
