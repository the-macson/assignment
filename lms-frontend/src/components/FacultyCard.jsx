import React from "react";
import { Box, Image, VStack, Text, Flex } from "@chakra-ui/react";
const FacultyCard = ({ faculty }) => {
  return (
    <Box maxW="sm" borderRadius="lg" overflow="hidden" boxShadow="md">
      <Flex justifyContent={"flex-end"}>
        <Image
          src="../../public/isolated-young-handsome-man-different-poses-white-background-illustration.png"
          alt="faculty"
          boxSize="full"
          objectFit="cover"
          width={"220px"}
          align={"right"}
        />
      </Flex>
      <VStack align="start" p="6" spacing="4" alignItems={"right"}>
        <Text fontSize="xl" fontWeight="semibold">
          {faculty?.name}
        </Text>
        <Text textAlign={"right"}>{faculty?.info}</Text>
      </VStack>
    </Box>
  );
};

export default FacultyCard;
