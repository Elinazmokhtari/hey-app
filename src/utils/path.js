import ENV from "./env";

const PATH = {
  login: "/login",
  register: "/register",
  home: "/home",
};

const API = {
  me: `${ENV.API_BASE_URL}/auth/me`,
  login: `${ENV.API_BASE_URL}/auth/login`,
  register: `${ENV.API_BASE_URL}/auth/register`,
};

export { PATH, API };
