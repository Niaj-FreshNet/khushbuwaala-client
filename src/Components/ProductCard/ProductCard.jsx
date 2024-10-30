import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SfButton, SfLink, SfIconFavorite } from '@storefront-ui/react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { createStyles } from 'antd-style';
import { Button, ConfigProvider, message } from 'antd';
import './ProductCard.css';
import { CartContext } from '../../Cart/CartContext';

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
  const { styles } = useStyle();
  const navigate = useNavigate(); // Initialize navigate from react-router-dom

  // Calculate dimensions based on the number of columns
  const baseSize = 250; // Base size for 1 column
  const cardSize = baseSize * (columns / 1.5); // Adjust based on column count, 1.5 is for scaling

  // Destructure product properties with fallback values
  const {
    primaryImage = '', // Fallback to an empty string if primaryImage is undefined
    secondaryImage = '', // Fallback to an empty string if secondaryImage is undefined
    name = 'Unknown Product', // Fallback to a default name
    price = 'N/A', // Fallback to 'N/A' if price is undefined
    category = 'default-category', // Fallback to a default category
    sku = 'default-sku', // Fallback to a default SKU
  } = product || {};

  const handleAddToCart = () => {
    // addToCart(product, 1, product.defaultSize || ''); // Add default quantity and size if applicable
    // message.success(`${name} has been added to your cart!`);
    handleCardClick();
  };

  const handleCardClick = () => {
    const productNameSlug = name.toLowerCase().replace(/ /g, '-'); // Convert product name to URL-friendly slug
    navigate(`/collections/${category}/products/${productNameSlug}`, { state: { product } }); // Pass product data via state
  };

  return (
    <div
      className="border border-neutral-200 rounded-md hover:shadow-lg flex flex-col card"
      style={{ width: `${cardSize}px`, height: `${cardSize * 1.2}px` }} // Maintain aspect ratio
      onClick={handleCardClick} // Attach click handler for redirection
    >
      <div className="relative flex-grow image-container">
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
        <SfButton
          variant="primary"
          size="md"
          square
          className="absolute top-3 right-0 mr-2 mb-2 !rounded-full"
          aria-label="Add to wishlist"
        >
          <SfIconFavorite size="sm" />
        </SfButton>
      </div>
      <div className="p-4 border-t border-neutral-200">
        <p className="block pt-1 pb-2 font-normal text-neutral-700">
          {name}
        </p>
        <div className="flex justify-between items-center">
          <ConfigProvider
            button={{
              className: styles.linearGradientButton,
            }}
          >
            <Button
              className="custom-cart-btn"
              type="primary"
              size="medium"
              icon={<ShoppingCartOutlined />}
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click event
                handleAddToCart();
              }} // Attach click handler
            >
              Add to Cart
            </Button>
          </ConfigProvider>
          <span className="text-base">{price} BDT</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { SfButton, SfLink, SfIconFavorite } from '@storefront-ui/react';
// import { ShoppingCartOutlined } from '@ant-design/icons';
// import { createStyles } from 'antd-style';
// import { Button, ConfigProvider, message } from 'antd';
// import './ProductCard.css';

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

// const ProductCard = ({ product, columns, onAddToCart }) => {
//   const { styles } = useStyle();
//   const navigate = useNavigate(); // Initialize navigate from react-router-dom

//   // Calculate dimensions based on the number of columns
//   const baseSize = 250; // Base size for 1 column
//   const cardSize = baseSize * (columns / 1.5); // Adjust based on column count, 1.5 is for scaling

//   // Destructure product properties with fallback values
//   const {
//     primaryImage = '', // Fallback to an empty string if primaryImage is undefined
//     secondaryImage = '', // Fallback to an empty string if secondaryImage is undefined
//     name = 'Unknown Product', // Fallback to a default name
//     price = 'N/A', // Fallback to 'N/A' if price is undefined
//     category = 'default-category', // Fallback to a default category
//     sku = 'default-sku', // Fallback to a default SKU
//   } = product || {};

//   const handleAddToCart = () => {
//     if (onAddToCart) {
//       onAddToCart(product); // Call the onAddToCart function passed down as a prop
//     }
//     message.success(`${name} has been added to your cart!`); // Show success message
//   };

//   const handleCardClick = () => {
//     const productNameSlug = name.toLowerCase().replace(/ /g, '-'); // Convert product name to URL-friendly slug
//     navigate(`/collections/${category}/products/${productNameSlug}`, { state: { product } }); // Pass product data via state
//   };

//   return (
//     <div
//       className="border border-neutral-200 rounded-md hover:shadow-lg flex flex-col card"
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
//         <SfButton
//           variant="primary"
//           size="md"
//           square
//           className="absolute top-3 right-0 mr-2 mb-2 !rounded-full"
//           aria-label="Add to wishlist"
//         >
//           <SfIconFavorite size="sm" />
//         </SfButton>
//       </div>
//       <div className="p-4 border-t border-neutral-200">
//         <p className="block pt-1 pb-2 font-normal text-neutral-700">
//           {name}
//         </p>
//         <div className="flex justify-between items-center">
//           <ConfigProvider
//             button={styles.linearGradientButton}
//           >
//             <Button
//               className="custom-cart-btn"
//               type="primary"
//               size="medium"
//               icon={<ShoppingCartOutlined />}
//               onClick={(e) => {
//                 e.stopPropagation(); // Prevent card click event
//                 handleAddToCart();
//               }} // Attach click handler
//             >
//               Add to Cart
//             </Button>
//           </ConfigProvider>
//           <span className="text-base">{price} BDT</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
