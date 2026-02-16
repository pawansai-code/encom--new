import { Avatar } from "@chakra-ui/react";
import { Box, Text } from "@chakra-ui/react";
import { ChatState } from "../../Context/ChatProvider";

const UserListItem = ({ handleFunction }) => {
  const { user } = ChatState();

  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#21262d"
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      transition="all 0.2s"
      w="100%"
      d="flex"
      alignItems="center"
      color="white"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.name}
        src={user.pic}
      />
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize="xs">
          <b>Email : </b>
          {user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
