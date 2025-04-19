import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import HomePage from "../Pages/Home/HomePage/HomePage";
import ShopPage from "../Pages/Shop/ShopPage/ShopPage";
import ProductPage from "../Pages/ProductPage/ProductPage/ProductPage";
import CartPage from "../Pages/AddToCart/CartPage/CartPage";
import CheckOutPage from "../Pages/CheckOut/CheckOutPage/CheckOutPage";
import Dashboard from "../Layout/Dashboard";
import AddItem from "../Pages/Dashboard/AddItem/AddItem";
import AllItems from "../Pages/Dashboard/AllItems/AllItems";
import Orders from "../Pages/Dashboard/Orders/Orders";
import Sales from "../Pages/Dashboard/Sales/Sales";
import Reports from "../Pages/Dashboard/Reports/Reports";
import ThankYouPage from "../Pages/ThankYou/ThankYouPage/ThankYouPage";
import NewInPage from "../Pages/NewIn/NewInPage/NewInPage";
import InspiredPefumeOilPage from "../Pages/InspiredPefumeOilPage/InspiredPefumeOilPage";
import OrientalPage from "../Pages/OrientalPage/OrientalPage";
import ArtficialOudPage from "../Pages/ArtificialOudPage/ArtificialOudPage";
import NaturalPage from "../Pages/NaturalPage/NaturalPage";
import ForWomenPage from "../Pages/ForWomenPage/ForWomenPage";
import GiftsAndPackagesPage from "../Pages/GiftsAndPackagesPage/GiftsAndPackagesPage";
import Wishlist from "../Pages/Wishlist/Wishlist";
import TrackOrder from "../Pages/TrackOrder/TrackOrder";
import Contact from "../Pages/Contact/Contact";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";


export const router = createBrowserRouter([
    {
        path: "/", element: <Main />,
        errorElement: <ErrorPage /> ,
        children: [
            {
                path: '/', element: <HomePage />
            },
            {
                path: 'shop', element: <ShopPage />
            },
            {
                path: 'new-arrivals', element: <NewInPage />
            },
            {
                path: 'inspired-perfume-oil', element: <InspiredPefumeOilPage />
            },
            {
                path: 'oriental-attar', element: <OrientalPage />
            },
            {
                path: 'artificial-oud', element: <ArtficialOudPage />
            },
            {
                path: 'natural-attar', element: <NaturalPage />
            },
            {
                path: 'womens-perfume', element: <ForWomenPage />
            },
            {
                path: 'gifts-and-packages', element: <GiftsAndPackagesPage />
            },
            {
                path: ':category/:name',
                element: <ProductPage />,
                loader: async ({ params }) => {
                    // const response = await fetch(`https://khushbuwaala-server.quickway2services.com/item/${params.name}`);
                    const response = await fetch(`https://khushbuwaala-server.onrender.com/item/${params.name}`);
                    if (!response.ok) {
                        throw new Response('Not Found', { status: 404 });
                    }
                    return response.json();
                }
            },
            {
                path: 'cart', element: <CartPage />
            },
            {
                path: 'wishlist', element: <Wishlist />
            },
            {
                path: 'checkout', element: <CheckOutPage />
            },
            {
                path: 'thank-you', element: <ThankYouPage />
            },
            {
                path: 'track-order', element: <TrackOrder />
            },
            {
                path: 'contact', element: <Contact />
            },
        ]
    },
    {
        path: 'dashboard', element: <Dashboard />,
        children: [
            {
                path: 'all', element: <AllItems />
            },
            {
                path: 'add', element: <AddItem />
            },
            {
                path: 'orders', element: <Orders />
            },
            {
                path: 'sales', element: <Sales />
            },
            {
                path: 'reports', element: <Reports />
            },
        ]
    },
]);