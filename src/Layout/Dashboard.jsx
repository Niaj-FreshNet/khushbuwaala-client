import { FaAd, FaCalendar, FaFirstOrder, FaHome, FaList, FaShoppingCart } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { FaBook, FaPlus, FaProductHunt, FaUser } from "react-icons/fa6";
import { MdAllInbox } from "react-icons/md";
import { FcSalesPerformance } from "react-icons/fc";

const Dashboard = () => {
    // const [cart] = useCart();
    // const [menu, , refetch] = useMenu();
    // const axiosSecure = useAxiosSecure();

    return (
        <div className="flex">
            {/* sidebar */}
            <div className="bg-black">
                <ul className="menu sticky top-8 p-4 my-8 text-md font-bold text-white">

                    <li><NavLink to="/dashboard/orders">
                        <FaFirstOrder />
                        Orders</NavLink>
                    </li>
                    <li><NavLink to="/dashboard/sales">
                        <FcSalesPerformance />
                        Sales</NavLink>
                    </li>
                    <li><NavLink to="/dashboard/add">
                        <FaPlus></FaPlus>
                        Add Item</NavLink>
                    </li>
                    <li><NavLink to="/dashboard/all">
                        <FaProductHunt />
                        All Items</NavLink>
                    </li>
                    <li><NavLink to="/dashboard/reports">
                        <FaBook></FaBook>
                        Reports</NavLink>
                    </li>
                    <li><NavLink to="/dashboard/users">
                        <FaUser></FaUser>
                        All Users
                        {/* <div className="badge badge-secondary">{users.length}</div> */}
                    </NavLink>
                    </li>

                    <div className="divider my-8"></div>
                    <li><NavLink to="/">
                        Home</NavLink>
                    </li>
                    <li><NavLink to="/shop">
                        Shop</NavLink>
                    </li>
                    <li><NavLink to="/categories">
                        Categories</NavLink>
                    </li>
                    <li><NavLink to="/traffic">
                        Traffic</NavLink>
                    </li>
                    <li><NavLink to="/meta">
                        Meta</NavLink>
                    </li>
                    {/* <li className="menu sticky pt-14 text-center">
                        KhushbuWaala Perfumes Int'l.
                    </li> */}
                </ul>
            </div>
            {/* dashboard content */}
            <div className="w-5/6 flex-grow mx-auto py-4 px-6">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;