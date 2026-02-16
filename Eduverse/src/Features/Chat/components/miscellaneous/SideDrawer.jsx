import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
    Avatar, Box, Button, Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay, Input, Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList, Spinner, Text, Tooltip, useDisclosure, useToast
} from "@chakra-ui/react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import NotificationBadge, { Effect } from "react-notification-badge";
import { useNavigate } from "react-router-dom";
import { getSender } from "../../config/ChatLogics";
import { ChatState } from "../../Context/ChatProvider";
import ChatLoading from "../ChatLoading";
import UserListItem from "../userAvatar/UserListItem";
import ProfileModal from "./ProfileModal";

function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const navigate = useNavigate();

  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/community");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <Box
        className="glass-container anim-fade-in"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        p="10px 20px"
        borderWidth="0"
        borderBottomWidth="1px"
        borderColor="whiteAlpha.100"
        color="white"
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button
            variant="ghost"
            onClick={onOpen}
            leftIcon={<i className="fas fa-search"></i>}
            _hover={{ bg: "whiteAlpha.200", transform: "translateY(-1px)" }}
            _active={{ bg: "whiteAlpha.300" }}
            transition="all 0.2s"
          >
            <Text display={{ base: "none", md: "flex" }} px={4} fontWeight="semibold">
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text
          fontSize="3xl"
          fontFamily="Inter"
          fontWeight="extrabold"
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          letterSpacing="tight"
        >
          EnChat
        </Text>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Menu>
            <MenuButton p={1}>
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <BellIcon fontSize="2xl" m={1} color="whiteAlpha.800" _hover={{ color: "white" }} />
            </MenuButton>
            <MenuList pl={2} className="glass-container" border="1px solid rgba(255,255,255,0.1)" color="white">
              {!notification.length && <MenuItem bg="transparent">No New Messages</MenuItem>}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  bg="transparent"
                  _hover={{ bg: "whiteAlpha.200" }}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              variant="ghost"
              rightIcon={<ChevronDownIcon />}
              _hover={{ bg: "whiteAlpha.200" }}
              p={1}
            >
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
                border="2px solid"
                borderColor="purple.400"
              />
            </MenuButton>
            <MenuList className="glass-container" border="1px solid rgba(255,255,255,0.1)" color="white">
              <ProfileModal user={user}>
                <MenuItem bg="transparent" _hover={{ bg: "whiteAlpha.200" }}>
                  My Profile
                </MenuItem>
              </ProfileModal>
              <MenuDivider borderColor="whiteAlpha.100" />
              <MenuItem
                bg="transparent"
                _hover={{ bg: "red.500", color: "white" }}
                onClick={logoutHandler}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay backdropFilter="blur(4px)" />
        <DrawerContent className="glass-container" color="white" borderRight="1px solid rgba(255,255,255,0.1)">
          <DrawerHeader borderBottomWidth="1px" borderColor="whiteAlpha.200" fontFamily="Inter" fontWeight="bold">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={4}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                bg="whiteAlpha.100"
                borderColor="whiteAlpha.300"
                _focus={{ borderColor: "purple.400", bg: "whiteAlpha.200" }}
                color="white"
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button
                onClick={handleSearch}
                className="gradient-purple"
                _hover={{ filter: "brightness(1.1)", transform: "scale(1.05)" }}
                transition="all 0.2s"
              >
                Go
              </Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ staggerChildren: 0.1 }}
                >
                  {searchResult?.map((user) => (
                    <motion.div
                      key={user._id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                    >
                      <UserListItem
                        user={user}
                        handleFunction={() => accessChat(user._id)}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}
            {loadingChat && <Spinner ml="auto" display="flex" mt={4} color="purple.400" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;
