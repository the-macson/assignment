import React from "react";
import { Box, Badge, Text, VStack, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const CourseCard = ({ category, course, enrolled }) => {
  const Navigate = useNavigate();
  return (
    <Box
      maxW="md"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      cursor={"pointer"}
      onClick={() => {
        if(enrolled){
          return Navigate(`/course/${course.id}/content`);
        }
        Navigate(`/course/${course.id}`);
      }}
    >
      <Image
        src="https://img.freepik.com/free-vector/content-management-system-concept-flat-design_23-2148818338.jpg?t=st=1715318047~exp=1715321647~hmac=ac86b6a25524a038132399b703baff7657c978bb9372a096993880600fc1588f&w=740"
        alt="Course"
        boxSize="full"
        objectFit="cover"
        h={"200px"}
      />
      <VStack align="start" p="6" spacing="4">
        <Badge borderRadius="full" px="2" colorScheme="yellow">
          {category}
        </Badge>
        <Text fontSize="xl" fontWeight="semibold">
          {course.title}
        </Text>
      </VStack>
    </Box>
  );
};

export default CourseCard;
