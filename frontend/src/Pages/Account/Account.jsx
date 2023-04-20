import React from "react";
import { useParams } from "react-router-dom";
import AccountLayout from "./AccountLayout";
import Profile from "./Profile";
import Bookings from "./Bookings";
import Places from "./Places";

function Account() {
  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = "profile";
  }
  console.log("Subpage ", subpage);
  return (
    <AccountLayout subpage={subpage}>
      {subpage === "profile" && <Profile />}
      {subpage === "bookings" && <Bookings />}
      {subpage === "places" && <Places />}
    </AccountLayout>
  );
}

export default Account;
