import React, { useState, useEffect } from "react";
import styles from "../style/Login.module.css";
import {
  Box,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  useToast,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../provider/AuthProvider";
import { Api, siteKey } from "../constant/api";
import { Turnstile } from "@marsidev/react-turnstile";

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [error, setError] = useState({});
  const [token, setToken] = useState("");
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "" });
  };

  const errorHandling = () => {
    var error = {};
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!form.name || form.name === "") {
      error["name"] = "Name is required";
    }
    if (!form.email || form.email === "") {
      error["email"] = "Email is required";
    } else if (!form.email.match(emailPattern)) {
      error["email"] = "Email is invalid";
    }
    if (!form.password || form.password === "") {
      error["password"] = "Password is required";
    }
    if (form.password && form.password.length < 6) {
      error["password"] = "Password must be at least 6 characters";
    }
    if (form.password != form.confirmPassword) {
      error["confirmPassword"] = "Password and Confirm Password must be same";
    }
    if (!form.confirmPassword || form.confirmPassword === "") {
      error["confirmPassword"] = "Confirm Password is required";
    }
    setError(error);
    if (Object.keys(error).length > 0) {
      return true;
    }
  };

  const handleSubmit = () => {
    if (errorHandling()) {
      return;
    }
    setLoading(true);
    axios
      .post(Api.register, {
        email: form.email,
        password: form.password,
        name: form.name,
        token: token,
      })
      .then((res) => {
        if (res.data.token) {
          login(res.data.token, res.data.role);
        }
      }).catch((err) => {
        toast({
          title: err.response.data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.login}>
        <Box className={styles.loginForm}>
          <Box className={styles.loginFormTitle}>
            <Heading className={styles.loginFormTitleText}>Register</Heading>
          </Box>
          <FormControl className={styles.loginFormInput} isInvalid={error.name}>
            <FormLabel className={styles.loginFormInputText}>Name</FormLabel>
            <Input
              name="name"
              className={styles.loginFormInputField}
              type="text"
              onChange={handleChange}
            />
            <FormErrorMessage>{error.email}</FormErrorMessage>
          </FormControl>
          <FormControl
            className={styles.loginFormInput}
            isInvalid={error.email}
          >
            <FormLabel className={styles.loginFormInputText}>Email</FormLabel>
            <Input
              name="email"
              className={styles.loginFormInputField}
              type="email"
              onChange={handleChange}
            />
            <FormErrorMessage>{error.email}</FormErrorMessage>
          </FormControl>
          <FormControl
            className={styles.loginFormInput}
            isInvalid={error.password}
          >
            <FormLabel className={styles.loginFormInputText}>
              Password
            </FormLabel>
            <Input
              name="password"
              className={styles.loginFormInputField}
              type="password"
              onChange={handleChange}
            />
            <FormErrorMessage>{error.password}</FormErrorMessage>
          </FormControl>
          <FormControl
            className={styles.loginFormInput}
            isInvalid={error.confirmPassword}
          >
            <FormLabel className={styles.loginFormInputText}>
              Confirm Password
            </FormLabel>
            <Input
              name="confirmPassword"
              className={styles.loginFormInputField}
              type="password"
              onChange={handleChange}
            />
            <FormErrorMessage>{error.confirmPassword}</FormErrorMessage>
          </FormControl>
          <Turnstile siteKey={siteKey} onSuccess={(token) => setToken(token)} />
          <Box className={styles.loginRegister} pt={5}>
            Have an account? &nbsp;
            <span
              className={styles.loginRegisterText}
              onClick={() => {
                navigate("/login");
              }}
            >
              Login here
            </span>
          </Box>
          <Box className={styles.loginFormButton}>
            <Button
              onClick={handleSubmit}
              className={styles.loginFormButtonField}
              isLoading={loading}
              loadingText="Registering"
              pl={5}
              pr={5}
            >
              Register
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
