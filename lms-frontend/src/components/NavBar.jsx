import React, { useState } from "react";
import { Box, Flex, HStack, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import axios from "axios";
import { Api } from "../constant/api";
const Links = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Courses",
    link: "/course",
  },
  {
    name: "My Courses",
    link: "/profile",
  },
  {
    name: "Admin",
    link: "/admin",
    role: "2",
  },
];

const NavBar = () => {
  const Navigate = useNavigate();
  const { logout, auth, userRole } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const handleLogout = () => {
    setIsLoading(true);
    axios
      .post(
        Api.logout,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth,
          },
        }
      )
      .then((res) => {
        logout();
        Navigate("/login");
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const NavLink = ({ link }) => (
    <Button
      px={2}
      py={1}
      rounded={"md"}
      backgroundColor={"transparent"}
      color={"#fff"}
      fontSize={"larger"}
      _hover={{
        textDecoration: "none",
        bg: "taransparent",
      }}
      onClick={() => {
        Navigate(link.link);
      }}
    >
      {link.name}
    </Button>
  );

  return (
    <>
      <Box
        bg={"#32012e"}
        px={4}
        borderBottom={"1px"}
        borderBottomColor={"#fff"}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link, idx) =>
                link.role === userRole || !link.role ? (
                  <NavLink key={idx} link={link} />
                ) : null
              )}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Button
              variant={"solid"}
              colorScheme={"teal"}
              size={"sm"}
              ml={4}
              onClick={handleLogout}
              isLoading={isLoading}
              loadingText="Logging out"
            >
              Logout
            </Button>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default NavBar;
