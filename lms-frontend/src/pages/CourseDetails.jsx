import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Flex,
  Button,
  Text,
  Image,
  Badge,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  VStack,
  Divider,
  useToast,
} from "@chakra-ui/react";
import styles from "../style/Home.module.css";
import axios from "axios";
import { Api } from "../constant/api";
import { useAuth } from "../provider/AuthProvider";
import { useParams, useNavigate } from "react-router-dom";
import FacultyCard from "../components/FacultyCard";
import NavBar from "../components/NavBar";
import Loader from "../components/Loader";

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState([]);
  const categories = ["Networking", "Cloud", "Cyber Security", "Data Science"];
  const { auth } = useAuth();
  const Navigate = useNavigate();
  const [courseEnrolled, setCourseEnrolled] = useState(false);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [enrollLoading, setEnrollLoading] = useState(false);

  useEffect(() => {
    getCourse(courseId);
  }, []);

  const getCourse = (id) => {
    let url = Api.course + `/${id}`;
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
        setCourseEnrolled(res.data?.courseAssign?.[0]?.id);
      })
      .catch((err) => {
        setIsLoading(false);
        toast({
          title: "Error",
          description: "Something went wrong",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        console.log(err);
      });
  };

  const handleEnroll = (id) => {
    if (courseEnrolled) {
      Navigate(`/course/${id}/content`);
    }
    setEnrollLoading(true);
    axios
      .post(
        Api.enrollment,
        {
          courseId: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth,
          },
        }
      )
      .then((res) => {
        if (res.status == 200) {
          setCourseEnrolled(true);
          setEnrollLoading(false);
          setTimeout(() => Navigate(`/course/${id}/content`), 3000);
          toast({
            title: "Course Enrolled",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        setEnrollLoading(false);
        toast({
          title: "Error",
          description: "Something went wrong",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        console.log(err);
      });
  };

  return (
    <>
      <Box className={styles.container}>
        <NavBar />
        {isLoading ? (
          <Loader />
        ) : (
          <Box pl={4} pr={4}>
            <Flex pt={4} alignItems={"center"} justifyContent={"space-between"}>
              <Box w={"60%"} pl={"4.5%"} pr={"2.5%"}>
                <Heading pb={4} pt={4} fontSize={"2.75rem"}>
                  {course.title}
                </Heading>
                <Badge borderRadius="full" px="2" colorScheme="yellow">
                  {categories[parseInt(course.categories)]}
                </Badge>
                <Text pt={2} fontSize={"1.25rem"}>
                  {course?.description}
                </Text>
                <Button mt={4} onClick={() => handleEnroll(courseId)}>
                  {enrollLoading
                    ? "Enrolling..."
                    : courseEnrolled
                    ? "Enrolled"
                    : "Enroll Now"}
                </Button>
              </Box>
              <Image
                src="https://img.freepik.com/free-vector/content-management-system-concept-flat-design_23-2148818338.jpg?t=st=1715318047~exp=1715321647~hmac=ac86b6a25524a038132399b703baff7657c978bb9372a096993880600fc1588f&w=740"
                alt="Course"
                boxSize="full"
                objectFit="cover"
                h={"480px"}
                w={"30%"}
                mr={"4.5%"}
                mt={"4.5%"}
                borderRadius={"15px"}
              />
            </Flex>
            <Flex justifyContent={"space-between"}>
              <Box
                pt={24}
                ml={"4.5%"}
                mr={"4.5%"}
                pb={10}
                maxW={"900px"}
                flex={1}
              >
                <Text fontSize={"2rem"}>Course Content</Text>
                <Accordion allowMultiple pt={4}>
                  {course?.syllabus?.map((chapter, index) => (
                    <AccordionItem key={index} borderTop={"none"}>
                      <AccordionButton>
                        <Box
                          flex="1"
                          textAlign="left"
                          flexDirection={"row"}
                          fontSize={"1.25rem"}
                        >
                          <Flex flexDirection={"column"}>
                            <Badge
                              colorScheme="gray"
                              mr="2"
                              mb={1}
                              mt={1}
                              display={"block"}
                              width={"max-content"}
                            >
                              MODULE {index + 1}
                            </Badge>
                            {chapter.title}
                          </Flex>
                        </Box>
                        <Text fontSize={"1.25rem"}>
                          {chapter?.lessons?.length} Lesson
                        </Text>
                        <AccordionIcon />
                      </AccordionButton>
                      {chapter?.lessons?.length > 0 && (
                        <AccordionPanel pb={4}>
                          <VStack align="start" spacing={2}>
                            {chapter.lessons.map((lesson, lessonIndex) => (
                              <Box
                                key={lessonIndex}
                                p={2}
                                bg="gray.700"
                                borderRadius="md"
                                mb={1}
                                w={"100%"}
                              >
                                {lesson.title}
                              </Box>
                            ))}
                          </VStack>
                        </AccordionPanel>
                      )}
                      <Divider />
                    </AccordionItem>
                  ))}
                </Accordion>
              </Box>
              <Flex justifyContent={"flex-end"} pr={10}>
                <Box
                  pt={10}
                  ml={"4.5%"}
                  mr={"4.5%"}
                  pb={20}
                  textAlign={"right"}
                  flex={1}
                >
                  <Text fontSize={"2rem"}>Faculty Info</Text>
                  <Flex spacing={10} w={"100%"} justifyContent={"flex-end"}>
                    {course?.facultyAssign?.map(({ faculty }, idx) => (
                      <FacultyCard faculty={faculty} key={idx} />
                    ))}
                  </Flex>
                </Box>
              </Flex>
            </Flex>
          </Box>
        )}
      </Box>
    </>
  );
};

export default CourseDetails;
