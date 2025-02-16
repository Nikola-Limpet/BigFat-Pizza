# 🍕 BigFat Pizza - Full Stack Food Ordering Platform

A modern, feature-rich pizza ordering platform built with the MERN stack (MongoDB, Express.js, React, Node.js). This project demonstrates a complete end-to-end solution for online food ordering with real-time order tracking, secure payment processing, and a responsive user interface.

## 🚀 Key Features

- **Interactive Menu**
  - Dynamic pizza customization with size options and toppings
  - Real-time price calculation
  - Category-based filtering
  - Detailed product views with nutritional information

- **Smart Shopping Cart**
  - Persistent cart storage
  - Special instructions for each item
  - Real-time total calculation including taxes and delivery fees

- **User Experience**
  - Smooth animations using Framer Motion
  - Responsive design for all devices
  - Intuitive checkout process
  - Order tracking and history

- **Admin Dashboard**
  - Order management system
  - Sales analytics
  - Inventory management
  - User management

## 🛠️ Technical Stack

### Frontend
- React 18 with Vite
- Redux Toolkit for state management
- React Query for server state
- Tailwind CSS for styling
- Framer Motion for animations
- React Router v6 for navigation

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- JWT authentication
- RESTful API architecture
- Error handling middleware

### DevOps & Tools
- Docker & Docker Compose
- GitHub Actions for CI/CD
- ESLint & Prettier for code quality
- Jest for testing

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Docker & Docker Compose
- MongoDB
- Git

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/BigFat-Pizza.git
cd BigFat-Pizza
```

2. Set up environment variables:

```bash
# Copy example env files
cp .env.example .env
cp .env.docker.example .env.docker
```

3. Using Docker (Recommended):

```bash
# Start all services
docker-compose up --build
```

# Access the application:
Frontend: http://localhost:5173
Backend: http://localhost:8080

4. Manual Setup:

```bash
# Install frontend dependencies
cd front-end
npm install
npm run dev

# Install backend dependencies
cd ../backend
npm install
npm run dev 
```

# 📝 Project Structure

```bash
BigFat-Pizza/
├── frontend/           # React application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── redux/
├── backend/           # Node.js API
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── middleware/
└── docker/           # Docker configuration

```

# 🔐 Security Features

- JWT-based authentication
- Password hashing
- CORS protection
- Rate limiting
- Input validation
- Secure headers

# 🌟 Key Learning Points

- Full-stack JavaScript development
- Modern React patterns and practices
- State management solutions
- MongoDB database design
- RESTful API development
- Docker containerization
- CI/CD implementation
- Responsive web design
- User experience optimization

# 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request

# 💡 Why This Project?
This project was built to demonstrate modern web development practices and create a scalable, production-ready food ordering platform. It showcases the integration of various technologies and best practices in both frontend and backend development.

Feel free to explore the code and reach out if you have any questions!



This README provides a comprehensive overview of your project, highlighting its features, technical stack, and implementation details. It serves both as documentation and as a showcase of your skills. For LinkedIn, you might want to focus on:

1. The technical challenges you overcame
2. The scale of the project
3. The modern technologies you utilized
4. The real-world applicability
5. Your learning journey

Would you like me to expand on any particular section or add more specific details about certain features?
This README provides a comprehensive overview of your project, highlighting its features, technical stack, and implementation details. It serves both as documentation and as a showcase of your skills. For LinkedIn, you might want to focus on:

1. The technical challenges you overcame
2. The scale of the project
3. The modern technologies you utilized
4. The real-world applicability
5. Your learning journey

Would you like me to expand on any particular section or add more specific details about certain features?