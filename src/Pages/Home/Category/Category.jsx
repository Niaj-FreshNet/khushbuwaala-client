import { Divider } from "antd";
import CategoryCard from "../../../Components/CategoryCard/CategoryCard";
import Category1 from "../../../assets/Category1.webp";
import Category2 from "../../../assets/Category2.webp";
import Category3 from "../../../assets/Category3.webp";
import Category4 from "../../../assets/Category4.webp";

const Category = () => {
    return (
        <div className="flex justify-center items-center"> {/* Flexbox container */}
            <div className="w-full mx-auto text-center"> {/* Centering and max width */}
                <h2 className="text-xl font-bold mt-4 -mb-2 relative">
                    Categories
                </h2>
                <Divider dashed>
                    <span className="block w-36 mx-auto border-b-2 border-red-500"></span> {/* Red underline */}
                </Divider>
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-0"> {/* Add gap for spacing */}
                    <CategoryCard
                        CategoryName="Inspired Perfume Oil"
                        CategoryImage={Category1}
                        CategoryLink="/inspired-perfume-oil"
                    />
                    <CategoryCard
                        CategoryName="Oriental & Arabian Attar"
                        CategoryImage={Category3}
                        CategoryLink="/oriental-attar"
                    />
                    <CategoryCard
                        CategoryName="Artificial Oud"
                        CategoryImage={Category4}
                        CategoryLink="/artificial-oud"
                    />
                    <CategoryCard
                        CategoryName="Natural Collections"
                        CategoryImage={Category2}
                        CategoryLink="/natural-attar"
                    />
                </div>
            </div>
        </div>
    );
};

export default Category;
