import { Outlet } from 'react-router-dom';
import Footer from '../Shared/Footer/Footer';
import Navbar from '../Shared/Navbar/Navbar';
import BottomBar from '../Shared/BottomBar/BottomBar';

const Main = () => {
    return (
        <div className='relative bg-white'>
            <div className=''>
                <Navbar />
            </div>
            <div className='flex-grow mx-auto'>
                <Outlet />
            </div>
            <div className=''>
                <Footer />
            </div>
            <BottomBar />
        </div>
    );
};

export default Main;