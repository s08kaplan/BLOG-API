# Blog App Project

## Overview

This Blog App is a comprehensive application built using modern technologies. It allows users to interact with blogs by viewing, creating, updating, and deleting them. Users can also add and manage comments on blogs. Registration is required to access detailed blog content, and users can manage their profiles and personal information.

### Technologies Used

- **Frontend**: 
  - **React**: A JavaScript library for building user interfaces.
  - **React Router DOM**: Handles routing and navigation within the application.
  - **Redux Toolkit**: Manages global state efficiently.
  - **Axios**: Handles HTTP requests to interact with the backend.
  - **DOMPurify**: Sanitizes HTML to prevent XSS attacks.
  - **React Hook Form**: Manages form state and validation.
  - **Sass**: CSS preprocessor for styling.
  - **Yup**: Schema builder for form validation.

- **Backend**:
  - **Node.js**: JavaScript runtime for server-side development.
  - **Express.js**: Web framework for building the API.
  - **MongoDB**: NoSQL database for storing data.
  - **Mongoose**: ODM (Object Data Modeling) library for MongoDB.

- **Testing**:
  - **Cypress**: End-to-end testing framework for testing the frontend.

## Features

### User Authentication
- **Registration**: Users can create a new account.
- **Login**: Registered users can log in to access the application.
- **Profile Management**: Users can view and update their personal profile information.

### Blog Management
- **View Blogs**: Users can view a list of all blogs.
- **Blog Details**: Registered users can view detailed information about a blog.
- **Create Blog**: Users can create new blogs.
- **Edit Blog**: Users can edit their own blogs.
- **Delete Blog**: Users can delete their own blogs.

### Comments
- **Add Comments**: Users can add comments to blogs.
- **Edit Comments**: Users can edit their own comments.
- **Delete Comments**: Users can delete their own comments.

### Categories
- **View Categories**: Users can browse blogs categorized by topics.
- **Category Details**: Users can view blogs within a specific category.

### Profile Management
- **Personal Profile**: Users have their own profile page.
- **Update Information**: Users can update their personal information.

## Frontend

### Folder Structure

The React frontend is organized into the following structure:

```plaintext
.
├── App.jsx
├── App.module.scss
├── Components/
│   ├── AUTH-FORM/
│   │   ├── AuthForm.jsx
│   │   └── AuthStyle.module.scss
│   ├── BLOG-CARD/
│   │   ├── BlogCard.jsx
│   │   └── BlogCard.module.scss
│   ├── BLOG-MODAL/
│   │   ├── BlogModal.jsx
│   │   └── BlogModal.module.scss
│   ├── BLOG-POST/
│   │   ├── BlogPost.jsx
│   │   └── PostStyle.module.scss
│   ├── EDIT-COMMENT-MODAL/
│   │   └── EditCommentModal.jsx
│   ├── ERROR-PAGE/
│   │   ├── ErrorPage.jsx
│   │   └── ErrorStyle.module.scss
│   ├── FOOTER/
│   │   ├── Footer.jsx
│   │   └── Footer.module.scss
│   ├── LOADING/
│   │   ├── Loading.jsx
│   │   └── loadingStyle.module.scss
│   ├── NAVBAR/
│   │   ├── Navbar.jsx
│   │   └── Navbar.module.scss
│   ├── QUILL/
│   │   ├── QuillEditor.jsx
│   │   └── QuillStyle.module.scss
│   └── SIDEBAR/
│       ├── SideBar.jsx
│       └── SideBar.module.scss
├── Custom-hooks/
│   ├── useAuthCalls.jsx
│   ├── useAxios.jsx
│   ├── useBlogData.jsx
│   └── useDebounce.jsx
├── Features/
│   ├── BlogSlice.jsx
│   └── authSlice.jsx
├── Helpers/
│   ├── formInputs.js
│   ├── formValidation.js
│   └── quillModules.js
├── Pages/
│   ├── 404/
│   │   ├── NotFound.jsx
│   │   └── NotFound.module.scss
│   ├── ABOUT/
│   │   ├── About.jsx
│   │   └── About.module.scss
│   ├── BLOG/
│   │   ├── Blogs.jsx
│   │   └── Blog.module.scss
│   ├── BLOG-DETAILS/
│   │   ├── BlogDetails.jsx
│   │   └── BlogDetails.module.scss
│   ├── CATEGORIES/
│   │   ├── Categories.jsx
│   │   └── Categories.module.scss
│   ├── CATEGORY-DETAIL/
│   │   ├── CategoryDetail.jsx
│   │   └── CategoryDetail.module.scss
│   ├── CONTACT/
│   │   ├── Contact.jsx
│   │   └── Contact.module.scss
│   ├── HOME/
│   │   ├── Home.jsx
│   │   └── Home.module.scss
│   ├── LOGIN/
│   │   ├── Login.jsx
│   │   └── Login.module.scss
│   ├── MY-PROFILE/
│   │   ├── MyProfile.jsx
│   │   └── MyProfile.module.scss
│   ├── NEW-BLOG/
│   │   ├── NewBlog.jsx
│   │   └── NewBlog.module.scss
│   └── REGISTER/
│       ├── Register.jsx
│       └── Register.module.scss
├── Router/
│   ├── AppRouter.jsx
│   └── PrivateRouter.jsx
├── Store/
│   └── store.jsx
├── assets/
│   ├── logo-2.png
│   └── logo.png
├── index.css
├── main.jsx
└── structure.txt
```
### Key Libraries
- **React Router DOM**: Manages the navigation and routing within the application.
- **Redux Toolkit**: Provides a streamlined approach to managing global state with slices for authentication and blogs.
- **Axios**: Facilitates making HTTP requests to the backend API.
- **DOMPurify**: Ensures that any HTML content is sanitized before rendering, preventing XSS attacks.
- **React Hook Form**: Simplifies form handling and validation.
- **Yup**: Works with React Hook Form to provide schema-based validation for forms.
- **Sass**: Enables modular and reusable styling through its powerful features.

  # Backend
  ## Key Libraries
  - **Express.js**: A minimal and flexible Node.js web application framework for building RESTful APIs.
  - **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
  - **MongoDB**: A NoSQL database used for storing data.
### Folder Structure for Backend

```plaintext
.
├── configs/
│   ├── dbConnection.js
│   └── swagger.json
├── controllers/
│   ├── auth.js
│   ├── blog.js
│   ├── category.js
│   ├── comment.js
│   ├── like.js
│   ├── token.js
│   └── user.js
├── helpers/
│   ├── sendMail.js
│   ├── sync.js
│   └── validationHelpers.js
├── middlewares/
│   ├── authentication.js
│   ├── errorHandler.js
│   ├── logger.js
│   ├── permissions.js
│   ├── queryHandler.js
│   └── upload.js
├── models/
│   ├── blog.js
│   ├── category.js
│   ├── comment.js
│   ├── token.js
│   └── user.js
└── routes/
    ├── auth.js
    ├── blog.js
    ├── category.js
    ├── comment.js
    ├── document.js
    ├── index.js
    ├── like.js
    ├── token.js
    └── user.js
```
## Installation

### Frontend

```bash
git clone <repository-url>
cd client
pnpm install
pnpm start

### Backend
cd api
npm install
nodemon


