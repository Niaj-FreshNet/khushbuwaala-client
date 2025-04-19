// import React, { useContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { SfButton, SfLink, SfIconFavorite } from '@storefront-ui/react';
// import { HeartFilled, ShoppingCartOutlined } from '@ant-design/icons';
// import { createStyles } from 'antd-style';
// import { Button, ConfigProvider, message } from 'antd';
// import './ProductCard.css';
// import { CartContext } from '../../Cart/CartContext';
// import useItems from '../../Hooks/useItems';

// const useStyle = createStyles(({ prefixCls, css }) => ({
//   linearGradientButton: css`
//     &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
//       border-width: 0;

//       > span {
//         position: relative;
//       }

//       &::before {
//         content: '';
//         background: linear-gradient(135deg, #6253e1, #04befe);
//         position: absolute;
//         inset: 0;
//         opacity: 1;
//         transition: all 0.5s;
//         border-radius: inherit;
//       }

//       &:hover::before {
//         opacity: 0;
//       }
//     }
//   `,
// }));

// const ProductCard = ({ product, columns }) => {
//   const { addToCart } = useContext(CartContext);
//   const { styles } = useStyle();
//   const navigate = useNavigate(); // Initialize navigate from react-router-dom
//   const [buttonSize, setButtonSize] = useState('middle');
//   // const [items] = useItems();

//   // Calculate dimensions based on the number of columns
//   const baseSize = 250; // Base size for 1 column
//   const cardSize = baseSize * (columns / 1.5); // Adjust based on column count, 1.5 is for scaling

//   // Destructure product properties with fallback values
//   const {
//     _id,
//     primaryImage = '', // Fallback to an empty string if primaryImage is undefined
//     secondaryImage = '', // Fallback to an empty string if secondaryImage is undefined
//     name = 'Unknown Product', // Fallback to a default name
//     price = 'N/A', // Fallback to 'N/A' if price is undefined
//     category = 'default-category', // Fallback to a default category
//     sku = 'default-sku', // Fallback to a default SKU
//   } = product || {};

//   const handleAddToCart = () => {
//     // addToCart(product, 1, product.defaultSize || ''); // Add default quantity and size if applicable
//     // message.success(`${name} has been added to your cart!`);
//     handleCardClick();
//   };

//   const handleCardClick = () => {
//     const productNameSlug = name.toLowerCase().replace(/ /g, '-'); // Convert product name to URL-friendly slug
//     navigate(`/${category}/${productNameSlug}`, { state: { product } }); // Pass product data via state
//   };

//   useEffect(() => {
//     // Function to set the button size based on screen width
//     const updateButtonSize = () => {
//       if (window.innerWidth < 640) {
//         setButtonSize('small');
//       } else {
//         setButtonSize('middle');
//       }
//     };

//     // Initial check
//     updateButtonSize();

//     // Event listener for window resize
//     window.addEventListener('resize', updateButtonSize);

//     // Cleanup on component unmount
//     return () => {
//       window.removeEventListener('resize', updateButtonSize);
//     };
//   }, []);

//   return (
//     <div
//       className="border border-neutral-200 rounded-md hover:shadow-lg flex flex-col card cursor-pointer"
//       style={{ width: `${cardSize}px`, height: `${cardSize * 1.2}px` }} // Maintain aspect ratio
//       onClick={handleCardClick} // Attach click handler for redirection
//     >
//       <div className="relative flex-grow image-container">
//         <SfLink className="block">
//           <img
//             src={primaryImage}
//             alt={name}
//             className="object-cover rounded-t-md w-full h-[100%] card-image default"
//           />
//           <img
//             src={secondaryImage}
//             alt={name}
//             className="absolute inset-0 object-cover rounded-t-md w-full h-[100%] card-image hover"
//           />
//         </SfLink>
//         {/* <SfButton
//           variant="primary"
//           square
//           className="absolute top-2 right-0 mr-2 mb-2 !rounded-full"
//           aria-label="Add to wishlist"
//         >
//           <HeartFilled size={24} color='white' />
//         </SfButton> */}
//       </div>
//       <div className="p-2 border-t border-neutral-200">
//         <p className="block pt-1 pb-2 font-normal text-neutral-700">
//           {name}
//         </p>
//         <div className="flex justify-between items-center">
//           <ConfigProvider
//             button={{
//               className: styles.linearGradientButton,
//             }}
//           >
//             <Button
//               type="primary"
//               size={buttonSize}
//               className="custom-cart-btn text-xs"
//               icon={<ShoppingCartOutlined />}
//               onClick={(e) => {
//                 e.stopPropagation(); // Prevent card click event
//                 handleAddToCart();
//               }} // Attach click handler
//             >
//               Add to Cart
//             </Button>
//           </ConfigProvider>
//           <span className="text-xs md:text-sm">{price} BDT</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;


