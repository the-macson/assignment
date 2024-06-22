const BaseUrl = "http://localhost:4000";
export const Api = {
  login: `${BaseUrl}/api/auth/login`,
  register: `${BaseUrl}/api/auth/register`,
  course: `${BaseUrl}/api/courses`,
  enrollment: `${BaseUrl}/api/enrollments`,
  progress: `${BaseUrl}/api/courses/progress`,
  logout: `${BaseUrl}/api/auth/logout`,
};
