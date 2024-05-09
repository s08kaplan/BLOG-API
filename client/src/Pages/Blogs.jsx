import React, { useEffect } from 'react'
import useBlogData from "../Custom-hooks/useBlogData"
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Blogs = () => {
const { getAllBlogData } = useBlogData()
const { blogs } = useSelector(state => state.blog)
  useEffect(()=> {
    getAllBlogData()
  },[])
  return (
    <>
      <Link to="/new-blog">Add Blog</Link>
    <section key={Date.now()}>
      {blogs?.map(blog => (
        <>
        <div>{blog?.title}</div>
        <div>{blog?.content}</div>
        <div>{blog?.totalLikes}</div>
        <div>{blog?.countOfViews}</div>
        <div>{blog?.createdAt}</div>
        <div>{blog?.updatedAt}</div>
        </>
        
      ))}
    </section>
    </>
  
  )
}

export default Blogs