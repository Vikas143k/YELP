# 🚀 Make Your Trip

![Make Your Trip](https://via.placeholder.com/1000x300?text=Make+Your+Trip+Banner)

> A seamless and secure travel planning application with interactive maps and itinerary management.

---

## 📌 Table of Contents
- [About the Project](#-about-the-project)
- [Features](#-features)
- [Installation & Setup](#-installation--setup)
- [Tech Stack](#-tech-stack)
- [Dependencies](#-dependencies)
- [Contributing](#-contributing)
- [License](#-license)

---

## 📝 About the Project
**Make Your Trip** is a powerful travel application designed to assist users in exploring destinations, creating personalized itineraries, and sharing experiences. Built with **Express.js** and **MongoDB**, it ensures secure authentication, efficient data storage, and seamless media handling.

---

## ✨ Features
✅ **Interactive Maps** – Uses **MapTiler SDK** for a smooth map experience.  
✅ **Secure Authentication** – Integrated **Passport.js** with **Passport-Local Mongoose**.  
✅ **Media Uploads** – Supports **Multer** and **Cloudinary** for image handling.  
✅ **Itinerary Planning** – Plan and share your trips effortlessly.  
✅ **Enhanced Security** – Utilizes **Helmet**, **Joi validation**, and **MongoDB sanitization**.  

---

## ⚙️ Installation & Setup

### 📌 Prerequisites
Ensure you have **Node.js** and **MongoDB** installed on your system.

### 📂 Clone the Repository
```sh
git clone https://github.com/Vikas143k/YELP/.git
cd YELP
```

### 📦 Install Dependencies
```sh
npm install
```

### 🔑 Setup Environment Variables
Create a `.env` file in the root directory and add:
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
DB_URL=your_mongodb_uri
MAPTILLER_TOKEN=Your_maptiller_token
```

### 🚀 Run the Application
```sh
npm start
```
The application should now be running on **`http://localhost:3000`**.

---

## 🏗 Tech Stack
| Category          | Technology |
|------------------|------------|
| **Backend**      | Express.js, MongoDB, Mongoose |
| **Authentication** | Passport.js, Express-Session |
| **File Uploads** | Multer, Cloudinary |
| **Security** | Helmet, Express-Mongo-Sanitize, Sanitize-HTML, Joi |
| **Templating** | EJS, EJS-Mate |
| **Maps & Geolocation** | MapTiler SDK |

---

## 📦 Dependencies
```json
{
  "@maptiler/geocoding-control": "^2.1.2",
  "@maptiler/sdk": "^2.5.1",
  "cloudinary": "^1.41.3",
  "connect-flash": "^0.1.1",
  "connect-mongo": "^5.1.0",
  "dotenv": "^16.4.5",
  "ejs": "^3.1.10",
  "ejs-mate": "^4.0.0",
  "express": "^4.19.2",
  "express-mongo-sanitize": "^2.2.0",
  "express-session": "^1.18.0",
  "helmet": "^8.0.0",
  "joi": "^17.13.3",
  "method-override": "^3.0.0",
  "mongoose": "^8.7.1",
  "multer": "^1.4.5-lts.1",
  "multer-storage-cloudinary": "^4.0.0",
  "nodemon": "^3.1.9",
  "passport": "^0.7.0",
  "passport-local": "^1.0.0",
  "passport-local-mongoose": "^8.0.0",
  "sanitize-html": "^2.14.0"
}
```

---

## 🤝 Contributing
Contributions are welcome! 🚀  
Feel free to **fork** the repository and submit a **pull request**.

---

## 📜 License
This project is licensed under the **ISC License**.

---

Made with ❤️ by **Vikas** 🚀

