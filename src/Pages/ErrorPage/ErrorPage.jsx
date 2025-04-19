import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Shared/Navbar/Navbar';
import Footer from '../../Shared/Footer/Footer';
import BottomBar from '../../Shared/BottomBar/BottomBar';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className='relative'>
            <Navbar />
            <div className='flex-grow mx-auto'>
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800">
                    <div className="text-center">
                        <h1 className="text-6xl font-bold text-blue-500">404</h1>
                        <p className="text-xl mt-4">Oops! The page you're looking for doesn't exist.</p>
                        <p className="text-gray-600 mt-2">It might have been moved or deleted.</p>
                        <div className="mt-6">
                            <Button
                                type="primary"
                                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                                onClick={() => navigate('/')}
                            >
                                Go Back Home
                            </Button>
                        </div>
                        <div className="mt-6">
                            <Button
                                type="primary"
                                className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
                                onClick={() => navigate('/shop')}
                            >
                                Back To Shop
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <BottomBar />
        </div>
    );
};

export default NotFoundPage;