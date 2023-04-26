import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Header from "./Header";
import ConversationArea from "./ConversationArea";
import InputArea from "./InputArea";
import { Box } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";

function Chatbot() {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const sendMessage = async () => {
    if (message.trim() !== "") {
      setConversation((prev) => [...prev, { role: "user", content: message }]);
      setMessage("");

      let chatBotApi = process.env.REACT_APP_FIREBASE_CHATBOT_API_URL || "http://localhost:4000/chatbot";

      try {
        const response = await axios.post(chatBotApi, {
          userId: user.uid,
          message,
        });
        console.log(response.data);

        if (response.data.success) {
          setConversation((prev) => [...prev, { role: "assistant", content: response.data.message }]);
        } else {
          setConversation((prev) => [...prev, { role: "error", content: response.data.message }]);
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <>
      <Box height={isSmallScreen ? "calc(100svh - 58px)" : "calc(100svh - 64px)"} display="flex" flexDirection="column" overflow="hidden">
        {" "}
        <Header />
        <ConversationArea conversation={conversation} />
        <InputArea message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </Box>
    </>
  );
}

export default Chatbot;
