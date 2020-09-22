import React, { useState } from "react";
import "./ChatInput.css";
import firebase from "firebase";
import db from "./firebase";
import { useStateValue } from "./StateProvider";

function ChatInput({ channelName, channelId, scrollToBottom }) {
  const [input, setInput] = useState("");
  const [{ user }, dispatch] = useStateValue();

  const sendMessage = (e) => {
    e.preventDefault();

    if (channelId) {
      db.collection('rooms').doc(channelId).collection('messages').add({
        message: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        user: user.displayName,
        userImage: user.photoURL,
      });
      setInput("");
    }
    scrollToBottom();
    
  };

  return (
    <div className="chatInput">
      <form>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message #${channelName?.toLowerCase()}`}
        />
        <button type="submit" onClick={sendMessage} scrollToBottom={scrollToBottom}>
          SEND
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
