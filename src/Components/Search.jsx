import React, { useContext, useState } from "react";
import {
  collection,
  doc,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  getDoc,
} from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../conext/AuthContext";
import Spinner from "./Spinner/Spinner";
const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const { curentUser } = useContext(AuthContext);
  const [spinner, setSpinner] = useState(false);
  const handleSearch = async () => {
    //search doc: query
    setSpinner(true);
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots

        setUser(doc.data());
        setSpinner(false);
      });
    } catch {
      setErr(true);
      setSpinner(false);
      // console.log(err);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };
  const handleSelect = async () => {
    const combainedId =
      curentUser.uid > user.uid
        ? curentUser.uid + user.uid
        : user.uid + curentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combainedId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combainedId), { messages: [] });

        //crete user chats

        await updateDoc(doc(db, "userChats", curentUser.uid), {
          [combainedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combainedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [combainedId + ".userInfo"]: {
            uid: curentUser.uid,
            displayName: curentUser.displayName,
            photoURL: curentUser.photoURL,
          },
          [combainedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      console.log(err);
      setErr(true);
    }
    setUser(null);
    setUsername("");
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      {spinner && <Spinner />}
      {err && <span>User not found!...</span>}
      {user && (
        <div onClick={handleSelect} className="userChat">
          <img src={user.photoURL} />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
