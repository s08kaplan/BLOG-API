import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useBlogData from "../../Custom-hooks/useBlogData";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const { categories } = useSelector((state) => state.blog);
  const { getData, getCategoryById } = useBlogData();
  const navigate = useNavigate();

  useEffect(() => {
    getData("categories");
  }, []);
  console.log(categories);

  const handleClick = async (categoryId) => {
    // console.log(categoryId);
    try {
      const data = await getCategoryById("categoryDetail", categoryId);
      // console.log(data);
      navigate("/category-detail");

    } catch (error) {
      console.log(error);
    }
  };

 
  return (
    <div>
      <div>
        <h3>Your site Your Choice</h3>
        <div>
          {categories?.map((category) => (
            <h3 onClick={() => handleClick(category._id)}>{category.name} </h3>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
