import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useBlogData from "../../Custom-hooks/useBlogData";

const Categories = () => {
  const { categories } = useSelector((state) => state.blog);
  const { getData } = useBlogData();

  useEffect(() => {
    getData("categories");
  }, []);
  console.log(categories);
  return (
    <div>
      <div>
        <h3>Your site Your Choice</h3>
        <div>
          { categories?.map(category => (
            <h3>{ category.name} </h3>
          ))
          }
        </div>
      </div>
    </div>
  );
};

export default Categories;
