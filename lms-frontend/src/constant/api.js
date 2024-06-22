// const BaseUrl = "http://localhost:4000";
const BaseUrl = "https://lms.choreoapps.dev";
export const Api = {
  login: `${BaseUrl}/api/auth/login`,
  register: `${BaseUrl}/api/auth/register`,
  course: `${BaseUrl}/api/courses`,
  enrollment: `${BaseUrl}/api/enrollments`,
  progress: `${BaseUrl}/api/courses/progress`,
  logout: `${BaseUrl}/api/auth/logout`,
};

export const siteKey = "0x4AAAAAAAdDEHmhZ0PjQNxH";

// export const siteKey = "1x00000000000000000000AA";