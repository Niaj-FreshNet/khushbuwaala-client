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


import { useState, useEffect, useCallback } from 'react';
import useAxiosPublic from './useAxiosPublic';

const useItems = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(null);

    const axiosPublic = useAxiosPublic();

    // Define the fetchItems function
    const fetchItems = useCallback(async () => {
        setIsLoading(true);
        setIsError(false);

        try {
            const res = await axiosPublic.get('/item'); // Fetch items from the API
            setItems(res.data); // Update the items state
        } catch (err) {
            setIsError(true); // Set error state on failure
            setError(err.message);
        } finally {
            setIsLoading(false); // Stop loading
        }
    }, [axiosPublic]);

    // Automatically fetch items when the hook is used
    useEffect(() => {
        fetchItems();
    }, [fetchItems]); // Ensure the useEffect depends on fetchItems

    return [items, fetchItems, isLoading, isError, error];
};

export default useItems;
