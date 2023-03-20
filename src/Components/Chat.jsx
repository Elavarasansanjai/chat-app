import React, { useContext } from "react";
import { RiVidiconLine } from "react-icons/ri";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FiMoreVertical } from "react-icons/fi";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../conext/ChatContext";
const Chat = () => {
  const { data } = useContext(ChatContext);
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user.displayName}</span>
        <div className="chatIcon">
          <div className="icons">
            <RiVidiconLine />
          </div>
          <div className="icons">
            <AiOutlineUserAdd />
          </div>
          <div className="icons">
            <FiMoreVertical />
          </div>
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
