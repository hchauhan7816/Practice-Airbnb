import React from "react";
import { useUserContext } from "../../Hooks/useUserContext";
import { useLogout } from "../../Hooks/useLogout";

function Profile() {
  const { user } = useUserContext();
  const { logout } = useLogout();
  console.log("USER ", user);
  return (
    <div className="flex flex-col mt-10 w-full max-w-md items-center justify-center gap-6">
      <div>You are logged in as {user.user.name}</div>
      <button
        className="bg-primary rounded-full py-2 px-6 text-white w-full"
        onClick={() => logout()}
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;
