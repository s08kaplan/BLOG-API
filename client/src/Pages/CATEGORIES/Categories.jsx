import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useBlogData from "../../Custom-hooks/useBlogData";
import { useNavigate } from "react-router-dom";
import { VscEdit } from "react-icons/vsc";
import style from "./Categories.module.scss";
import useAxios from "../../Custom-hooks/useAxios";
import useDebounce from "../../Custom-hooks/useDebounce"


const Categories = () => {
  const { categories } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.auth);
  const { getData, getCategoryById } = useBlogData();
  const { axiosWithToken } = useAxios()
  const navigate = useNavigate();
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [edit, setEdit] = useState(false)

 const debouncedName = useDebounce(categoryName, 500)

  useEffect(() => {
    getData("categories");
  }, []);
  // console.log(categories);
  // console.log(user);

  const handleClick = async (categoryId) => {
    // console.log(categoryId);
    setCategoryId(categoryId);
    try {
      const data = await getCategoryById("categoryDetail", categoryId);
      // console.log(data);
      navigate(`/category-detail/${categoryId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setCategoryName(e.target.value)
  }

  const addCategory = async () => {
      // console.log(categoryName);
      
      const postData = {name: debouncedName}
    const data =  await axiosWithToken.post("categories",postData)
    console.log(data);
    getData("categories")
  }

  const getEditInfo = async (id,name) => {
    setEdit(true)
    setCategoryName(name)
    setCategoryId(id)
    console.log(id);
    console.log(name);
   
  };

  const handleEdit = async () => {
    const postData = { categoryId, name: categoryName }
    console.log(postData);
    const { data } = await axiosWithToken.put(`categories/${categoryId}`,postData)
    console.log(data);
    getData("categories")
    setEdit(false)
    setCategoryName("")
  }

  // console.log(categoryId);
  // console.log(categoryName);

  return (
    <div className={style.container}>
      <div>
        <h3>Your site Your Choice</h3>
        <div className={style.categories}>
          {categories?.map((category) => (
            <>
              <h3 onClick={() => handleClick(category._id)}>
                {category.name}{" "}
              </h3>
              {user && (user.isAdmin || user.isStaff) && (
                <div onClick={()=>getEditInfo(category._id,category.name)}>
                  <VscEdit />
                </div>
              )}
            </>
          ))}
        </div>
        <div className={style.add}>
          <h4>{edit ? "Edit Category" : "Add Category"}</h4>
          <input type="text" value={categoryName} onChange={handleChange}/>
          <button onClick={edit ? handleEdit : addCategory }  >{edit ? "Edit Category" : "Add Category"}</button>
        </div>
      </div>
    </div>
  );
};

export default Categories;
