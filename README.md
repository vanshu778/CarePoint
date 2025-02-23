# 🌟 CarePoint - Doctor Appointment Booking System

![CarePoint](public/logo.png)

🚀 **CarePoint** is a full-stack web application designed to streamline the process of booking doctor appointments online. Whether you're a patient searching for the right doctor or a doctor managing appointments, CarePoint makes healthcare seamless.

🔗 **Live Demo:** [CarePoint Frontend](https://carepointfrontend.vercel.app)

---

## 📌 Features

✅ **Secure Authentication** (Admin, Doctor, and User Roles)  
✅ **Doctor Appointment Booking System**  
✅ **Payment Integration** (Stripe & Razorpay)  
✅ **Real-time Chat Support**  
✅ **Profile & Appointment Management**  
✅ **Admin Dashboard for Doctor Approvals**  
✅ **Image Upload via Cloudinary**  

---

## 🛠️ Tech Stack

### 🖥️ Frontend:
- ⚛️ React.js (Vite)
- 🎨 Tailwind CSS
- 🔗 Context API

### 🛢️ Backend:
- 🌐 Node.js & Express.js
- 🗄️ MongoDB & Mongoose
- 📦 Cloudinary (for image uploads)
- 🔑 JWT Authentication
- 📂 Multer (for file uploads)

### 💳 Payment Gateway:
- 💲 Stripe
- 🏦 Razorpay

---

## 💁‍️ Admin Folder Structure

```bash
📂 admin
├── 📂 public
│   ├── vite.svg
├── 📂 src
│   ├── 📂 assets
│   ├── 📂 components
│   ├── 📂 context
│   ├── 📂 pages
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css

## 📁 Project Structure

```bash
📦 CarePoint
├── 📂 backend
│   ├── 📂 config
│   ├── 📂 controllers
│   ├── 📂 middlewares
│   ├── 📂 models
│   ├── 📂 routes
│   ├── server.js
│
├── 📂 frontend
│   ├── 📂 src
│   │   ├── 📂 assets
│   │   ├── 📂 components
│   │   ├── 📂 context
│   │   ├── 📂 pages
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│
├── package.json
├── README.md
└── .gitignore
```

---

## 🚀 Getting Started

### 🛎️ Clone the Repository
```sh
git clone https://github.com/vanshu778/CarePoint.git
cd CarePoint
```

### 📦 Install Dependencies

#### Admin:
```sh
cd admin
npm install
```
#### Backend:
```sh
cd backend
npm install
```
#### Frontend:
```sh
cd frontend
npm install
```

### 🔑 Configure Environment Variables
Create a `.env` file in the `backend` directory and add the following:
```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
STRIPE_SECRET_KEY=your_stripe_key
RAZORPAY_KEY=your_razorpay_key
```

### ▶️ Start the Application
#### Admin:
```sh
cd admin
npm run dev
```
#### Backend:
```sh
cd backend
npm start
```
#### Frontend:
```sh
cd frontend
npm run dev
```

---

## 📷 Screenshots

| 🏠 Home Page | 📅 Booking Page |
|-------------|---------------|
| ![Home](public/home_screenshot.png) | ![Booking](public/booking_screenshot.png) |

---

## 🛡️ Security & Authentication
- 🔐 Uses **JWT** for authentication
- 🔑 Passwords are **hashed using bcrypt**
- ✅ **Admin approval required** for doctors

---

## 🤝 Contribution
We welcome contributions! Feel free to submit a pull request. Let's make CarePoint better together! 🚀

---

## 📜 License
This project is licensed under the **MIT License**.

---

💙 Developed with passion by [Vanshika Thesiya](https://github.com/vanshu778) 🚀
