// import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "./useAxiosPublic";


// const useItem = () => {
    //     const axiosPublic = useAxiosPublic();
    
    //     const { refetch, data: item = [], isLoading, isError, error } = useQuery({
        //         queryKey: ['item'],
        //         queryFn: async () => {
            //             const res = await axiosPublic.get('/item');
            //             return res.data;
            //         }
//     })

//     return [item, refetch, isLoading, isError, error];
// };

// export default useItem;

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useItems = () => {
    const axiosPublic = useAxiosPublic();

    const { refetch, data: items = [], isLoading, isError, error } = useQuery({
        queryKey: ['items'], // Changed to plural for consistency
        queryFn: async () => {
            const res = await axiosPublic.get('/item');
            return res.data;
        }
    });

    return [items, refetch, isLoading, isError, error];
};

export default useItems;
