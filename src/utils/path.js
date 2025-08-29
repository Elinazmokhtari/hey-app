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
    tweets: `${ENV.API_BASE_URL}/tweets`,
    populartweets: `${ENV.API_BASE_URL}/tweets/popular`,
    categories: `${ENV.API_BASE_URL}/tweets/categories`,
    createtweet: `${ENV.API_BASE_URL}/tweets`,
    singletweet: (id) => `${ENV.API_BASE_URL}/tweets/${id}`,
    edittweet: (id) => `${ENV.API_BASE_URL}/tweets/${id}`,
    deletetweet: (id) => `${ENV.API_BASE_URL}/tweets/${id}`,
    liketweet: (id) => `${ENV.API_BASE_URL}/tweets/like/${id}`,
    disliketweet: (id) => `${ENV.API_BASE_URL}/tweets/like/${id}`,
};

export { PATH, API };