import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { SfButton, SfLink, SfIconFavorite } from '@storefront-ui/react';
import { HeartFilled, ShoppingCartOutlined } from '@ant-design/icons';
import { createStyles } from 'antd-style';
import { Button, ConfigProvider, message } from 'antd';
import './ProductCard.css';
import { CartContext } from '../../Cart/CartContext';
import ReactPixel from 'react-facebook-pixel';
// import { WishlistContext } from '../../Wishlist/WishlistContext';

const useStyle = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
      border-width: 0;

      > span {
        position: relative;
      }

      &::before {
        content: '';
        background: linear-gradient(135deg, #6253e1, #04befe);
        position: absolute;
        inset: 0;
        opacity: 1;
        transition: all 0.5s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
      }
    }
  `,
}));

const ProductCard = ({ product, columns }) => {
  const { addToCart } = useContext(CartContext);
  // const { addToWishlist, wishlistItems } = useContext(WishlistContext);
  const { styles } = useStyle();
  const [buttonSize, setButtonSize] = useState('middle');

  const baseSize = 250; // Base size for 1 column
  const cardSize = baseSize * (columns / 1.5); // Adjust based on column count

  const {
    _id,
    primaryImage = '',
    secondaryImage = '',
    name = 'Unknown Product',
    price = 'N/A',
    category = 'default-category',
  } = product || {};

  const categoryPathMapping = {
    inspiredPerfumeOil: "inspired-perfume-oil",
    oriental: "oriental-attar",
    artificialOud: "artificial-oud",
    natural: "natural-attar",
    semiOrganic: "semi-organic",
    organic: "organic",
    brand: "brand",
<<<<<<< HEAD
    giftsAndPackages: "gifts-and-packages",
=======
>>>>>>> 2116d4fa5d328a63614b9fd9106bccbffec39f68
  };

  const categoryPath = categoryPathMapping[product.category];

  const productNameSlug = name.toLowerCase().replace(/ /g, '-'); // Convert product name to URL-friendly slug

  const handleAddToCart = () => {
    addToCart(product, 1, '3 ml' || ''); // Add default quantity and size if applicable

    // Facebook Pixel AddToCart event
    ReactPixel.track('AddToCart', {
      content_name: product.name,
      content_ids: [product._id],
      content_type: 'product',
      // value: discountedPrice * quantity,
      value: price * 1,
      currency: 'BDT',
    });
    message.success(`${name} (3 ml) has been added to your cart!`);
  };

  useEffect(() => {
    const updateButtonSize = () => {
      if (window.innerWidth < 640) {
        setButtonSize('small');
      } else {
        setButtonSize('middle');
      }
    };

    updateButtonSize();
    window.addEventListener('resize', updateButtonSize);
    return () => {
      window.removeEventListener('resize', updateButtonSize);
    };
  }, []);

  return (
    <div
      className="border border-neutral-200 rounded-md hover:shadow-lg flex flex-col card"
      style={{ width: `${cardSize}px`, height: `${cardSize * 1.2}px` }}
    >
      <Link
        to={`/${categoryPath}/${productNameSlug}`}
        state={{ product }}
        className="relative flex-grow image-container block"
      >
        <SfLink className="block">
          <img
            src={primaryImage}
            alt={name}
            className="object-cover rounded-t-md w-full h-[100%] card-image default"
          />
          <img
            src={secondaryImage}
            alt={name}
            className="absolute inset-0 object-cover rounded-t-md w-full h-[100%] card-image hover"
          />
        </SfLink>
      </Link>
      <div className="p-2 border-t border-neutral-200">
<<<<<<< HEAD
        <p className="block py-1 lg:py-0 text-md lg:text-lg font-bold text-neutral-700">{name}</p>
=======
        <p className="block pt-1 pb-2 font-normal text-neutral-700">{name}</p>
>>>>>>> 2116d4fa5d328a63614b9fd9106bccbffec39f68
        <div className="flex justify-between items-center">
          <ConfigProvider
            button={{
              className: styles.linearGradientButton,
            }}
          >
            <Button
              type="primary"
              size={buttonSize}
<<<<<<< HEAD
              className="custom-cart-btn text-xs lg:text-sm"
=======
              className="custom-cart-btn text-xs"
>>>>>>> 2116d4fa5d328a63614b9fd9106bccbffec39f68
              icon={<ShoppingCartOutlined />}
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the Link navigation
                handleAddToCart();
              }}
            >
              Add to Cart
            </Button>
          </ConfigProvider>
<<<<<<< HEAD
          <span className="text-xs md:text-sm lg:text-lg">{price} BDT</span>
=======
          <span className="text-xs md:text-sm">{price} BDT</span>
>>>>>>> 2116d4fa5d328a63614b9fd9106bccbffec39f68
        </div>
      </div>
    </div>
  );
};

export default ProductCard;