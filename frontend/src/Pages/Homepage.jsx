import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

function Homepage() {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");
  }, [history]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bgGradient="linear(to-r, #1A202C, #2D3748)" // Gradient background
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
        boxShadow="xl"
      >
        <Text
          fontSize="4xl"
          fontFamily="Work sans"
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontWeight="bold"
        >
          EnChat
        </Text>
      </Box>
      <Box
        bgGradient="linear(to-r, #1A202C, #2D3748)" // Gradient background
        w="100%"
        p={4}
        borderRadius="lg"
        borderWidth="1px"
        color="white"
        boxShadow="2xl"
      >
        <Tabs isFitted variant="soft-rounded" colorScheme="purple">
          <TabList mb="1em">
            <Tab _selected={{ color: "white", bg: "purple.500" }}>Login</Tab>
            <Tab _selected={{ color: "white", bg: "pink.500" }}>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Homepage;
