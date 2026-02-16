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
import { useNavigate } from "react-router-dom";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

function Homepage() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) navigate("/community/chats");
  }, [navigate]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        className="glass-container anim-fade-in"
        display="flex"
        justifyContent="center"
        p={3}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="2xl"
        borderWidth="1px"
      >
        <Text
          fontSize="5xl"
          fontFamily="Inter"
          fontWeight="extrabold"
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          letterSpacing="tight"
        >
          EnChat
        </Text>
      </Box>
      <Box
        className="glass-container gradient-border anim-fade-in"
        w="100%"
        p={6}
        borderRadius="2xl"
        color="white"
      >
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="1.5em">
            <Tab 
              _selected={{ color: "white", bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
              fontWeight="bold"
            >
              Login
            </Tab>
            <Tab 
              _selected={{ color: "white", bg: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" }}
              fontWeight="bold"
            >
              Sign Up
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel p={0}>
              <Login />
            </TabPanel>
            <TabPanel p={0}>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Homepage;
