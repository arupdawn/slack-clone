import React, { useState, useEffect } from "react";
import "./Chat.css";
import { useParams } from "react-router-dom";
import StarsIcon from "@material-ui/icons/Stars";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import db from "./firebase";
import Message from "./Message";
import ChatInput from "./ChatInput";

function Chat() {
  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [roomMessages, setRoomMessages] = useState([]);

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomDetails(snapshot.data()));
    }

    db.collection("rooms")
      .doc(roomId)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setRoomMessages(snapshot.docs.map((doc) => doc.data()))
      );
  }, [roomId]);

  console.log("Room details:", roomDetails);
  console.log("Room messages:", roomMessages);

  const scrollToBottom = () => {
    let elmnt = document.getElementById("chat__Messages");
    /*window.scrollTo(
      0,
      0
    );*/
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__headerLeft">
          <h4 className="chat__channelName">
            <strong># {roomDetails?.name} </strong>
            <StarBorderIcon />
          </h4>
        </div>

        <div className="chat__headerRight">
          <p className="">
            <InfoOutlinedIcon /> Details
          </p>
        </div>
      </div>

      <div id="chat__Messages" className="chat__messages">
        {roomMessages.map(({ message, timestamp, user, userImage }) => (
          <Message
            message={message}
            timestamp={timestamp}
            user={user}
            userImage={userImage}
          />
        ))}
      </div>
      <div className="">.</div>

      <ChatInput
        channelName={roomDetails?.name}
        channelId={roomId}
        scrollToBottom={scrollToBottom}
      />
    </div>
  );
}

export default Chat;
