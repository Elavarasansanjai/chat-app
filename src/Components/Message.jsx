import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../conext/AuthContext";
import { ChatContext } from "../conext/ChatContext";

const Message = ({ message }) => {
  // console.log(message);
  const { curentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  return (
    <div
      ref={ref}
      className={`message ${message.senderId === curentUser.uid && "owner"} `}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === curentUser.uid
              ? curentUser.photoURL
              : data.user.photoURL
          }
        />
        <span>just Now</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} />}
      </div>
    </div>
  );
};

export default Message;
