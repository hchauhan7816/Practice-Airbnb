import React from "react";
import AccountNavbar from "../../Components/AccountNavbar/AccountNavbar";

function AccountLayout({ subpage, children }) {
  return (
    <div className="min-h-full min-w-full flex flex-col mt-2 gap-4">
      <AccountNavbar subpage={subpage} />
      {children}
    </div>
  );
}

export default AccountLayout;
