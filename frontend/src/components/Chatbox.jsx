import { Box } from "@chakra-ui/layout";
import { ChatState } from "../Context/ChatProvider";
import SingleChat from "./SingleChat";
import "./styles.css";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bgGradient="linear(to-b, #1A202C, #2D3748)" // Gradient background
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
      borderColor="#4A5568"
      color="white"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default Chatbox;
