import React from 'react';
import { FacebookFilled, InstagramFilled, YoutubeFilled, TwitterCircleFilled, WhatsAppOutlined } from '@ant-design/icons';
import { Divider } from 'antd';

const SocialIcons = () => {
    const socialLinks = [
        {
            name: "Facebook",
            icon: <FacebookFilled className="text-blue-600" />, // Facebook blue
            link: "https://www.facebook.com/",
        },
        {
            name: "Instagram",
            icon: <InstagramFilled className="text-amber-700" />, // Instagram gradient color, simplified to pink
            link: "https://www.instagram.com/",
        },
        {
            name: "YouTube",
            icon: <YoutubeFilled className="text-red-600" />, // YouTube red
            link: "https://www.youtube.com/",
        },
        {
            name: "Twitter",
            icon: <TwitterCircleFilled className="text-blue-400" />, // X (formerly Twitter) blue
            link: "https://www.twitter.com/",
        },
        {
            name: "WhatsApp",
            icon: <WhatsAppOutlined className="text-green-500" />, // WhatsApp green
            link: "https://www.whatsapp.com/",
        },
    ];

    return (
        <div className=" px-4 text-center">
        <h2 className="text-lg font-bold -mb-3 relative">
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
                        className="text-3xl text-gray-600 transition-transform duration-300 ease-in-out hover:scale-125 hover:text-gray-900" // Scaling on hover
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