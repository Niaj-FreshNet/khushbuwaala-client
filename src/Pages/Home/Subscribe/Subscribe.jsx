import { Divider, Input, Button } from 'antd';

const Subscribe = () => {
    return (
        <div className="max-w-lg mx-auto text-center p-6">
            <h2 className="text-xl text-black font-bold -mb-2 relative">
                Subscribe to Our Newsletter
            </h2>
            <Divider dashed>
                <span className="block w-52 mx-auto mb-2 border-b-2 border-red-500"></span> {/* Red underline */}
            </Divider>
            <p className="text-sm text-gray-500 mb-6">
                Subscribing to our newsletter allows you access to what we do and our corporate activities.
            </p>
            <div className="flex justify-center">
                <Input
                    type="email"
                    placeholder="Enter your email"
                    className="border border-gray-300 rounded-none rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button
                    type="primary"
                    className="rounded-none rounded-r-md hover:bg-blue-600 transition duration-200"
                >
                    Subscribe
                </Button>
            </div>
        </div>
    );
};

export default Subscribe;
