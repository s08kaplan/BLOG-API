import React, { useEffect } from 'react'
import useBlogData from "../Custom-hooks/useBlogData"
import { useSelector } from 'react-redux'

const Blogs = () => {
const { getAllBlogData } = useBlogData()
const { blogs } = useSelector(state => state.blog)
  useEffect(()=> {
    getAllBlogData()
  },[])
  return (
    <div>
      {blogs?.map(blog => (
        <>
        <div>{blog.title}</div>
        <div>{blog.content}</div>
        <div>{blog.totalLikes}</div>
        <div>{blog.countOfViews}</div>
        <div>{blog.createdAt}</div>
        <div>{blog.updatedAt}</div>
        </>
        
      ))}
    </div>
  )
}

export default Blogs