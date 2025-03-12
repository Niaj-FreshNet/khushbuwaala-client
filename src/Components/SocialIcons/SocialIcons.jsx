import React from 'react';
import { FacebookFilled, InstagramFilled, YoutubeFilled, TwitterCircleFilled, WhatsAppOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import { BsMessenger } from 'react-icons/bs';

const SocialIcons = () => {
    const socialLinks = [
        {
            name: "Facebook",
            icon: <FacebookFilled className="text-[#1877F2]" />, // Facebook blue (#1877F2)
            link: "https://www.facebook.com/khushbuwaala",
        },
        {
            name: "Instagram",
            icon: <InstagramFilled className="text-[#E4405F]" />, // Instagram pink (#E4405F)
            link: "https://www.instagram.com/khushbuwaala_perfumes",
        },
        {
            name: "YouTube",
            icon: <YoutubeFilled className="text-[#FF0000]" />, // YouTube red (#FF0000)
            link: "https://www.youtube.com/@khushbuwaala_perfumes",
        },
        {
            name: "Messenger",
            icon: <BsMessenger className="text-[#0084FF]" />, // Messenger blue (#0084FF)
            link: "https://m.me/111483794112905",
        },
        {
            name: "WhatsApp",
            icon: <WhatsAppOutlined className="text-[#25D366]" />, // WhatsApp green (#25D366)
            link: "https://wa.me/8801566395807",
        },
    ];

    return (
        <div className=" px-4 text-center">
        <h2 className="text-md font-bold -mb-3 relative">
            Follow us on
        </h2>
        <Divider dashed>
            <span className="block w-24 mx-auto mb-1 border-b-2 border-red-500"></span> {/* Red underline */}
        </Divider>
            <div className="flex justify-center space-x-4">
                {socialLinks.map((social, index) => (
                    <a
                        key={index}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl text-gray-600 transition-transform duration-300 ease-in-out hover:scale-125 hover:text-gray-900" // Scaling on hover
                        aria-label={social.name}
                    >
                        {social.icon}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default SocialIcons;