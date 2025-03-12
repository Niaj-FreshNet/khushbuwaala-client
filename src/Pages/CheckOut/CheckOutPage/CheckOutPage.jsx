import React, { useContext, useEffect, useState } from 'react';
import { Button, Checkbox, Input, Radio, Form, message, Select } from 'antd';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import { CartContext } from '../../../Cart/CartContext';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import ReactPixel from 'react-facebook-pixel';

const CheckOutPage = () => {
    const axiosPublic = useAxiosPublic();
    const { cartItems, calculateSubtotal, checkoutMode, checkoutItem, clearCart } = useContext(CartContext);
    const [shippingMethod, setShippingMethod] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('cashOnDelivery');
    const [billingType, setBillingType] = useState('sameAsShipping'); // Updated variable name
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [customThana, setCustomThana] = useState("");


    // Scroll to top on page load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Determine which items to display on checkout
    const itemsToDisplay = checkoutMode && checkoutItem ? [checkoutItem] : cartItems;

    // Shipping cost calculation based on shipping method
    const shippingCost = shippingMethod === 'outsideDhaka' ? 110 : 50;
    const subtotal = calculateSubtotal();
    const estimatedTaxes = subtotal * 0.00; // Assuming 0% tax
    const total = subtotal + estimatedTaxes + shippingCost;
    const navigate = useNavigate();

    const handlePaymentChange = e => {
        setPaymentMethod(e.target.value);
    };

    const handleShippingChange = (e) => {
        setShippingMethod(e.target.value);
    };

    const handleBillingChange = e => {
        setBillingType(e.target.value); // Update state with selected billing type
    };

    const handleCompleteOrder = async (values) => {
        if (!paymentMethod) {
            message.error("Please select a payment method.");
            return;
        }

        const { email, name, address, district, thana, contactNumber, notes, billingName, billingAddress, billingDistrict, billingThana, billingContactNumber } = values;
        // console.log(values)

        const orderDetails = {
            cartItems: itemsToDisplay,
            subtotal,
            shippingCost,
            estimatedTaxes,
            total,
            paymentMethod,
            shippingMethod,
            postStatus: 'Pending',
            paymentStatus: 'Due',
            notes,
            contactInfo: {
                email,
            },
            shippingAddress: {
                name,
                // lastName,
                address,
                district,
                thana,
                contactNumber,
            },
            billingAddress: billingType === 'sameAsShipping' ?
                { name, address, district, thana, contactNumber } :  // Copy shipping info
                {
                    name: billingName,
                    address: billingAddress,
                    district: billingDistrict,
                    thana: billingThana,
                    contactNumber: billingContactNumber,
                }
        };
        console.log(orderDetails);

        try {
            const response = await axiosPublic.post('/api/orders', orderDetails);
            if (response.status === 201 && response.data.orderId) {
                console.log(response.data.orderId)
                // Trigger Meta Pixel event for Purchase
                ReactPixel.track('Purchase', {
                    content_ids: itemsToDisplay.map((item) => item._id),
                    content_type: 'product',
                    value: total,
                    currency: 'BDT',
                });
                navigate(`/thank-you?orderId=${response.data.orderId}`);
                clearCart();
            } else {
                message.error("Failed to complete the order. Please try again.");
            }
        } catch (error) {
            console.error("Error processing order:", error);
            message.error("Error processing your order. Please try again.");
        }
    };

    const onFinishFailed = (errorInfo) => {
        message.error("Please complete all required fields before submitting.");
    };

    // Toggle the accordion state for order summary
    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    const handleDistrictChange = (value) => {
        setSelectedDistrict(value);
    };

    const handleThanaChange = (value) => {
        setCustomThana(""); // Clear custom thana if dropdown is used
    };

    const handleCustomThana = (value) => {
        setCustomThana(value);
    };

    const districts = [
        "Bagerhat", "Bandarban", "Barguna", "Barishal", "Bhola", "Bogura", "Brahmanbaria", "Chandpur",
        "Chattogram", "Chuadanga", "Cox's Bazar", "Cumilla", "Dhaka", "Dinajpur", "Faridpur", "Feni",
        "Gaibandha", "Gazipur", "Gopalganj", "Habiganj", "Jamalpur", "Jashore", "Jhalokati", "Jhenaidah",
        "Joypurhat", "Khagrachari", "Khulna", "Kishoreganj", "Kurigram", "Kushtia", "Lakshmipur",
        "Lalmonirhat", "Madaripur", "Magura", "Manikganj", "Meherpur", "Moulvibazar", "Munshiganj",
        "Mymensingh", "Naogaon", "Narail", "Narayanganj", "Narsingdi", "Natore", "Netrokona",
        "Nilphamari", "Noakhali", "Pabna", "Panchagarh", "Patuakhali", "Pirojpur", "Rajbari", "Rajshahi",
        "Rangamati", "Rangpur", "Satkhira", "Shariatpur", "Sherpur", "Sirajganj", "Sunamganj",
        "Sylhet", "Tangail", "Thakurgaon"
    ];

    const thanas = {
        "Dhaka": [
            "Dhanmondi", "Gulshan", "Mohammadpur", "Uttara East", "Uttara West", "Pallabi", "Mirpur Model",
            "Kafrul", "Shah Ali", "Adabor", "Tejgaon", "Tejgaon Industrial Area", "Shahbagh", "Ramna", "Motijheel",
            "Sabujbagh", "Jatrabari", "Demra", "Khilgaon", "Badda", "Rampura", "Banani", "Airport", "Cantonment",
            "Kamrangirchar", "Hazaribagh", "New Market", "Lalbagh", "Kotwali", "Bangshal", "Chawkbazar Model",
            "Shyampur", "Wari", "Turag", "Keraniganj South", "Keraniganj North", "Savar", "Ashulia"
        ],

        "Chittagong": [
            "Kotwali", "Panchlaish", "Chandgaon", "Double Mooring", "Khulshi", "Bayezid", "Pahartali", "Bakalia",
            "Chawkbazar", "Patenga", "EPZ", "Halishahar", "Karnaphuli", "Bakshtara", "Akbar Shah"
        ],

        "Khulna": [
            "Khalishpur", "Daulatpur", "Sonadanga", "Khan Jahan Ali", "Rupsha", "Kotwali", "Kushtia", "Batiaghata",
            "Terokhada", "Dumuria", "Fultala", "Dighalia"
        ], "Rajshahi": [
            "Boalia", "Rajpara", "Motihar", "Shah Makhdum", "Paba", "Katakhali", "Tanore", "Godagari",
            "Durgapur", "Bagmara", "Puthia", "Charghat"
        ],

        "Sylhet": [
            "Kotwali", "Shah Paran", "Jalalabad", "Airport", "South Surma", "Moglabazar", "Dakshin Surma",
            "Osmaninagar", "Balaganj", "Fenchuganj", "Beanibazar", "Bishwanath"
        ],

        "Barisal": [
            "Kotwali", "Kaunia", "Airport", "Bagerhat", "Gournadi", "Bakerganj", "Uzirpur", "Banaripara",
            "Agailjhara", "Mehendiganj", "Muladi", "Babuganj"
        ],

        "Rangpur": [
            "Kotwali", "Mithapukur", "Taraganj", "Badarganj", "Gangachara", "Pirgachha", "Kaunia", "Rangpur Sadar"
        ],

        "Mymensingh": [
            "Kotwali", "Muktagachha", "Bhaluka", "Fulbaria", "Gaffargaon", "Gouripur", "Trishal",
            "Ishwarganj", "Nandail", "Haluaghat", "Phulpur", "Dhobaura"
        ],

        "Comilla": [
            "Kotwali", "Sadar South", "Debidwar", "Homna", "Muradnagar", "Nangalkot", "Daudkandi",
            "Brahmanpara", "Monohorgonj", "Titas", "Chandina", "Laksam"
        ], "Barguna": [
            "Barguna Sadar", "Amtali", "Bamna", "Betagi", "Patharghata", "Taltoli"
        ],

        "Bhola": [
            "Bhola Sadar", "Burhanuddin", "Char Fasson", "Daulatkhan", "Lalmohan", "Manpura", "Tazumuddin"
        ],

        "Jhalokathi": [
            "Jhalokathi Sadar", "Kathalia", "Nalchity", "Rajapur"
        ],

        "Patuakhali": [
            "Patuakhali Sadar", "Bauphal", "Dashmina", "Galachipa", "Kalapara", "Mirzaganj", "Rangabali"
        ],

        "Pirojpur": [
            "Pirojpur Sadar", "Bhandaria", "Kawkhali", "Mathbaria", "Nazirpur", "Nesarabad", "Indurkani"
        ],

        "Bogra": [
            "Bogra Sadar", "Dhupchanchia", "Gabtali", "Kahaloo", "Nandigram", "Sariakandi", "Shajahanpur",
            "Sherpur", "Shibganj", "Sonatala"
        ],

        "Joypurhat": [
            "Joypurhat Sadar", "Akkelpur", "Kalai", "Khetlal", "Panchbibi"
        ],

        "Naogaon": [
            "Naogaon Sadar", "Atrai", "Badalgachhi", "Manda", "Mohadevpur", "Niamatpur", "Patnitala", "Porsha",
            "Raninagar", "Sapahar", "Dhamoirhat"
        ],

        "Natore": [
            "Natore Sadar", "Bagatipara", "Baraigram", "Gurudaspur", "Lalpur", "Singra"
        ],

        "Chapainawabganj": [
            "Chapainawabganj Sadar", "Bholahat", "Gomastapur", "Nachole", "Shibganj"
        ],

        "Pabna": [
            "Pabna Sadar", "Atgharia", "Bera", "Bhangura", "Chatmohar", "Faridpur", "Ishwardi", "Santhia",
            "Sujanagar"
        ],

        "Sirajganj": [
            "Sirajganj Sadar", "Belkuchi", "Chauhali", "Kamarkhanda", "Kazipur", "Raiganj", "Shahjadpur",
            "Tarash", "Ullapara"
        ],

        "Dinajpur": [
            "Dinajpur Sadar", "Birampur", "Birganj", "Biral", "Bochaganj", "Chirirbandar", "Fulbari", "Ghoraghat",
            "Hakimpur", "Kaharole", "Khansama", "Nawabganj", "Parbatipur"
        ],

        "Gaibandha": [
            "Gaibandha Sadar", "Fulchhari", "Gobindaganj", "Palashbari", "Sadullapur", "Saghata", "Sundarganj"
        ],

        "Kurigram": [
            "Kurigram Sadar", "Bhurungamari", "Char Rajibpur", "Chilmari", "Nageshwari", "Phulbari",
            "Rajarhat", "Raomari", "Ulipur"
        ],

        "Lalmonirhat": [
            "Lalmonirhat Sadar", "Aditmari", "Hatibandha", "Kaliganj", "Patgram"
        ],

        "Nilphamari": [
            "Nilphamari Sadar", "Dimla", "Domar", "Jaldhaka", "Kishoreganj", "Saidpur"
        ],

        "Panchagarh": [
            "Panchagarh Sadar", "Atwari", "Boda", "Debiganj", "Tetulia"
        ],

        "Thakurgaon": [
            "Thakurgaon Sadar", "Baliadangi", "Haripur", "Pirganj", "Ranisankail"
        ],

        "Bagerhat": [
            "Bagerhat Sadar", "Chitalmari", "Fakirhat", "Kachua", "Mollahat", "Mongla", "Morrelganj",
            "Rampal", "Sarankhola"
        ],

        "Chuadanga": [
            "Chuadanga Sadar", "Alamdanga", "Damurhuda", "Jibannagar"
        ],

        "Jessore": [
            "Jessore Sadar", "Abhaynagar", "Bagherpara", "Chaugachha", "Jhikargachha", "Keshabpur",
            "Manirampur", "Sharsha"
        ],

        "Jhenaidah": [
            "Jhenaidah Sadar", "Harinakunda", "Kaliganj", "Kotchandpur", "Maheshpur", "Shailkupa"
        ],

        "Kushtia": [
            "Kushtia Sadar", "Bheramara", "Daulatpur", "Khoksa", "Kumarkhali", "Mirpur"
        ],

        "Magura": [
            "Magura Sadar", "Mohammadpur", "Shalikha", "Sreepur"
        ],

        "Meherpur": [
            "Meherpur Sadar", "Gangni", "Mujibnagar"
        ],

        "Narail": [
            "Narail Sadar", "Kalia", "Lohagara"
        ],

        "Satkhira": [
            "Satkhira Sadar", "Assasuni", "Debhata", "Kalaroa", "Kaliganj", "Shyamnagar", "Tala"
        ],

        "Habiganj": [
            "Habiganj Sadar", "Ajmiriganj", "Bahubal", "Baniachong", "Chunarughat", "Lakhai", "Madhabpur",
            "Nabiganj"
        ],

        "Moulvibazar": [
            "Moulvibazar Sadar", "Barlekha", "Juri", "Kamalganj", "Kulaura", "Rajnagar", "Sreemangal"
        ],

        "Sunamganj": [
            "Sunamganj Sadar", "Bishwamvarpur", "Chhatak", "Dakshin Sunamganj", "Derai", "Dharampasha",
            "Dowarabazar", "Jagannathpur", "Jamalganj", "Sulla", "Tahirpur"
        ],

        "Brahmanbaria": [
            "Brahmanbaria Sadar", "Ashuganj", "Bancharampur", "Bijoynagar", "Kasba", "Nabinagar",
            "Nasirnagar", "Sarail"
        ],

        "Chandpur": [
            "Chandpur Sadar", "Faridganj", "Haimchar", "Haziganj", "Kachua", "Matlab North", "Matlab South",
            "Shahrasti"
        ],

        "Cox's Bazar": [
            "Cox's Bazar Sadar", "Chakaria", "Kutubdia", "Maheshkhali", "Pekua", "Ramu", "Teknaf", "Ukhia"
        ],

        "Feni": [
            "Feni Sadar", "Chhagalnaiya", "Daganbhuiyan", "Fulgazi", "Parshuram", "Sonagazi"
        ],

        "Lakshmipur": [
            "Lakshmipur Sadar", "Ramganj", "Raipur", "Ramgati", "Kamalnagar"
        ],

        "Noakhali": [
            "Noakhali Sadar", "Begumganj", "Chatkhil", "Companiganj", "Hatiya", "Senbagh", "Sonaimuri",
            "Subarnachar"
        ],

        "Bandarban": [
            "Bandarban Sadar", "Thanchi", "Ruma", "Rowangchhari", "Lama", "Naikhongchhari", "Alikadam"
        ],

        "Khagrachari": [
            "Khagrachari Sadar", "Dighinala", "Lakshmichhari", "Mahalchhari", "Manikchhari", "Matiranga",
            "Panchhari", "Ramgarh"
        ],

        "Rangamati": [
            "Rangamati Sadar", "Baghaichhari", "Barkal", "Kaptai", "Juraichhari", "Langadu", "Naniarchar",
            "Rajasthali"
        ],

        "Faridpur": [
            "Faridpur Sadar", "Alfadanga", "Bhanga", "Boalmari", "Charbhadrasan", "Madhukhali",
            "Nagarkanda", "Sadarpur", "Saltha"
        ],

        "Gazipur": [
            "Gazipur Sadar", "Kaliakair", "Kaliganj", "Kapasia", "Sreepur"
        ],

        "Gopalganj": [
            "Gopalganj Sadar", "Kashiani", "Kotalipara", "Muksudpur", "Tungipara"
        ],
        "Kishoreganj": [
            "Kishoreganj Sadar", "Astagram", "Bajitpur", "Bhairab", "Hossainpur", "Itna", "Karimganj", "Katiadi",
            "Kuliarchar", "Mithamoin", "Nikli", "Pakundia", "Tarail"
        ],

        "Madaripur": [
            "Madaripur Sadar", "Kalkini", "Rajoir", "Shibchar"
        ],

        "Manikganj": [
            "Manikganj Sadar", "Daulatpur", "Ghior", "Harirampur", "Saturia", "Shivalaya", "Singair"
        ],

        "Munshiganj": [
            "Munshiganj Sadar", "Gazaria", "Lohajang", "Sirajdikhan", "Sreenagar", "Tongibari"
        ],

        "Narayanganj": [
            "Narayanganj Sadar", "Araihazar", "Bandar", "Rupganj", "Sonargaon"
        ],

        "Narsingdi": [
            "Narsingdi Sadar", "Belabo", "Monohardi", "Palash", "Raipura", "Shibpur"
        ],

        "Shariatpur": [
            "Shariatpur Sadar", "Bhedarganj", "Damudya", "Gosairhat", "Naria", "Zajira"
        ],

        "Tangail": [
            "Tangail Sadar", "Bhuapur", "Delduar", "Ghatail", "Gopalpur", "Kalihati", "Madhupur", "Mirzapur",
            "Nagarpur", "Sakhipur", "Dhanbari", "Basail"
        ],

        "Jamalpur": [
            "Jamalpur Sadar", "Baksiganj", "Dewanganj", "Islampur", "Madarganj", "Melandaha", "Sarishabari"
        ],

        "Netrokona": [
            "Netrokona Sadar", "Atpara", "Barhatta", "Durgapur", "Khaliajuri", "Kalmakanda", "Kendua",
            "Madan", "Mohanganj", "Purbadhala"
        ],

        "Sherpur": [
            "Sherpur Sadar", "Jhenaigati", "Nakla", "Nalitabari", "Sreebardi"
        ],

        "Mymensingh": [
            "Mymensingh Sadar", "Bhaluka", "Dhobaura", "Fulbaria", "Gaffargaon", "Gauripur", "Haluaghat", "Ishwarganj", "Muktagacha", "Nandail", "Phulpur", "Trishal"
        ],

        "Narayanganj": [
            "Narayanganj Sadar", "Araihazar", "Bandar", "Rupganj", "Sonargaon"
        ],

        "Narsingdi": [
            "Narsingdi Sadar", "Belabo", "Monohardi", "Palash", "Raipura", "Shibpur"
        ],

        "Netrokona": [
            "Netrokona Sadar", "Atpara", "Barhatta", "Durgapur", "Khaliajuri", "Kalmakanda", "Kendua", "Madan", "Mohanganj", "Purbadhala"
        ],

        "Rajbari": [
            "Rajbari Sadar", "Baliakandi", "Goalandaghat", "Pangsha"
        ],
    };


    return (
        <div className="max-w-screen-2xl bg-gray-50 mx-auto mt-9 lg:mt-8 border-b-2 py-8">
            {/* Checkout Page Header */}
            <div className="bg-black mx-auto flex justify-center items-center py-0 mb-8">
                <h2 className="text-lg pt-2 font-bold text-white text-center py-[2px] my-auto">Checkout</h2>
            </div>
            <div>

                {/* Order Summary Details with Smooth Dropdown */}
                <div
                    className={`lg:hidden bg-white border-2 py-6 -mt-8 mb-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen overflow-y-auto' : 'max-h-0'}`}
                >
                    {/* Dropdown Header */}
                    <div
                        className="lg:hidden bg-gray-200 mx-auto flex justify-between items-center px-5 py-4 -mt-8 mb-8 cursor-pointer"
                        onClick={toggleAccordion}
                    >
                        <div className='flex items-center gap-2'>
                            <h2 className="text-xs text-black py-[2px] my-auto">Show order summary</h2>
                            {isOpen ? <MdArrowDropUp /> : <MdArrowDropDown />}
                        </div>
                        <h2 className="text-xl font-bold text-black py-[2px] my-auto">Tk {total.toFixed(2)} BDT</h2>
                    </div>
                    <div className="p-4 mb-2">
                        {/* <h2 className='text-md font-bold'>Order Summary</h2> */}
                        <div className='mt-4'>
                            {/* Cart Products */}
                            <div>
                                {itemsToDisplay.map((product, index) => (
                                    <div key={index} className='flex flex-col border-b py-2 mb-2'>
                                        <div className='flex gap-4 items-start'>
                                            <div className='flex relative'>
                                                <img src={product.primaryImage} alt={product.name} className="w-16 h-20 bg-gray-100 p-1 rounded-md border" />
                                                {/* Quantity Badge */}
                                                <span className='absolute -top-2 -right-2 bg-gray-300 text-black text-xs rounded-full px-2 py-0.5'>
                                                    {product.quantity}
                                                </span>
                                            </div>

                                            {/* Product Details */}
                                            <div className='flex-1'>
                                                <h2 className='text-lg text-gray-800'>{product.name}</h2>
                                                <div className='flex gap-2'>
                                                    <p className='text-gray-500 text-sm'>{product.size}</p>
                                                </div>
                                            </div>

                                            {/* Price */}
                                            <span className="font-medium text-sm text-gray-800">
                                                Tk {(product.variantPrices[product.size] * product.quantity).toFixed(2)} BDT
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='flex justify-between text-sm mb-2 mt-6'>
                                <span>Subtotal</span>
                                <span>Tk {subtotal.toFixed(2)} BDT</span>
                            </div>
                            <div className='flex justify-between text-sm mb-2'>
                                <span>Shipping</span>
                                <span>Tk {shippingCost.toFixed(2)} BDT</span>
                            </div>
                            <div className='flex justify-between text-sm mb-2'>
                                <span>Estimated Taxes</span>
                                <span>Tk {estimatedTaxes.toFixed(2)} BDT</span>
                            </div>
                            <div className='mt-4'>
                                <Form layout="vertical" className='mt-2'>
                                    <div className='flex items-center w-full'>
                                        <Form.Item className='flex-grow'>
                                            <Input placeholder="Enter discount code" className='placeholder-gray-600 px-4 py-[10px] bg-white -mb-4 w-full' />
                                        </Form.Item>
                                        <Form.Item className='ml-2'>
                                            <Button type="default" className='text-md font-bold rounded-md bg-black text-white h-[44px]'>
                                                Apply
                                            </Button>
                                        </Form.Item>
                                    </div>
                                </Form>
                            </div>
                            <div className='flex justify-between text-lg font-bold'>
                                <span>Total</span>
                                <span>Tk {total.toFixed(2)} BDT</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='max-w-screen-xl mx-auto flex flex-wrap px-4 lg:px-8'>
                {/* Left Side: Checkout Form */}
                <div className='w-full lg:w-1/2 lg:pl-24'>
                    <Form
                        layout="vertical"
                        onFinish={handleCompleteOrder}
                        onFinishFailed={onFinishFailed}
                    >

                        {/* Shipping Address Section */}
                        <div className="mb-2">
                            <h2 className="text-md font-bold mb-4">Delivery Address</h2>
                            {/* <div className='flex justify-between gap-4'> */}
                            <Form.Item name="name" rules={[{ required: true, message: '' }]}>
                                <Input placeholder="Name" className='placeholder-gray-600 px-4 py-[10px] bg-white -mb-4' />
                            </Form.Item>
                            {/* </div> */}
                            <Form.Item name="address" rules={[{ required: true, message: '' }]}>
                                <Input placeholder="Full Address" className='placeholder-gray-600 px-4 py-[10px] bg-white -mb-4' />
                            </Form.Item>
                            <Form.Item name="contactNumber" rules={[{ required: true, message: '' }]}>
                                <Input placeholder="Contact Number" className='placeholder-gray-600 px-4 py-[10px] bg-white -mb-4' />
                            </Form.Item>
                            <div className='flex justify-between gap-4'>
                                {/* <Form.Item name="district" rules={[{ required: true, message: '' }]} className='w-1/2'>
                                    <Input placeholder="District" className='placeholder-gray-600 px-4 py-[10px] bg-white -mb-4' />
                                </Form.Item>
                                <Form.Item name="thana" className='w-1/2'>
                                    <Input placeholder="Thana (optional)" className='placeholder-gray-600 px-4 py-[10px] bg-white -mb-4' />
                                </Form.Item> */}
                                <Form.Item name="district" rules={[{ required: true, message: '' }]} className='w-1/2'>
                                    <Select
                                        placeholder="Select your district"
                                        onChange={(value) => handleDistrictChange(value)}
                                        className="w-full placeholder-gray-600 bg-white -mb-4"
                                        allowClear
                                        showSearch
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().includes(input.toLowerCase())
                                        }
                                    >
                                        {districts.map((district) => (
                                            <Select.Option key={district} value={district}>
                                                {district}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item name="thana" rules={[{ required: false, message: '' }]} className='w-1/2'>
                                    {/* <Select
                                        className="w-full placeholder-gray-600 bg-white -mb-4"
                                        placeholder="Select or enter your thana"
                                        allowClear
                                        onChange={(value) => handleThanaChange(value)}
                                        dropdownRender={(menu) => (
                                            <>
                                                {menu}
                                                <div className="p-2">
                                                    <Input
                                                        placeholder="Write your thana (if not listed)"
                                                        className="mt-2"
                                                        onChange={(e) => handleCustomThana(e.target.value)}
                                                        value={customThana}
                                                    />
                                                </div>
                                            </>
                                        )}
                                    >
                                        {thanas[selectedDistrict]?.map((thana) => (
                                            <Select.Option key={thana} value={thana}>
                                                {thana}
                                            </Select.Option>
                                        ))}
                                    </Select> */}
                                    <Input
                                        className="w-full placeholder-gray-600 bg-white"
                                        placeholder="Thana (optional)"
                                        onChange={(e) => handleCustomThana(e.target.value)}
                                        value={customThana}
                                    />
                                </Form.Item>
                            </div>
                            {/* <Form.Item>
                                <Checkbox>Save this information for next time</Checkbox>
                            </Form.Item> */}
                        </div>

                        {/* Shipping Method Section */}
                        <div className="mb-6">
                            <h2 className="text-md font-bold mb-4">Shipping Method</h2>
                            <Form.Item
                                name="shippingMethod"
                                rules={[{ required: true, message: 'Please select the shipping method' }]}
                            >
                                <Radio.Group
                                    onChange={handleShippingChange}
                                    value={shippingMethod}
                                    className="flex flex-col"
                                >
                                    <Radio value="insideDhaka" className="border-2 p-[10px] text-black bg-white rounded-t-md">
                                        Inside Dhaka - 50 TK
                                    </Radio>
                                    <Radio value="outsideDhaka" className="border-b-2 border-l-2 border-r-2 p-[10px] text-black bg-white rounded-b-md">
                                        Outside Dhaka - 110 TK
                                    </Radio>
                                </Radio.Group>
                            </Form.Item>
                        </div>

                        {/* Notes Section */}
                        <div className="mb-6">
                            <h2 className="text-md font-bold mb-4">Contact Email <span className="font-normal">(optional)</span></h2>
                            <Form.Item
                                name="email"
                                rules={[
                                    { required: false, message: 'Please enter your email' },
                                    { type: 'email', message: 'Enter a valid email address' },
                                ]}
                            >
                                <Input
                                    placeholder="Enter your email (optional)"
                                    className="placeholder-gray-600 px-4 py-[10px] bg-white border rounded"
                                />
                            </Form.Item>
                            <Form.Item name="newsletter" valuePropName="checked" className="-mt-4">
                                <Checkbox>Email me with news and offers</Checkbox>
                            </Form.Item>

                            {/* Additional Notes */}
                            <div className="mt-6">
                                <h2 className="text-md font-bold mb-4">Additional Notes <span className="font-normal">(optional)</span></h2>
                                <Form.Item name="notes">
                                    <Input.TextArea
                                        placeholder="Add any specific instructions or notes for your order"
                                        rows={4}
                                        className="placeholder-gray-600 px-4 py-[10px] bg-white border rounded"
                                    />
                                </Form.Item>
                            </div>
                        </div>


                        {/* Billing Address Section */}
                        <div className="mb-6">
                            <h2 className="text-md font-bold mb-4">Billing Address</h2>
                            <Radio.Group onChange={handleBillingChange} value={billingType} className="flex flex-col mb-4">
                                {/* <div className="border-2 p-[10px] text-black bg-white rounded-t-md"> */}
                                <Radio value="sameAsShipping" className="border-2 p-[10px] text-black bg-white rounded-t-md">
                                    Same as shipping address
                                </Radio>
                                {/* </div> */}
                                {/* <div> */}
                                <Radio value="differentBillingAddress" className="border-b-2 border-l-2 border-r-2 p-[10px] text-black bg-white rounded-b-md">
                                    Use a different billing address
                                    {/* </div> */}
                                </Radio>

                                {billingType === 'differentBillingAddress' && (
                                    <div className='mt-2 p-2 py-0 border-2'>
                                        {/* <Form layout="vertical" className='pr-2'> */}
                                        <div className='mt-2 mb-1'>
                                            <h2>Billing Information</h2>
                                        </div>
                                        <Form.Item name="billingName" rules={[{ required: true, message: '' }]}>
                                            <Input placeholder="Name" className='placeholder-gray-600 px-4 py-[10px] bg-white -mb-4' />
                                        </Form.Item>
                                        <Form.Item name="billingAddress" rules={[{ required: true, message: '' }]}>
                                            <Input placeholder="Address" className='placeholder-gray-600 px-4 py-[10px] bg-white -mb-4' />
                                        </Form.Item>
                                        <div className='flex justify-between gap-4'>
                                            <Form.Item name="billingDistrict" rules={[{ required: true, message: '' }]} className='w-1/2'>
                                                <Input placeholder="District" className='placeholder-gray-600 px-4 py-[10px] bg-white -mb-4' />
                                            </Form.Item>
                                            <Form.Item name="billingThana" className='w-1/2'>
                                                <Input placeholder="Thana" className='placeholder-gray-600 px-4 py-[10px] bg-white -mb-4' />
                                            </Form.Item>
                                        </div>
                                        <Form.Item name="billingContactNumber" rules={[{ required: true, message: '' }]}>
                                            <Input placeholder="Contact Number" className='placeholder-gray-600 px-4 py-[10px] bg-white -mb-4' />
                                        </Form.Item>
                                        {/* </Form> */}
                                    </div>
                                )}
                            </Radio.Group>
                        </div>

                        {/* Payment Section */}
                        <div className="mb-2">
                            <h2 className="text-md font-bold mb-2">Payment</h2>
                            <p className="text-xs text-gray-500 mb-4">All transactions are secure and encrypted.</p>
                            <Radio.Group onChange={handlePaymentChange} value={paymentMethod} className="flex flex-col mb-4">
                                {/* <div> */}
                                <Radio disabled value="sslCommerz" className="border-2 p-[10px] text-black bg-white rounded-t-md">
                                    Pay First (Online Payment)
                                </Radio>
                                {paymentMethod === 'sslCommerz' && (
                                    <p className='text-xs text-pretty p-2'>
                                        After clicking “Pay now”, you will be redirected to SSLCOMMERZ to complete your purchase securely.
                                    </p>
                                )}
                                {/* </div> */}
                                {/* <div className="border-b-2 border-l-2 border-r-2 p-[10px] text-black bg-white rounded-b-md"> */}
                                <Radio value="cashOnDelivery" className="border-b-2 border-l-2 border-r-2 p-[10px] text-black bg-white rounded-b-md">
                                    Cash on Delivery (COD)
                                </Radio>
                                {paymentMethod === 'cashOnDelivery' && (
                                    <p className='text-xs text-pretty p-2'>
                                        Free shipping for items over 1,000 Taka. Shipping charge applied for items below 1,000 Taka.
                                    </p>
                                )}
                                {/* </div> */}
                            </Radio.Group>
                        </div>


                        <div className="lg:hidden p-4 mb-2 ">
                            <h2 className='text-md font-bold'>Order Summary</h2>
                            <div className='mt-4'>
                                {/* Cart Products */}
                                <div>
                                    {itemsToDisplay.map((product, index) => (
                                        <div key={index} className='flex flex-col border-b py-2 mb-2'>
                                            <div className='flex gap-4 items-start'>
                                                <div className='flex relative'>
                                                    <img src={product.primaryImage} alt={product.name} className="w-16 h-20 bg-gray-100 p-1 rounded-md border" />
                                                    {/* Quantity Badge */}
                                                    <span className='absolute -top-2 -right-2 bg-gray-300 text-black text-xs rounded-full px-2 py-0.5'>
                                                        {product.quantity}
                                                    </span>
                                                </div>

                                                {/* Product Details */}
                                                <div className='flex-1'>
                                                    <h2 className='text-md text-gray-800'>{product.name}</h2>
                                                    <div className='flex gap-2'>
                                                        <p className='text-gray-500 text-xs'>{product.size}</p>
                                                    </div>
                                                </div>

                                                {/* Price */}
                                                <span className="font-medium text-sm text-gray-800">
                                                    Tk {(product.variantPrices[product.size] * product.quantity).toFixed(2)} BDT
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className='flex justify-between text-sm mb-2 mt-6'>
                                    <span>Subtotal</span>
                                    <span>Tk {subtotal.toFixed(2)} BDT</span>
                                </div>
                                <div className='flex justify-between text-sm mb-2'>
                                    <span>Shipping</span>
                                    <span>Tk {shippingCost.toFixed(2)} BDT</span>
                                </div>
                                <div className='flex justify-between text-sm mb-2'>
                                    <span>Estimated Taxes</span>
                                    <span>Tk {estimatedTaxes.toFixed(2)} BDT</span>
                                </div>
                                <div className='mt-4'>
                                    <Form layout="vertical" className='mt-2'>
                                        <div className='flex items-center w-full'>
                                            <Form.Item className='flex-grow'>
                                                {/* Apply dicount coupon */}
                                                <Input placeholder="Enter discount code" className='placeholder-gray-600 px-4 py-[10px] bg-white w-full' />
                                            </Form.Item>
                                            <Form.Item className='ml-2'>
                                                <Button type="default" className='text-md font-bold rounded-md bg-black text-white h-[44px]'>
                                                    Apply
                                                </Button>
                                            </Form.Item>
                                        </div>
                                    </Form>
                                </div>
                                <div className='flex justify-between text-lg font-bold'>
                                    <span>Total</span>
                                    <span>Tk {total.toFixed(2)} BDT</span>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <Form.Item>
                            <Button
                                type="primary"
                                size="large"
                                className="w-full text-xl font-bold rounded-md bg-black text-white h-[60px]"
                                htmlType="submit"
                            >
                                Complete Order
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

                {/* Right Side: Order Summary */}
                <div className='hidden lg:block lg:w-1/2 lg:pl-32 lg:px-4 lg:mt-0'>
                    <div className='sticky lg:top-20'>
                        <div className='bg-white p-8 mb-8 rounded-lg'>
                            <h2 className='text-md font-bold'>Order Summary</h2>
                            <div className='mt-4'>
                                {/* Cart Products */}
                                <div>
                                    {itemsToDisplay.map((product, index) => (
                                        <div key={index} className='flex flex-col border-b py-2 mb-2'>
                                            <div className='flex gap-4 items-start'>
                                                <div className='flex relative'>
                                                    <img src={product.primaryImage} alt={product.name} className="w-16 h-20 bg-gray-100 p-1 rounded-md border" />
                                                    {/* Quantity Badge */}
                                                    <span className='absolute -top-2 -right-2 bg-gray-300 text-black text-xs rounded-full px-2 py-0.5'>
                                                        {product.quantity}
                                                    </span>
                                                </div>

                                                {/* Product Details */}
                                                <div className='flex-1'>
                                                    <h2 className='text-lg text-gray-800'>{product.name}</h2>

                                                    <div className='flex gap-2'>
                                                        {/* <p className='text-gray-500 text-sm'>{product.color}</p>
                                                        <p className='text-gray-500 text-sm'>/</p> */}
                                                        <p className='text-gray-500 text-sm'>{product.size}</p>
                                                    </div>
                                                </div>

                                                {/* Price */}
                                                <span className="font-medium text-sm text-gray-800">
                                                    Tk {(product.variantPrices[product.size] * product.quantity).toFixed(2)} BDT
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className='flex justify-between text-sm mb-2 mt-6'>
                                    <span>Subtotal</span>
                                    <span>Tk {subtotal.toFixed(2)} BDT</span>
                                </div>
                                <div className='flex justify-between text-sm mb-2'>
                                    <span>Shipping</span>
                                    <span>Tk {shippingCost.toFixed(2)} BDT</span>
                                </div>
                                <div className='flex justify-between text-sm mb-2'>
                                    <span>Estimated Taxes</span>
                                    <span>Tk {estimatedTaxes.toFixed(2)} BDT</span>
                                </div>
                                <div className='mt-4'>
                                    <Form layout="vertical" className='mt-2'>
                                        <div className='flex items-center w-full'>
                                            <Form.Item className='flex-grow'>
                                                <Input placeholder="Enter discount code" className='placeholder-gray-600 px-4 py-[10px] bg-white w-full' />
                                            </Form.Item>
                                            <Form.Item className='ml-2'>
                                                <Button type="default" className='text-md font-bold rounded-md bg-black text-white h-[44px]'>
                                                    Apply
                                                </Button>
                                            </Form.Item>
                                        </div>
                                    </Form>
                                </div>
                                <div className='flex justify-between text-lg font-bold'>
                                    <span>Total</span>
                                    <span>Tk {total.toFixed(2)} BDT</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default CheckOutPage;
