import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { AuthContext } from "../conext/AuthContext";
import { auth } from "../firebase";

const Navbar = () => {
  const { curentUser } = useContext(AuthContext);
  console.log(curentUser);

  return (
    <div className="navbar">
      <span className="logo">Chat App</span>
      <div className="user">
        <img src={curentUser.photoURL} alt="" />
        <span>{curentUser.displayName}</span>
        <button
          onClick={() => {
            signOut(auth);
          }}
        >
          log out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
