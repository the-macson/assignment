import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import styles from "../style/Home.module.css";
import axios from "axios";
import { Api } from "../constant/api";
import { useAuth } from "../provider/AuthProvider";
import CourseCard from "../components/CourseCard";
import { LineChart, Line, XAxis, YAxis, Tooltip, Label } from "recharts";
import NavBar from "../components/NavBar";
import Loader from "../components/Loader";

const Profile = () => {
  const [course, setCourse] = useState([]);
  const { auth } = useAuth();
  const [progress, setProgress] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    if(!auth) return Navigate("/login");
    getCourse();
    getProgress();
  }, []);

  const getCourse = () => {
    axios
      .get(Api.enrollment, {
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

  const getProgress = () => {
    axios
      .get(Api.progress, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth,
        },
      })
      .then((res) => {
        setProgress(res.data);
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

  return (
    <Box className={styles.container}>
      <NavBar />
      {isLoading ? (
        <Loader />
      ) : (
        <Box pt={4} pl={4}>
          <Heading>Profile</Heading>
          <Box pt={4}>
            <Text fontSize={"x-large"}>My Courses</Text>
            <SimpleGrid
              columns={{ base: 1, sm: 2, md: 3 }}
              spacing={10}
              p={5}
              w={"100%"}
            >
              {course.map((item) => (
                <CourseCard key={item.id} course={item} enrolled={true} />
              ))}
            </SimpleGrid>
          </Box>
          <Box pt={4} pb={12}>
            <Text fontSize={"x-large"} pb={8} pl={8}>
              Progress of last 7 days
            </Text>
            <LineChart
              width={780}
              height={250}
              data={progress}
              margin={{ top: 5, right: 5, left: 20, bottom: 20 }}
            >
              <XAxis dataKey="date" tickLine={false} strokeWidth={2}>
                <Label
                  value="Date"
                  position="bottom"
                  offset={5}
                  fill={"#fff"}
                />
              </XAxis>
              <YAxis
                tickLine={false}
                allowDecimals={false}
                strokeWidth={2}
                label={{
                  value: "Completed lessons",
                  angle: -90,
                  position: "outside",
                  fill: "#fff",
                }}
              />
              <Tooltip
                itemStyle={{
                  color: "#82ca9d",
                }}
                labelStyle={{
                  color: "#82ca9d",
                }}
                cursor={false}
                contentStyle={{
                  border: "1px solid #ccc",
                  padding: "5px 8px",
                  borderRadius: "5px",
                  backgroundColor: "black",
                }}
              />
              <Line
                type="monotone"
                dataKey="lessons"
                stroke="#82ca9d"
                dot={false}
                fill="#fff"
              />
            </LineChart>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Profile;
