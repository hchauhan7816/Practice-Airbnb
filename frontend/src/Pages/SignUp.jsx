import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useSignup } from "../Hooks/useSignup";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isLoading, error } = useSignup();

  async function handleLoginSubmit(e) {
    e.preventDefault();

    try {
      const data = { name: name, email: email, password: password };
      console.log("data => ", data);

      await signup(data);
      // const responseData = await axios.post(
      //   "http://127.0.0.1:4000/api/user/signup",
      //   data
      // );
      // if (responseData.status !== 200) {
      //   throw new Error(responseData.data.error);
      // }

      // alert(responseData.data.message, responseData.data.error);
    } catch (error) {
      alert("Can't Signup ", error.message);
      console.log("error -> ", error);
    }
  }

  return (
    <div className="flex flex-col gap-6 mx-auto grow w-full justify-center mb-32">
      <h1 className="text-4xl text-center">Signup</h1>
      <form className="flex flex-col gap-4 mx-auto w-full max-w-sm">
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-400 rounded-2xl py-2 px-4 w-full"
        />
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-400 rounded-2xl py-2 px-4 w-full"
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-400 rounded-2xl py-2 px-4 w-full"
        />
        <button
          onClick={handleLoginSubmit}
          disabled={isLoading}
          className="w-full bg-primary px-4 py-2 rounded-2xl text-white"
        >
          Login
        </button>
        <div className="text-center">
          Already have an account?{" "}
          <Link to={"/login"} className="underline">
            Login now
          </Link>
        </div>
        {error && <div className="error text-center"> Error ! {error}</div>}
      </form>
    </div>
  );
}

export default SignUp;
