import React from "react";
import { Box, Spinner, Text, VStack } from "@chakra-ui/react";
const Loader = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="90vh"
    >
      <VStack>
        <Spinner size={"xl"} />
        <Text fontSize="2xl" ml={4}>
          Loading...
        </Text>
        <Text fontSize="xl" ml={4}>
          Please wait server is processing your request
        </Text>
      </VStack>
    </Box>
  );
};

export default Loader;
