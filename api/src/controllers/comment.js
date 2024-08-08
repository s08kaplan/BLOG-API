"use strict";

const Comment = require("../models/comment");
const Blog = require("../models/blog");

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Comments"]
            #swagger.summary = "List Comments"
            #swagger.description = `
                You can use <u>filter[] & search[] & sort[] & page & limit</u> queries with endpoint.
                <ul> Examples:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=asc&sort[field2]=desc</b></li>
                    <li>URL/?<b>limit=10&page=1</b></li>
                </ul>
            `
        */

    const data = await Comment.find({ isDeleted: false }).sort({ createdAt: -1 }).populate([
      "userId",
      "blogId",
    ]);

    res.status(200).send({
      error: false,
      data,
    });
  },

  create: async (req, res) => {
    /*
            #swagger.tags = ["Comments"]
            #swagger.summary = "Create Comment"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "name": "Comment 1"
                }
            }
        */

    req.body.userId = req.user._id;
    const data = await Comment.create(req.body);
    // console.log("data in create comment",data);
    const comments = await Comment.find({ blogId: data.blogId });
    // console.log("comments in create comments",comments);
    await Blog.updateOne({ _id: data.blogId }, { comments });

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    /*
            #swagger.tags = ["Comments"]
            #swagger.summary = "Get Single Comment"
        */

    const data = await Comment.findOne({
      _id: req.params.commentId,
      isDeleted: false,
    }).populate(["userId", "blogId"]);

    res.status(202).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    /*
            #swagger.tags = ["Comments"]
            #swagger.summary = "Update Comment"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "name": "Comment 1"
                }
            }
        */
       const user = req.user
       const comment = await Comment.findOne({_id: req.params.commentId})
            const customFilter =
            (user.isAdmin || user.isStaff) ||
            (user?._id).toString() == comment?.userId?.toString()
              ?  req.body
              : { } ;
    
    const data = await Comment.updateOne(
      { _id: req.params.commentId},
      customFilter,
      { runValidators: true }
    );

   
console.log("update-------------------------------------------",comment);
    const commentsOfBlog = await Comment.find({ blogId: comment.blogId})
    console.log("update===============================================",commentsOfBlog);
    await Blog.updateOne({_id:req.body.blogId},{ comments: commentsOfBlog})


    res.status(202).send({
      error: false,
      data,
      updatedData: await Comment.findOne({ _id: req.params.commentId, isDeleted: false }),
    });
  },

  delete: async (req, res) => {
    /*
            #swagger.tags = ["Comments"]
            #swagger.summary = "Delete Comment"
        */
    const user = req?.user;
    const comment = await Comment.findOne({ _id: req.params.commentId });
    // console.log(comment.userId.toString());
    // console.log("user",user._id);
    // console.log("user", user);
    if (!comment) {
      return res.status(404).send({
        error: true,
        message: "Comment not found",
      });
    }
    const customFilter =
      (user.isAdmin || user.isStaff) ||
      (user?._id).toString() == comment?.userId?.toString()
        ? { isDeleted: true  }
        : { };
    // const data = await Comment.updateOne({ _id: req.params.commentId }, { isDeleted: true }, { runValidators: true })
    // console.log("comment custom filter for delete",customFilter);
    // console.log((user?._id).toString() == comment?.userId.toString());
    // console.log(!(user.isAdmin || user.isStaff));
    const data = await Comment.updateOne(
      { _id: req.params.commentId },
      customFilter,
      { runValidators: true }
    );

    const commentsOfBlog = await Comment.find({blogId:comment.blogId})
     await Blog.updateOne({_id:comment.blogId},{ comments: commentsOfBlog})
    res.status(200).send({
      error: false,
      message: "Requested comment deleted successfully",
      data,
    });
  },
};
