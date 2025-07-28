# 📸 SnapID - Backend for Video Hosting Platform

SnapID is a **full-featured backend** built with **Node.js**, **Express.js**, and **MongoDB**, aiming to power a modern video-sharing platform similar to **YouTube**. This project includes **user authentication**, **video uploads**, **engagement features** like likes, comments, replies, subscriptions, and more.

We’ve followed all **backend best practices** — secure authentication with **JWT & bcrypt**, structured routes, RESTful APIs, Cloudinary integration, and a scalable architecture. Whether you’re a student or a developer looking to learn backend development hands-on, this project will be immensely helpful.

---

## 🚀 Features

- 🔐 **Authentication**
  - User Signup & Login (JWT + Refresh Tokens)
  - Secure Password Hashing with Bcrypt
  - User Profile with Avatar & Cover Image (Cloudinary support)

- 📹 **Video Management**
  - Upload, Update, and Delete Videos
  - Dynamic Thumbnail & Storage Handling
  - Categorization and Tag Support (optional)

- ❤️ **Engagement**
  - Like / Dislike System
  - Comment, Reply to Comments
  - Subscribe / Unsubscribe Channels

- 📦 **File Handling**
  - Cloudinary Integration for Media Storage
  - Temp folder cleanup & dynamic folder structure

- 🛠️ **Backend Practices**
  - Environment Variable Support with dotenv
  - Centralized Error Handling
  - RESTful API Design
  - Folder Structure following MVC Pattern

---

## 🧰 Tech Stack

| Tech       | Description                        |
|------------|------------------------------------|
| Node.js    | JavaScript Runtime                 |
| Express.js | Web framework for Node             |
| MongoDB    | NoSQL Database                     |
| Mongoose   | MongoDB ODM                        |
| JWT        | Token-based Authentication         |
| Bcrypt     | Password Hashing                   |
| Cloudinary | Media (avatar/video) Storage       |
| Multer     | File Upload Middleware             |
| dotenv     | Environment Config Management      |

---

## 📁 Folder Structure (Partial)
📦SnapID
┣ 📂src
┃ ┣ 📂controllers
┃ ┣ 📂models
┃ ┣ 📂routes
┃ ┣ 📂middlewares
┃ ┗ 📜index.js
┣ 📂public/temp
┣ 📜.env
┣ 📜package.json
┗ 📜README.md


---

## 🛠️ Setup Instructions

```bash
# 1. Clone the repo
git clone https://github.com/your-username/SnapID.git
cd SnapID

# 2. Install dependencies
npm install

# 3. Configure environment variables
Create a `.env` file in the root with the following keys:

PORT=8000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=dx9qvr5ym
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# 4. Run the development server
npm run dev

| Variable                | Description               |
| ----------------------- | ------------------------- |
| `PORT`                  | Backend server port       |
| `MONGO_URI`             | MongoDB connection URI    |
| `JWT_SECRET`            | JWT secret for token auth |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name     |
| `CLOUDINARY_API_KEY`    | Cloudinary API key        |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret     |


📷 Sample API Endpoints
POST /api/v1/users/register – Register new user

POST /api/v1/users/login – Login user and get tokens

POST /api/v1/videos/upload – Upload new video

POST /api/v1/videos/:id/like – Like a video

POST /api/v1/videos/:id/comment – Add comment
