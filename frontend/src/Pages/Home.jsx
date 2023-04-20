import React, { useEffect } from "react";
import { useUserContext } from "../Hooks/useUserContext";

function Home() {
  const { user } = useUserContext();

  return <div>Home</div>;
}

export default Home;
