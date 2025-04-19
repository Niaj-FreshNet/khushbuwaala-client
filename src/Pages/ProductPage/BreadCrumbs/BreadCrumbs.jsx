// Breadcrumbs.js
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

const Breadcrumbs = ({ product }) => {

  // const formatCategoryPath = (category) =>
  //   category.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

  const categoryPathMapping = {
    inspiredPerfumeOil: "inspired-perfume-oil",
    oriental: "oriental-attar",
    artificialOud: "artificial-oud",
    natural: "natural-attar",
    semiOrganic: "semi-organic",
    organic: "organic",
    brand: "brand",
    giftsAndPackages: "gifts-and-packages",
  };

  const categoryMapping = {
    inspiredPerfumeOil: "Inspired Perfume Oil",
    oriental: "Oriental Attar",
    artificialOud: "Artificial Oud",
    natural: "Natural Attar",
    semiOrganic: "Semi-Organic",
    organic: "Organic",
    brand: "Brand",
    giftsAndPackages: "Gifts and Packages",
  };

  const name = product.name;

  const categoryPath = categoryPathMapping[product.category];
  const categoryName = categoryMapping[product.category] || product.category;
  const productNameSlug = name.toLowerCase().replace(/ /g, '-'); // Convert product name to URL-friendly slug

  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link to="/">Home</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        {/* <Link to={`/${formatCategoryPath(product.category)}`}>{categoryName}</Link> */}
        <Link to={`/${categoryPath}`}>{categoryName}</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Link to={`/${categoryPath}/${productNameSlug}`}>{product.name}</Link>
      </Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default Breadcrumbs;