import axios from "axios";

const API = axios.create({
    baseURL: "/api"
});

API.interceptors.request.use(
    (config) => {

        const publicUrls = [
            "/auth/login",
            "/auth/register",
            "/users/register"
        ];

        const isPublicRequest = publicUrls.some(
            (url) => config.url === url
        );

        if (!isPublicRequest) {

            const token = localStorage.getItem("token");

            if (token) {
                config.headers.Authorization =
                    `Bearer ${token}`;
            }
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

export default API;