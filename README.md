
### Project Overview

This project is a basic version of PayTM, a popular digital wallet and payment system. The application is built using modern web technologies and follows a full-stack development approach.

### Technologies Used

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

### Features

- User registration and login
- JWT-based authentication
- Add money to wallet
- Transfer money to other users
- Transaction history

### Installation

1. **Clone the repository**:
    ```sh
    git clone /home/bansal/Downloads/100xdevs/paytm-project
    cd paytm-project
    ```

2. **Install dependencies**:
    ```sh
    # Install backend dependencies
    cd backend
    npm install

    # Install frontend dependencies
    cd ../frontend
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file in the `backend` directory and add the following:
    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4. **Run the application**:
    ```sh
    # Start the backend server
    cd backend
    npm start

    # Start the frontend development server
    cd ../frontend
    npm start
    ```

