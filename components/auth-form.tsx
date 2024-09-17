"use client";
import { auth } from "@/actions/auth-actions";
import Image from "next/image";
import Link from "next/link";
import { useFormState } from "react-dom";
const initialState = {
  errors: {},
};
export default function AuthForm({ mode }: { mode: string }) {
  const [state, formAction] = useFormState<
    {
      errors: { [key: string]: string };
    },
    FormData
  >(auth.bind(null, mode), initialState);
  return (
    <form id="auth-form" action={formAction}>
      <div className=" flex items-center justify-center pb-4">
        <div className="relative w-[100px] h-[100px]">
          <Image src="/images/auth-icon.jpg" alt="A lock icon" fill />
        </div>
      </div>
      <p className="pb-4">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </p>
      <p className="pb-4">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </p>
      {state.errors && (
        <ul id="form-errors">
          {Object.keys(state.errors).map((err) => (
            <li key={err}>{state.errors[err]}</li>
          ))}
        </ul>
      )}
      <p className="pb-4">
        <button type="submit">
          {mode === "login" ? "Login" : "Create Account"}
        </button>
      </p>
      <p>
        {mode === "login" ? (
          <Link href="/?mode=signup">Create an account.</Link>
        ) : (
          <Link href="/?mode=login">Login with existing account.</Link>
        )}
      </p>
    </form>
  );
}
