import ReactPixel from 'react-facebook-pixel';

const initializeMetaPixel = () => {
    const options = {
        autoConfig: true,   // Automatically configure the pixel
        debug: false,       // Enable debug mode
    };
    ReactPixel.init('1418521682864635', {}, options); 
    ReactPixel.pageView(); // Track page views
};

export default initializeMetaPixel;