import React from "react";
import { useSelector } from "react-redux";

const NewBlog = () => {
  const { categories } = useSelector(state => state.blog)
  console.log("categories", categories);
  return (
    <section>
      <main>
        <section>
          <form>
            <div>
              <label htmlFor="title">Title</label>
              <input type="text" id="title" name="title" />
            </div>
            <div>
              <label htmlFor="image">Image Url</label>
              <input type="text" id="image" name="image" />
            </div>
            <div>
            <select name="categories" id="categories" style={{width:"50px"}}>
              { categories?.map(category => (

              <option value={category.name}>{ category.name }</option>
              ))}
            </select>
            </div>
          </form>
        </section>
      </main>
    </section>
  );
};

export default NewBlog;
