import React, { useState, useEffect } from "react";
import { Flex, Text, Box } from "@chakra-ui/react";

import HostKey from "../../components/host-key/hostKey.component";
import { TextField, styled } from "@mui/material";
import CustomButton from "../../components/custom-button/customButton.component";
import useChat from "../../hooks/useChat";
import { useParams } from "react-router-dom";

import { getMessages, sendMessage } from "../../fireabse/firebase.utils";

const InputBar = styled(TextField)(() => ({
  width: "50vw",
  "& input": {
    padding: "8px 25px",
  },
  "& label.Mui-focused": {
    color: "green",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#000",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "30px",
    "& fieldset": {
      borderColor: "#000",
    },
    "&:hover fieldset": {
      borderColor: "#000",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#000",
    },
  },
}));

const Chat2 = () => {
  const { getChatroom } = useChat();
  const { id } = useParams();
  const [currentText, setCurrentText] = useState("");
  const [data, setData] = useState({
    messageBoxId: "",
  });
  const [messages,setMessages] = useState([]);


  const handleTextChange = (e) => {
    setCurrentText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(data.messageBoxId, currentText);
    setCurrentText("");
  };

  useEffect(() => {
    getChatroom(id).then((res) => {
      console.log(res, "in here");
      setData({ ...data, messageBoxId: res.messageBoxId });
    });
  }, [id]);

  useEffect(() => {
    if (data.messageBoxId) {
      getMessages(data.messageBoxId)
      .then(res => {
          console.log(res,"in here");
          setMessages(res);
      })
    }
  }, [data.messageBoxId]);

  return (
    <Flex
      width="60%"
      height="85%"
      margin="20px auto"
      boxShadow="0px 7.71233px 19.2808px rgba(35, 35, 35, 0.2)"
    >
      <Flex direction="column" width="100%">
        <Flex
          height="40px"
          borderBottom="1px solid black"
          alignItems="center"
          padding="0 20px"
        >
          <Text fontWeight={600} fontSize="1.2em" color="#4CAF50">
            CHAT
          </Text>
        </Flex>
        <Flex width="100%" flex="1" flexDirection="column" overflow="scroll">
            {
                messages.map(a => <Text margin="10px" backgroundColor="#4CAF50" width="fit-content" padding="5px 10px" borderRadius="10px 10px 10px 0px" color="#fff" >{a.text}</Text>)
            }
        </Flex>
        <Flex height="50px" alignItems="center" justify="space-around">
          <form onSubmit={handleSubmit}>
            <InputBar
              autoFocus
              value={currentText}
              onChange={handleTextChange}
            />
            <CustomButton sx={{ padding: "7px 30px" }} type="submit">
              SEND
            </CustomButton>
          </form>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Chat2;
