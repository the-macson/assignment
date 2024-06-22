import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../style/Home.module.css";
import { Box, Flex } from "@chakra-ui/react";
import {
  ChakraProvider,
  Grid,
  GridItem,
  Text,
  VStack,
  Heading,
  Badge,
  Image,
  Divider,
  Button,
} from "@chakra-ui/react";
import { Api } from "../constant/api";
import axios from "axios";
import { useAuth } from "../provider/AuthProvider";
import NavBar from "../components/NavBar";

const CourseContent = () => {
  const [course, setCourse] = useState({});
  const [videoIdx, setVideoIdx] = useState({ moduleIdx: 0, lessonIdx: 0 });
  const { courseId } = useParams();
  const { auth } = useAuth();
  useEffect(() => {
    getCourse(courseId);
  }, []);

  const getCourse = (id) => {
    let url = Api.course + `/${id}` + "/content";
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth,
        },
      })
      .then((res) => {
        setCourse(res.data);
        setCourseEnrolled(res.data?.courseAssign?.[0]?.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleMarkAsCompleted = (id) => {
    axios
      .post(
        Api.progress,
        {
          lessonId: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth,
          },
        }
      )
      .then((res) => {
        getCourse(courseId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box className={styles.container}>
      <NavBar />
      <Grid templateColumns="repeat(12, 1fr)" gap={6} p={5} height={"90vh"}>
        <GridItem colSpan={{ base: 12, md: 4 }} p={5} overflow={"scroll"}>
          <VStack align="start" spacing={4}>
            <Heading as="h1" size="lg">
              {course?.title}
            </Heading>
            <Text>{course?.description}</Text>
            <Divider />
            {course?.syllabus?.map((module, index) => (
              <Box key={index} w="full">
                <Badge colorScheme="gray" mb="2">
                  MODULE {index + 1}
                </Badge>
                <Text fontSize="xl" fontWeight="bold">
                  {module.title}
                </Text>
                {module?.lessons?.map((lesson, lessonIndex) => (
                  <Box
                    key={lessonIndex}
                    p={3}
                    bg={
                      videoIdx.moduleIdx == index &&
                      videoIdx.lessonIdx == lessonIndex
                        ? "green.600"
                        : "gray.700"
                    }
                    borderRadius="md"
                    mb={2}
                    mt={2}
                    cursor={"pointer"}
                    onClick={() => {
                      setVideoIdx({
                        moduleIdx: index,
                        lessonIdx: lessonIndex,
                      });
                    }}
                    _hover={{
                      transform: "translateY(-2px)",
                      transition: "transform 0.3s",
                    }}
                  >
                    {lessonIndex + 1} :: {lesson.title}
                  </Box>
                ))}
                <Divider my={4} />
              </Box>
            ))}
          </VStack>
        </GridItem>
        <GridItem colSpan={{ base: 12, md: 8 }} p={5} overflow={"scroll"}>
          <Box w="full" h="full" bg="black">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${
                course?.syllabus?.[videoIdx?.moduleIdx]?.lessons?.[
                  videoIdx?.lessonIdx
                ]?.video
              }`}
              title="Course Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <Box pt={5} pb={5}>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    course?.syllabus?.[videoIdx?.moduleIdx]?.lessons?.[
                      videoIdx?.lessonIdx
                    ]?.textContent,
                }}
              ></div>
            </Box>
            <Flex justifyContent={"flex-end"} mb={5}>
              <Button
                onClick={() => {
                  handleMarkAsCompleted(
                    course?.syllabus?.[videoIdx?.moduleIdx]?.lessons?.[
                      videoIdx?.lessonIdx
                    ]?.id
                  );
                }}
                bg={
                  course?.syllabus?.[videoIdx?.moduleIdx]?.lessons?.[
                    videoIdx?.lessonIdx
                  ]?.progress?.[0]?.id
                    ? "green.700"
                    : "white"
                }
                isDisabled={
                  course?.syllabus?.[videoIdx?.moduleIdx]?.lessons?.[
                    videoIdx?.lessonIdx
                  ]?.progress?.[0]?.id
                    ? true
                    : false
                }
                _disabled={{
                  cursor: "not-allowed",
                  bg: "green.700",
                }}
              >
                {course?.syllabus?.[videoIdx?.moduleIdx]?.lessons?.[
                  videoIdx?.lessonIdx
                ]?.progress?.[0]?.id
                  ? "✔️ Completed"
                  : "Mark as Completed"}
              </Button>
            </Flex>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default CourseContent;
