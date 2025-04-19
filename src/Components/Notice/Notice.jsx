import React, { useEffect, useState } from 'react';

const Notice = ({ heading, notices = [], interval = 3000 }) => {
    const [currentNoticeIndex, setCurrentNoticeIndex] = useState(0);

    useEffect(() => {
        // Only run if there are notices
        if (notices.length > 0) {
            const intervalId = setInterval(() => {
                setCurrentNoticeIndex((prevIndex) =>
                    (prevIndex + 1) % notices.length
                );
            }, interval);

            return () => clearInterval(intervalId); // Cleanup on unmount
        }
    }, [notices, interval]);

    return (
        <div className="relative px-4">
            <p className="text-2xl uppercase font-bold text-center text-black tracking-wide leading-tight drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]">
                {heading}
            </p>
            {notices.length > 0 ? (
                <p className="text-sm text-center text-gray-600 transition-opacity duration-500 ease-in-out">
                    {notices[currentNoticeIndex]}
                </p>
            ) : (
                null
            )}
        </div>
    );
};

export default Notice;
