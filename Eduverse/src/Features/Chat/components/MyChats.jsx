import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getSender } from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      className="glass-container anim-fade-in"
      flexDir="column"
      alignItems="center"
      p={4}
      w={{ base: "100%", md: "31%" }}
      borderRadius="2xl"
      borderWidth="1px"
      borderColor="whiteAlpha.100"
      color="white"
    >
      <Box
        pb={4}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Inter"
        fontWeight="extrabold"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text bgGradient="linear(to-r, #00c6ff, #0072ff)" bgClip="text">
          My Chats
        </Text>
        <GroupChatModal>
          <Button
            display="flex"
            fontSize={{ base: "17px", md: "10px", lg: "14px" }}
            rightIcon={<AddIcon />}
            bgGradient="linear(to-r, #7928CA, #FF0080)"
            color="white"
            fontWeight="bold"
            _hover={{ transform: "scale(1.05)", filter: "brightness(1.1)", boxShadow: "0 0 15px rgba(255, 0, 128, 0.4)" }}
            _active={{ transform: "scale(0.95)" }}
            transition="all 0.2s"
            borderRadius="xl"
            px={4}
          >
            New Group
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="whiteAlpha.50"
        w="100%"
        h="100%"
        borderRadius="xl"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll" pr={1}>
            <AnimatePresence>
              {chats.map((chat) => (
                <motion.div
                  key={chat._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Box
                    onClick={() => setSelectedChat(chat)}
                    cursor="pointer"
                    bg={selectedChat === chat ? "linear-gradient(135deg, #7928CA 0%, #FF0080 100%)" : "whiteAlpha.100"}
                    color="white"
                    px={4}
                    py={3}
                    borderRadius="xl"
                    className="glass-card"
                    mb={2}
                    boxShadow={selectedChat === chat ? "0 4px 15px rgba(255, 0, 128, 0.4)" : "none"}
                  >
                    <Text fontWeight="bold" fontSize="md">
                      {!chat.isGroupChat
                        ? getSender(loggedUser, chat.users)
                        : chat.chatName}
                    </Text>
                    {chat.latestMessage && (
                      <Text fontSize="xs" color="whiteAlpha.700" noOfLines={1} mt={1}>
                        <span style={{ fontWeight: "600", color: "#E2E8F0" }}>
                          {chat.latestMessage.sender.name}:
                        </span>{" "}
                        {chat.latestMessage.content}
                      </Text>
                    )}
                  </Box>
                </motion.div>
              ))}
            </AnimatePresence>
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
