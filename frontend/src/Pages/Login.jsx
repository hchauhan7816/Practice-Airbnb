import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import { useLogin } from "../Hooks/useLogin";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { setUser } = useContext(UserContext);
  const { login, error, isLoading } = useLogin();

  async function handleLoginSubmit(e) {
    e.preventDefault();

    try {
      const data = { email: email, password: password };
      console.log("data -> ", data);

      await login(data);

      // console.log(responseData);

      // if (responseData.status !== 200) {
      //   throw new Error(responseData.data.error);
      // }

      // setUser(responseData.data.data.user);

      // setRedirect(true);

      // console.log(responseData.data.data.user);

      // alert(responseData.data.message);
    } catch (e) {
      alert("Can't Login ", error.message);
      console.log("error -> ", error);
      // console.log(e);
      // if (e.response.data.error === "") {
      //   alert("Unable to login!");
      // } else {
      //   alert(e.response.data.error);
      // }
      // console.log(e.response);
    }
  }

  return (
    <div className="flex flex-col gap-6 mx-auto grow w-full justify-center mb-32">
      <h1 className="text-4xl text-center">Login</h1>
      <form className="flex flex-col gap-4 mx-auto w-full max-w-sm">
        {email}
        {password}
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
          className="w-full bg-primary px-4 py-2 rounded-2xl text-white"
        >
          Login
        </button>
        <div className="text-center">
          Don't have an account yet?{" "}
          <Link to={"/signup"} className="underline">
            Register now
          </Link>
        </div>
        {error && <div className="error text-center"> Error ! {error}</div>}
      </form>
    </div>
  );
}

export default Login;
