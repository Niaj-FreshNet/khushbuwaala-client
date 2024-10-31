import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useItems = () => {
    const axiosPublic = useAxiosPublic();

    const { refetch, data: orders = [], isLoading, isError, error } = useQuery({
        queryKey: ['orders'], // Changed to plural for consistency
        queryFn: async () => {
            const res = await axiosPublic.get('/api/orders');
            return res.data;
        }
    });

    return [orders, refetch, isLoading, isError, error];
};

export default useItems;