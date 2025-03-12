import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useOrders = (orderId = null) => {
    const axiosPublic = useAxiosPublic();

    const { refetch, data, isLoading, isError, error } = useQuery({
        queryKey: ['orders', orderId],
        queryFn: async () => {
            const endpoint = orderId ? `/api/orders/${orderId}` : '/api/orders';
            const res = await axiosPublic.get(endpoint);
            return res.data;
        },
        enabled: !orderId || Boolean(orderId) // Run query only if no orderId or a valid orderId is provided
    });

    // Handle data structure based on whether `orderId` is provided
    const orders = orderId ? data : (data || []); // Return single order if `orderId`, else array of orders

    return [orders, refetch, isLoading, isError, error];
};

export default useOrders;