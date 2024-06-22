import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../style/Home.module.css";
import { Box, Flex } from "@chakra-ui/react";
import {
  Grid,
  GridItem,
  Text,
  VStack,
  Heading,
  Badge,
  Divider,
  Button,
  useToast,
} from "@chakra-ui/react";
import { Api } from "../constant/api";
import axios from "axios";
import { useAuth } from "../provider/AuthProvider";
import NavBar from "../components/NavBar";
import Loader from "../components/Loader";


const CourseContent = () => {
  const [course, setCourse] = useState({});
  const [videoIdx, setVideoIdx] = useState({ moduleIdx: 0, lessonIdx: 0 });
  const { courseId } = useParams();
  const { auth } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [markCompleteLoading, setMarkCompleteLoading] = useState(false);
  const toast = useToast();

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
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        toast({
          title: "Error",
          description: "Something went wrong",
          status: "error",
          duration: 9000,
          isClosable: true,
        })
        console.log(err);
      });
  };

  const handleMarkAsCompleted = (id) => {
    setMarkCompleteLoading(true);
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
        setMarkCompleteLoading(false);
        getCourse(courseId);
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: "Something went wrong",
          status: "error",
          duration: 9000,
          isClosable: true,
        })
        console.log(err);
      });
  };

  const MarkCompleteButton = () => {
    const isAlreadyCompleted =
      course?.syllabus?.[videoIdx?.moduleIdx]?.lessons?.[videoIdx?.lessonIdx]
        ?.progress?.[0]?.id;
    const lessonId =
      course?.syllabus?.[videoIdx?.moduleIdx]?.lessons?.[videoIdx?.lessonIdx]
        ?.id;
    return (
      <Button
        onClick={() => {
          handleMarkAsCompleted(lessonId);
        }}
        bg={isAlreadyCompleted ? "green.700" : "white"}
        isDisabled={isAlreadyCompleted ? true : false}
        _disabled={{
          cursor: "not-allowed",
          bg: "green.700",
        }}
        isLoading={markCompleteLoading}
        loadingText="Marking..."
      >
        {isAlreadyCompleted ? "✔️ Completed" : "Mark as Completed"}
      </Button>
    );
  };

  return (
    <Box className={styles.container}>
      <NavBar />
      {isLoading ? (
        <Loader />
      ) : (
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
                <MarkCompleteButton />
              </Flex>
            </Box>
          </GridItem>
        </Grid>
      )}
    </Box>
  );
};

export default CourseContent;
