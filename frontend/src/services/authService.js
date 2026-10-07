import API from "./api";

const register = (userData) => {
    return API.post("/auth/register", userData);
};

const login = (credentials) => {
    return API.post("/auth/login", credentials);
};

const getProfile = () => {
    return API.get("/users/profile");
};

export default {
    register,
    login,
    getProfile
};