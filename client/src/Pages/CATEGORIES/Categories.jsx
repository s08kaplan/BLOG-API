import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useBlogData from "../../Custom-hooks/useBlogData";
import { useNavigate } from "react-router-dom";
import style from "./Categories.module.scss"


const Categories = () => {
  const { categories } = useSelector((state) => state.blog);
  const { getData, getCategoryById } = useBlogData();
  const navigate = useNavigate();
const [categoryId, setCategoryId] = useState("")
  
  useEffect(() => {
    getData("categories");
  }, []);
  console.log(categories);

  const handleClick = async (categoryId) => {
    // console.log(categoryId);
    setCategoryId(categoryId)
    try {
      const data = await getCategoryById("categoryDetail", categoryId);
      // console.log(data);
      navigate(`/category-detail/${categoryId}`);

    } catch (error) {
      console.log(error);
    }
  };

  console.log(categoryId);
 
  return (
    
      <div className={style.container}>
        <div>
          <h3>Your site Your Choice</h3>
        <div className={style.categories}>
          {categories?.map((category) => (
            <h3 onClick={() => handleClick(category._id)}>{category.name} </h3>
          ))}
        </div>
        <div className={style.add}>
          <h4>Add Category</h4>
          <input type="text"  />
          <button>Add Category</button>
        </div>
        </div>
      </div>
    
  );
};

export default Categories;
