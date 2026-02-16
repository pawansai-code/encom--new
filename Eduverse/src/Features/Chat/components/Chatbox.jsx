import { Box } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import SingleChat from "./SingleChat";
import "./styles.css";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      className="glass-container anim-fade-in"
      w={{ base: "100%", md: "68%" }}
      borderRadius="2xl"
      borderWidth="1px"
      borderColor="whiteAlpha.100"
      color="white"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default Chatbox;
