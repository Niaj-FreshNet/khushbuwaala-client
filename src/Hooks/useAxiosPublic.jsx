import axios from "axios";

const axiosPublic = axios.create({
    // baseURL: 'http://localhost:5000',
    baseURL: 'https://khushbuwaala-server.vercel.app',
    headers: {
        'Content-Type': 'application/json',
    },
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;