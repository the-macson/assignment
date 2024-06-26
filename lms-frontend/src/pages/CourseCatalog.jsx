import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Flex,
  SimpleGrid,
  Input,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import styles from "../style/Home.module.css";
import axios from "axios";
import { Api } from "../constant/api";
import { useAuth } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import NavBar from "../components/NavBar";
import Loader from "../components/Loader";
import SmallLoader from "../components/SmallLoader";

const CourseCatalog = () => {
  const [course, setCourse] = useState([]);
  const [title, setTitle] = useState();
  const [viewCategory, setViewCategory] = useState(undefined);
  const categories = [
    "All",
    "Networking",
    "Cloud",
    "Cyber Security",
    "Data Science",
    "Other",
  ];
  const { auth } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (!auth) return Navigate("/login");
    getCourse(viewCategory, title);
  }, [viewCategory, title]);

  const getCourse = (categories, title) => {
    if (!isLoading) setSearchLoading(true);
    let url = Api.course + "?";
    if (viewCategory && viewCategory != 0) {
      url += "categories=" + categories;
    }
    if (title) {
      url += "&title=" + title;
    }
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setSearchLoading(false);
        setCourse(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
        toast({
          title: "Error",
          description: err.response.data.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        })
        console.log(err);
      });
  };

  let debounce;
  const handleTitleChange = (e) => {
    if (debounce) {
      clearTimeout(debounce);
    }
    debounce = setTimeout(() => {
      setTitle(e.target.value);
    }, 500);
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
              <Heading>Courses</Heading>
            </Flex>
            <Flex pt={4} alignItems={"center"} justifyContent={"space-between"}>
              <Input
                placeholder={`Search ...`}
                size="lg"
                borderRadius="8px"
                maxW={"800px"}
                onChange={handleTitleChange}
              />
              <Flex alignItems={"center"} minW={"400px"} pr={5}>
                <Text pr={4} fontSize={"medium"} pl={4}>
                  Filter
                </Text>
                <Select
                  size="lg"
                  borderRadius="8px"
                  onChange={(e) => {
                    setViewCategory(e.target.value);
                  }}
                >
                  {categories.map((val, idx) => (
                    <option value={idx} key={idx}>
                      {val}
                    </option>
                  ))}
                </Select>
              </Flex>
            </Flex>
            {searchLoading ? (
              <SmallLoader />
            ) : (
              <SimpleGrid
                columns={{ base: 1, sm: 2, md: 3 }}
                spacing={10}
                p={5}
                w={"100%"}
              >
                {course.map((item, idx) => (
                  <CourseCard
                    key={idx}
                    category={categories[parseInt(item.categories)]}
                    course={course[idx]}
                  />
                ))}
              </SimpleGrid>
            )}
          </Box>
        )}
      </Box>
    </>
  );
};

export default CourseCatalog;
