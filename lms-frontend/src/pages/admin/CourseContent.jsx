import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Modal,
  Text,
  FormControl,
  FormLabel,
  Input,
  useToast,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Textarea,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../provider/AuthProvider";
import NavBar from "../../components/NavBar";
import styles from "../../style/Home.module.css";
import { Api } from "../../constant/api";
import axios from "axios";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";

const CourseContent = () => {
  const { auth } = useAuth();
  const { courseId } = useParams();
  const [courseContent, setCourseContent] = useState([]);
  const Navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [module, setModule] = useState({});
  const [lesson, setLesson] = useState({});
  const [lessonParentId, setLessonParentId] = useState(null);
  const [editIdx, setEditIdx] = useState(null);
  const [editLessonIdx, setEditLessonIdx] = useState(null);
  const [isOpenModule, setIsOpenModule] = useState(false);
  const [isOpenLesson, setIsOpenLesson] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (!auth) return Navigate("/login");
    getCourseContent(courseId);
  }, []);

  const getCourseContent = (id) => {
    let url = Api.adminModule + `/${id}`;
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth,
        },
      })
      .then((res) => {
        setCourseContent(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddEditModule = () => {
    if (!module.title) {
      toast({
        title: "Error",
        description: "Please enter module title",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    if (editIdx) {
      axios
        .put(
          Api.adminModule,
          {
            courseId: courseId,
            id: module.id,
            title: module.title,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + auth,
            },
          }
        )
        .then((res) => {
          toast({
            title: "Module updated successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setIsOpenModule(false);
          getCourseContent(courseId);
          setEditIdx(null);
        })
        .catch((err) => {
          console.log(err);
          toast({
            title: "Error",
            description: "Something went wrong",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        });
    } else {
      axios
        .post(
          Api.adminModule,
          {
            courseId: parseInt(courseId),
            title: module.title,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + auth,
            },
          }
        )
        .then((res) => {
          toast({
            title: "Module added successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setIsOpenModule(false);
          getCourseContent(courseId);
        })
        .catch((err) => {
          console.log(err);
          toast({
            title: "Error",
            description: "Something went wrong",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        });
    }
  };

  const handleDeleteLesson = (id) => {
    axios
      .delete(Api.adminLesson, {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + auth,
        },
        data: {
          id: id,
        },
      })
      .then((res) => {
        toast({
          title: "Lesson deleted successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        getCourseContent(courseId);
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Error",
          description: "Something went wrong",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const handleDeleteModule = (id) => {
    axios
      .delete(Api.adminModule, {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + auth,
        },
        data: {
          id: id,
        },
      })
      .then((res) => {
        toast({
          title: "Module deleted successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        getCourseContent(courseId);
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Error",
          description: "Something went wrong",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const handleAddEditLesson = () => {
    if (!lesson.title || !lesson.textContent || !lesson.video) {
      toast({
        title: "Error",
        description: "Please enter all fields",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    if (editIdx != null) {
      axios
        .put(
          Api.adminLesson,
          {
            courseId: courseId,
            id: lesson.id,
            title: lesson.title,
            textContent: lesson.textContent,
            video: lesson.video,
            parentId: lessonParentId,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + auth,
            },
          }
        )
        .then((res) => {
          toast({
            title: "Lesson updated successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setIsOpenLesson(false);
          getCourseContent(courseId);
          setEditIdx(null);
          setEditLessonIdx(null);
        })
        .catch((err) => {
          console.log(err);
          toast({
            title: "Error",
            description: "Something went wrong",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        });
    } else {
      axios
        .post(
          Api.adminLesson,
          {
            title: lesson.title,
            textContent: lesson.textContent,
            video: lesson.video,
            syllabusId: lessonParentId,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + auth,
            },
          }
        )
        .then((res) => {
          toast({
            title: "Lesson added successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setIsOpenLesson(false);
          getCourseContent(courseId);
        })
        .catch((err) => {
          console.log(err);
          toast({
            title: "Error",
            description: "Something went wrong",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        });
    }
  };

  return (
    <Box className={styles.container}>
      <NavBar />
      {isLoading ? (
        <Loader />
      ) : (
        <Box>
          <Heading pt={5} pl={5}>
            Course Content
          </Heading>
          <Box pb={5}>
            <Box pt={5} pl={5} pr={5}>
              {courseContent.map((content, index) => (
                <Box
                  key={index}
                  p={5}
                  borderWidth="1px"
                  borderRadius="lg"
                  mb={5}
                >
                  <Flex
                    justifyContent={"space-between"}
                    pb={1}
                    alignItems={"center"}
                  >
                    <Text size="lg">{content.title}</Text>
                    <HStack>
                      <Button
                        onClick={() => {
                          setIsOpenModule(true);
                          setEditIdx(index);
                          setModule(content);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        colorScheme="red"
                        onClick={() => {
                          handleDeleteModule(content.id);
                        }}
                      >
                        Delete Module
                      </Button>
                    </HStack>
                  </Flex>

                  {content.lessons.map((lesson, idx) => {
                    return (
                      <Flex
                        key={idx}
                        pt={1.5}
                        pb={1.5}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <HStack spacing={10}>
                          <Text size="lg" pl={4}>
                            {lesson.title}
                          </Text>
                          <Text size="lg" pr={4}>
                            {lesson.video}
                          </Text>
                        </HStack>
                        <HStack>
                          <Button
                            onClick={() => {
                              setEditIdx(index);
                              setIsOpenLesson(true);
                              setEditLessonIdx(idx);
                              setLesson({
                                title: lesson.title,
                                textContent: lesson.textContent,
                                video: lesson.video,
                                id: lesson.id,
                                syllabusId: lesson.syllabusId,
                              });
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => {
                              handleDeleteLesson(lesson.id);
                            }}
                            colorScheme="red"
                          >
                            Delete Lesson
                          </Button>
                        </HStack>
                      </Flex>
                    );
                  })}
                  <Button
                    ml={4}
                    onClick={() => {
                      setIsOpenLesson(true);
                      setLessonParentId(content.id);
                    }}
                  >
                    Add Lesson
                  </Button>
                </Box>
              ))}
              <Button
                onClick={() => {
                  setIsOpenModule(true);
                  setEditIdx(null);
                }}
              >
                Add Module
              </Button>
            </Box>
          </Box>
          <Modal
            isOpen={isOpenModule}
            onClose={() => setIsOpenModule(false)}
            colorScheme="blackAlphas"
            isCentered={true}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                {editIdx != null ? "Update Module" : "Add Module"}
              </ModalHeader>
              <ModalBody>
                <Box>
                  <FormControl>
                    <FormLabel>Module Title</FormLabel>
                    <Input
                      type="text"
                      defaultValue={
                        editIdx != null
                          ? courseContent[editIdx]?.title
                          : undefined
                      }
                      placeholder="Enter module title"
                      name="title"
                      onChange={(e) =>
                        setModule({ ...module, title: e.target.value })
                      }
                    />
                  </FormControl>
                </Box>
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() => {
                    setIsOpenModule(false);
                    setEditIdx(null);
                  }}
                >
                  Close
                </Button>
                <Button variant="ghost" onClick={handleAddEditModule}>
                  {editIdx != null ? "Update Module" : "Add Module"}
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Modal
            isOpen={isOpenLesson}
            onClose={() => setIsOpenModule(false)}
            colorScheme="blackAlphas"
            isCentered={true}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                {editIdx != null ? "Update Lesson" : "Add Lesson"}
              </ModalHeader>
              <ModalBody>
                <Box>
                  <FormControl>
                    <FormLabel>Lesson Title</FormLabel>
                    <Input
                      type="text"
                      defaultValue={
                        editIdx != null
                          ? courseContent[editIdx]?.lessons?.[editLessonIdx]
                              ?.title
                          : undefined
                      }
                      placeholder="Enter lesson title"
                      name="title"
                      onChange={(e) =>
                        setLesson({ ...lesson, title: e.target.value })
                      }
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Video Link</FormLabel>
                    <Input
                      type="text"
                      defaultValue={
                        editIdx != null
                          ? courseContent[editIdx]?.lessons?.[editLessonIdx]
                              ?.video
                          : undefined
                      }
                      placeholder="Enter video link"
                      name="title"
                      onChange={(e) =>
                        setLesson({ ...lesson, video: e.target.value })
                      }
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Lesson Description</FormLabel>
                  </FormControl>
                  <Textarea
                    defaultValue={
                      editIdx != null
                        ? courseContent[editIdx]?.lessons?.[editLessonIdx]
                            ?.textContent
                        : undefined
                    }
                    placeholder="Enter lesson description"
                    onChange={(e) =>
                      setLesson({ ...lesson, textContent: e.target.value })
                    }
                  />
                </Box>
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() => {
                    setIsOpenLesson(false);
                    setEditIdx(null);
                    setEditLessonIdx(null);
                  }}
                >
                  Close
                </Button>
                <Button variant="ghost" onClick={handleAddEditLesson}>
                  {editIdx != null ? "Update Lesson" : "Add Lesson"}
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      )}
    </Box>
  );
};

export default CourseContent;
