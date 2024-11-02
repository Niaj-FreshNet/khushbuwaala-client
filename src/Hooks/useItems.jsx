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

// import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "./useAxiosPublic";

// const useItems = () => {
//     const axiosPublic = useAxiosPublic();

//     const { refetch, data: items = [], isLoading, isError, error } = useQuery({
//         queryKey: ['items'], // Changed to plural for consistency
//         queryFn: async () => {
//             const res = await axiosPublic.get('/item');
//             console.log(res)
//             return res.data;
//         },
//         staleTime: Infinity,      // Prevents automatic refetching
//         cacheTime: 1000 * 60 * 5, // Keeps data cached for 5 minutes
//         refetchOnWindowFocus: false,
//         refetchOnMount: false,
//     });

//     return [items, refetch, isLoading, isError, error];
// };

// export default useItems;


import { useState, useEffect } from 'react';
import useAxiosPublic from './useAxiosPublic';

const useItems = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(null);

    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const fetchItems = async () => {
            setIsLoading(true);
            setIsError(false);

            try {
                const res = await axiosPublic.get('/item');
                setItems(res.data);
            } catch (err) {
                setIsError(true);
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchItems();
    }, [axiosPublic]);

    return [items, isLoading, isError, error];
};

export default useItems;
