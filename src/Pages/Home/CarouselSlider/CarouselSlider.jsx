import React from 'react';
import { Carousel } from 'antd';
import home1 from '../../../assets/Home1.webp';
import home2 from '../../../assets/Home2.webp';

const CarouselSlider = () => (
  <Carousel>
    {/* Slide 1 */}
    <div className="flex justify-center items-center">
      <img
        src={home1}
        alt="Home5"
        className="w-full h-[600px] md:h-[660px] object-cover" // Increased height for larger screens
      />
    </div>
    {/* Slide 2 */}
    <div className="flex justify-center items-center">
      <img
        src={home2}
        alt="Home6"
        className="w-full h-[600px] md:h-[660px] object-cover" // Increased height for larger screens
      />
    </div>
  </Carousel>
);

export default CarouselSlider;