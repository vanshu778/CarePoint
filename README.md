# 🌟 CarePoint - Doctor Appointment Booking System

<img width="958" alt="main" src="https://github.com/user-attachments/assets/c0d25a81-e924-4dd5-a046-4ecd333f014f" />


🚀 **CarePoint** is a full-stack web application designed to streamline the process of booking doctor appointments online. Whether you're a patient searching for the right doctor or a doctor managing appointments, CarePoint makes healthcare seamless.

🔗 **Live Demo:** [CarePoint](https://carepoint778.vercel.app/ )

---

## 📌 Features

✅ **Secure Authentication** (Admin, Doctor, and User Roles)  
✅ **Doctor Appointment Booking System**  
✅ **Payment Integration** (Razorpay)  
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
- 🏦 Razorpay

---

## 📁 Project Structure

```bash
📦 CarePoint
📂 admin
├── 📂 public
├── 📂 src
│   ├── 📂 assets
│   ├── 📂 components
│   ├── 📂 context
│   ├── 📂 pages
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│
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

### User Dashboard

<img width="959" alt="main5" src="https://github.com/user-attachments/assets/2c5c1b4b-98df-4458-9e82-0e3fade51a03" />

<img width="960" alt="main7" src="https://github.com/user-attachments/assets/b5341383-7f96-4081-abfc-de21049b3600" />

<img width="955" alt="main8" src="https://github.com/user-attachments/assets/3e0c96b0-ab39-4482-874f-a8dff6f89526" />

<img width="953" alt="main9" src="https://github.com/user-attachments/assets/09c56b45-0ac5-467e-aee2-a71a76e82827" />


### Admin Dashboard

<img width="958" alt="admin0" src="https://github.com/user-attachments/assets/9c44c16e-37cd-4824-b4f7-a321d2ea249f" />

<img width="958" alt="admin1" src="https://github.com/user-attachments/assets/cb33c71f-0576-4d40-be6f-05b127d94fef" />

<img width="960" alt="admin2" src="https://github.com/user-attachments/assets/4383d32f-8656-4e6c-819c-bdf7b2662ba6" />

<img width="958" alt="admin3" src="https://github.com/user-attachments/assets/cb953ee7-9e51-45e0-ba97-329cf4bde40e" />

<img width="960" alt="admin4" src="https://github.com/user-attachments/assets/d6c45f48-7c1f-4b2c-a777-faac6fd2d967" />

### Doctor Dashboard

<img width="960" alt="dr1" src="https://github.com/user-attachments/assets/5a8fd287-aa8a-497b-88e1-61e4d36029f6" />

<img width="960" alt="dr2" src="https://github.com/user-attachments/assets/0f299a06-cdc1-4a45-930c-891593589503" />

<img width="646" alt="dr3" src="https://github.com/user-attachments/assets/4622c8a5-c1e7-4824-ad38-226e505f7024" />

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
