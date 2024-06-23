import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Register from "../pages/Register";
import CourseCatalog from "../pages/CourseCatalog";
import Login from "../pages/Login";
import App from "../App";
import CourseDetails from "../pages/CourseDetails";
import { useAuth } from "../provider/AuthProvider";
import CourseContent from "../pages/CourseContent";
import Profile from "../pages/Profile";
import Dashboard from "../pages/admin/Dashboard";
import AdminCourse from "../pages/admin/CourseContent"

const Authentication = ({ children }) => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  useEffect(() => {
    if (!auth) {
      return navigate("/login");
    }
  }, [auth, navigate]);
  return children;
};

const Admin = ({ children }) => {
  const navigate = useNavigate();
  const { userRole } = useAuth();
  useEffect(() => {
    if (userRole !== "2") {
      return navigate("/");
    }
  }, [navigate]);
  return children;
};

const UnAuthentication = ({ children }) => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const location = useLocation();
  useEffect(() => {
    if (auth) {
      return navigate("/");
    }
  }, [auth, navigate]);
  return children;
};
const RoutesPath = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Authentication>
            <App />
          </Authentication>
        }
      />
      <Route
        path="/course"
        element={
          <Authentication>
            <CourseCatalog />
          </Authentication>
        }
      />
      <Route
        path="login"
        element={
          <UnAuthentication>
            <Login />
          </UnAuthentication>
        }
      />
      <Route
        path="register"
        element={
          <UnAuthentication>
            <Register />
          </UnAuthentication>
        }
      />
      <Route
        path="/course/:courseId"
        element={
          <Authentication>
            <CourseDetails />
          </Authentication>
        }
      />
      <Route
        path="/course/:courseId/content"
        element={
          <Authentication>
            <CourseContent />
          </Authentication>
        }
      />
      <Route
        path="/profile"
        element={
          <Authentication>
            <Profile />
          </Authentication>
        }
      />
      <Route
        path="/admin"
        element={
          <Authentication>
            <Admin>
              <Dashboard />
            </Admin>
          </Authentication>
        }
      />
      <Route
        path="/admin/:courseId"
        element={
          <Authentication>
            <Admin>
              <AdminCourse />
            </Admin>
          </Authentication>
        }
      />
    </Routes>
  );
};

export default RoutesPath;
