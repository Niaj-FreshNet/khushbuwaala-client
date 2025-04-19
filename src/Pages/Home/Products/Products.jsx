import ProductCard from "../../../Components/ProductCard/ProductCard";

const Category = () => {
    return (
        <div className="container mx-auto px-0">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-4">
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>
        </div>
    );
};

export default Category;
