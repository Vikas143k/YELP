Make Your Trip 🚀

About the Project

Make Your Trip is a dynamic travel planning application designed to help users explore destinations, create personalized itineraries, and share their travel experiences. Built with a powerful backend using Express.js and MongoDB, the app ensures secure authentication, efficient data storage, and seamless media handling.

Features 🌍

🗺 Interactive Maps – Powered by MapTiler SDK & MapLibre GL for a rich map experience.

🔐 Secure Authentication – Implemented with Passport.js and Passport-Local Mongoose.

🏞 Image Uploads – Supports media uploads with Multer and Cloudinary.

🏕 Travel Itineraries – Plan and share your trips effortlessly.

🚀 Performance & Security – Secured using Helmet, Joi validation, and MongoDB sanitization.

Installation & Setup 🛠

Follow these steps to set up the project locally:

Prerequisites

Ensure you have Node.js and MongoDB installed on your system.

Clone the Repository

  git clone https://github.com/Vikas143k/YELP.git
  cd make-your-trip

Install Dependencies

  npm install

Setup Environment Variables

Create a .env file in the root directory and add:

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
DB_URL=your_mongodb_uri
MAPTILLER_TOKEN=Your_maptiller_token

Run the Application

  npm start

The application should now be running on http://localhost:3000.

Tech Stack 🏗

Backend: Express.js, MongoDB, Mongoose

Authentication: Passport.js, Express-Session

File Uploads: Multer, Cloudinary

Security: Helmet, Express-Mongo-Sanitize, Sanitize-HTML, Joi

Templating Engine: EJS, EJS-Mate

Maps & Geolocation: MapTiler SDK

Dependencies 📦

The following dependencies are used in this project:
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
  "maplibre-gl": "^5.0.1",
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

Contributing 🤝

Contributions are welcome! Feel free to fork the repo and submit a PR.

License 📜

This project is licensed under the ISC License.

Made with ❤️ by Vikas 🚀

