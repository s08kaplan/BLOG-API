import React, { useEffect } from "react";
import useBlogData from "../Custom-hooks/useBlogData";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const { getData } = useBlogData();
  const { blogs } = useSelector((state) => state.blog);

  useEffect(() => {
    getData();
  }, []);

  return (
    <main>
      <section>
        {blogs?.map((blog) => (
          <section className="blog-card">
            <h4>{blog?.title}</h4>
           <Link to={`/blog-details/${blog._id}`}><img src={ blog?.image[0]} alt={blog?.title} /></Link> 
          </section>
        ))}
      </section>
    </main>
  );
};

export default Home;
