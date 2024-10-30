import React from 'react';
import { Carousel } from 'antd';
import Home1 from '../../../assets/Home1.jpg';
import Home2 from '../../../assets/Home2.jpg';
import Home3 from '../../../assets/Home3.jpg';
import Home4 from '../../../assets/Home4.jpg';
import Home5 from '../../../assets/Home5.jpg';
import Home6 from '../../../assets/Home6.jpg';

const CarouselSlider = () => (
  <Carousel autoplay>
    {/* Slide 1 */}
    <div className="flex justify-center items-center">
      <img
        src={Home5}
        alt="Home5"
        className="w-full h-[600px] md:h-[660px] object-cover" // Increased height for larger screens
      />
    </div>
    {/* Slide 2 */}
    <div className="flex justify-center items-center">
      <img
        src={Home6}
        alt="Home6"
        className="w-full h-[600px] md:h-[660px] object-cover" // Increased height for larger screens
      />
    </div>
  </Carousel>
);

export default CarouselSlider;