import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Flex,
  Button,
  SimpleGrid,
  Input,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import styles from "./style/Home.module.css";
import axios from "axios";
import { Api } from "./constant/api";
import { useAuth } from "./provider/AuthProvider";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import CourseCard from "./components/CourseCard";
import NavBar from "./components/NavBar";
import Loader from "./components/Loader";
import SmallLoader from "./components/SmallLoader";

function App() {
  const [course, setCourse] = useState([]);
  const [title, setTitle] = useState();
  const [viewCategory, setViewCategory] = useState(1);
  const categories = ["Networking", "Cloud", "Cyber Security", "Data Science"];
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useAuth();
  const Navigate = useNavigate();
  const toast = useToast();
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    getCourse(viewCategory, title);
  }, [viewCategory, title]);

  const getCourse = (categories, title) => {
    if (!isLoading) setSearchLoading(true);
    let url = Api.course + "?limit=6&categories=" + categories;
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
              <Heading>Featured Courses</Heading>
              <Button
                onClick={() => {
                  Navigate("/course");
                }}
              >
                See All Courses
              </Button>
            </Flex>
            <Flex pt={4} alignItems={"center"} justifyContent={"space-between"}>
              <Tabs
                width={"75%"}
                pr={5}
                variant="soft-rounded"
                colorScheme="green"
              >
                <TabList>
                  {categories.map((item, idx) => (
                    <Tab
                      key={idx}
                      onClick={() => {
                        setViewCategory(idx + 1);
                      }}
                    >
                      {item}
                    </Tab>
                  ))}
                </TabList>
              </Tabs>
              <Input
                placeholder={`Search in ${categories[viewCategory - 1]}`}
                size="lg"
                borderRadius="8px"
                width={"25%"}
                onChange={handleTitleChange}
              />
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
                    category={categories?.[item.categories - 1]}
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
}

export default App;
