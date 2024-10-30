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


export const router = createBrowserRouter([
    {
        path: "/", element: <Main />,
        children: [
            {
                path: '/', element: <HomePage />
            },
            {
                path: 'shop', element: <ShopPage />
            },            
            {
                path: 'collections/:category/products/:productName', 
                element: <ProductPage />
            },
            {
                path: 'cart', element: <CartPage />
            },
            {
                path: 'checkout', element: <CheckOutPage />
            },
            {
                path: 'thank-you', element: <ThankYouPage />
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