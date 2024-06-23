import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  FormControl,
  FormLabel,
  Select,
  Flex,
  useToast,
} from "@chakra-ui/react";
import styles from "../../style/Home.module.css";
import NavBar from "../../components/NavBar";
import { useAuth } from "../../provider/AuthProvider";
import { Api } from "../../constant/api";
import axios from "axios";
import Table from "../../components/Table";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { auth } = useAuth();
  const [courses, setCourses] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editCourseIdx, setEditCourseIdx] = useState(null);
  const [data, setData] = useState([]);
  const [addEditCourse, setAddEditCourse] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();
  const categories = [
    "Networking",
    "Cloud",
    "Cyber Security",
    "Data Science",
    "Other",
  ];
  const columns = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "Course Name",
      accessor: "title",
    },
    {
      Header: "Description",
      accessor: "description",
    },
    {
      Header: "Category",
      accessor: "categories",
    },
    {
      Header: "Edit Course",
      accessor: "update",
    },
    {
      Header: "Edit Course Content",
      accessor: "updateCourseContent",
    },
    {
      Header: "Delete",
      accessor: "Delete",
    },
  ];

  useEffect(() => {
    if (!auth) {
      return navigate("/login");
    }
    getCourses();
  }, []);

  const getCourses = () => {
    axios
      .get(Api.adminCourse, {
        headers: {
          Authorization: "Bearer " + auth,
        },
      })
      .then((res) => {
        setCourses(res.data);
        const rowData = res.data.map((course, idx) => {
          return {
            id: course.id,
            title:
              course.title.length > 30
                ? course.title.substring(0, 30) + "..."
                : course.title,
            description:
              course.description.length > 30
                ? course.description.substring(0, 30) + "..."
                : course.description,
            categories: categories[course.categories - 1],
            update: (
              <Button
                onClick={() => {
                  console.log(idx);
                  setIsEdit(true);
                  setIsOpen(true);
                  setEditCourseIdx(idx);
                  setAddEditCourse({
                    id: course.id,
                    title: course.title,
                    description: course.description,
                    categories: course.categories,
                  });
                }}
              >
                Update
              </Button>
            ),
            updateCourseContent: (
              <Button
                onClick={(e) => {
                  navigate(`/admin/${course.id}`);
                }}
              >
                Update Course Content
              </Button>
            ),
            Delete: (
              <Button
                onClick={() => {
                  handleDelete(course.id);
                }}
                colorScheme="red"
              >
                Delete
              </Button>
            ),
          };
        });
        setData(rowData);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setAddEditCourse({
      ...addEditCourse,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    if (
      !addEditCourse.title ||
      !addEditCourse.description ||
      !addEditCourse.categories
    ) {
      toast({
        title: "Please fill all the fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
    return true;
  };

  const handleAddUpdate = () => {
    if (!validate()) {
      return;
    }
    if (isEdit) {
      axios
        .put(Api.adminCourse, addEditCourse, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth,
          },
        })
        .then((res) => {
          toast({
            title: "Course Updated Successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setIsOpen(false);
          getCourses();
        })
        .catch((err) => {
          console.log(err);
          getCourses();
          setAddEditCourse({});
          toast({
            title: err.response.data.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        });
    } else {
      axios
        .post(Api.adminCourse, addEditCourse, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth,
          },
        })
        .then((res) => {
          setAddEditCourse({});
          toast({
            title: "Course Added Successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setIsOpen(false);
          getCourses();
        })
        .catch((err) => {
          toast({
            title: err.response.data.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          console.log(err);
        });
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(Api.adminCourse, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth,
        },
        data: {
          id,
        },
      })
      .then((res) => {
        toast({
          title: "Course Deleted Successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        getCourses();
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: err.response.data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <Box className={styles.container}>
      <NavBar />
      {isLoading ? (
        <Loader />
      ) : (
        <Box pt={5} pl={5} pr={5}>
          <Flex justifyContent="space-between">
            <Heading>Dashboard</Heading>
            <Button
              onClick={() => {
                setIsOpen(true);
                setIsEdit(false);
              }}
            >
              Add Course
            </Button>
          </Flex>

          {data.length > 0 && <Table columnsArray={columns} dataArray={data} />}
          <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            colorScheme="blackAlphas"
            isCentered={true}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                {isEdit ? "Update Course" : "Add Course"}
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Box>
                  <FormControl>
                    <FormLabel>Course Title</FormLabel>
                    <Input
                      type="text"
                      defaultValue={
                        isEdit ? courses[editCourseIdx].title : undefined
                      }
                      placeholder="Enter course title"
                      name="title"
                      onChange={(e) => handleChange(e)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Course Description</FormLabel>
                    <Input
                      type="text"
                      defaultValue={
                        isEdit ? courses[editCourseIdx].description : undefined
                      }
                      placeholder="Enter course description"
                      name="description"
                      onChange={(e) => handleChange(e)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Course Category</FormLabel>
                    <Select
                      name="categories"
                      placeholder="Select Category"
                      onChange={handleChange}
                      defaultValue={
                        isEdit ? courses[editCourseIdx].categories : undefined
                      }
                    >
                      {categories.map((category, idx) => (
                        <option key={category} value={(idx + 1).toString()}>
                          {category}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </Button>
                <Button variant="ghost" onClick={handleAddUpdate}>
                  {isEdit ? "Update Course" : "Add Course"}
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
