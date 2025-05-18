# Agent Manager

<div align="center">
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express.js" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
</div>

<p align="center">A complete MERN stack application for managing agents and distributing lists among them.</p>

## ✨ Features

- **Secure Authentication** - Admin user login with JWT authentication
- **Agent Management** - Create, view, edit, and delete agents
- **Data Processing** - Upload and process CSV/Excel files
- **Distribution Engine** - Equal distribution of tasks among agents
- **Performance Tracking** - Monitor agent task allocation and completion
- **Modern UI** - Responsive dashboard with real-time statistics

## 🛠️ Tech Stack

- **Frontend**: React.js with components for agent management and task distribution
- **Backend**: Express.js and Node.js for API endpoints and business logic
- **Database**: MongoDB for storing agent information and distributed lists
- **Authentication**: JWT (JSON Web Tokens) for secure admin access
- **Styling**: Tailwind CSS with shadcn/ui components for a modern UI

## 📂 Project Structure
AGENT-MANAGER/
├── backend/
│   ├── controllers/
│   │   ├── agentController.js   # Handles agent CRUD operations
│   │   ├── authController.js    # Handles authentication
│   │   └── uploadController.js  # Handles file uploads and distribution
│   ├── models/
│   │   ├── Agent.js             # Agent schema
│   │   ├── DistributedList.js   # Schema for distributed tasks
│   │   └── User.js              # Admin user schema
│   ├── routes/
│   │   └── index.js             # API routes
│   ├── uploads/                 # Temporary storage for uploaded files
│   ├── .env                     # Environment variables
│   ├── package.json             # Backend dependencies
│   └── server.js                # Entry point for backend
└── frontend/
├── public/
├── src/
│   ├── pages/
│   │   ├── AddAgent.js      # Page for adding new agents
│   │   ├── Dashboard.js     # Main dashboard
│   │   ├── Login.js         # Admin login page
│   │   ├── UploadCSV.js     # File upload interface
│   │   └── ViewLists.js     # View distributed lists
│   ├── App.js               # Main component
│   └── index.js             # Entry point for frontend
└── package.json             # Frontend dependencies


## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB database (local or Atlas)
- npm or yarn package manager

## 🔧 Environment Variables

Create a `.env` file in the backend directory with the following variables:
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000


## 🚀 Installation and Setup

### Backend Setup

```bash
# Navigate to the backend directory
cd AGENT-MANAGER/backend

# Install dependencies
npm install

# Start the backend server
npm start
The backend server will start running on [http://localhost:5000].

# Navigate to the frontend directory
cd AGENT-MANAGER/frontend

# Install dependencies
npm install

# Start the development server
npm start
The frontend development server will start running on [http://localhost:3000]
```

## API Endpoints

| Method | Endpoint | Description
|-----|-----|-----
| **Authentication Routes**
| POST | `/api/auth/register` | Register admin user
| POST | `/api/auth/login` | Login admin user
| **Agent Routes**
| GET | `/api/agents` | Get all agents
| GET | `/api/agents/:id` | Get agent by ID
| POST | `/api/agents` | Create new agent
| PUT | `/api/agents/:id` | Update agent
| DELETE | `/api/agents/:id` | Delete agent
| **Upload and Distribution Routes**
| POST | `/api/upload` | Upload CSV/Excel file
| POST | `/api/distribute` | Distribute tasks among agents
| GET | `/api/lists` | Get all distributed lists
| GET | `/api/lists/:id` | Get specific distributed list

## Usage Guide

### Admin Login

1. Navigate to the login page
2. Enter your admin credentials
3. Upon successful login, you'll be redirected to the dashboard


### Managing Agents

1. Navigate to "Add Agent" page to create new agents
2. View all agents on the dashboard
3. Edit or delete agents as needed


### Uploading and Distributing Lists

1. Navigate to "Upload CSV" page
2. Upload your CSV or Excel file
3. Review the uploaded data
4. Click "Distribute" to assign tasks equally among agents
5. View distributions in the "View Lists" page

## Development

### Adding New Features

1. Create appropriate model schemas in the `backend/models` directory
2. Add controller functions in the `backend/controllers` directory
3. Update routes in `backend/routes/index.js`
4. Create corresponding React components in the `frontend/src/pages` directory

# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

## Deployment

### Backend Deployment

1. Set up environment variables in your deployment environment
2. Build and deploy the backend to your preferred hosting service

### Frontend Deployment

# Build the frontend for production
cd frontend
npm run build

# Deploy the build folder to your preferred static hosting service

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
