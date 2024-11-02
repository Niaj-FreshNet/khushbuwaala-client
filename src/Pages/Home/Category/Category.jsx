import CategoryCard from "../../../Components/CategoryCard/CategoryCard";

const Category = () => {
    return (
        <div className="mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-1">
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
            </div>
        </div>
    );
};

export default Category;