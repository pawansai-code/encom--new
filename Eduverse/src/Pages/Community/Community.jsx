import { ChakraProvider } from "@chakra-ui/react";
import ChatApp from "../../Features/Chat/ChatApp";
import ChatProvider from "../../Features/Chat/Context/ChatProvider";
import './Community.css';

const Community = () => {
  return (
    <div className="community-page-wrapper">
      <ChakraProvider>
        <ChatProvider>
          <ChatApp />
        </ChatProvider>
      </ChakraProvider>
    </div>
  );
};

export default Community;
