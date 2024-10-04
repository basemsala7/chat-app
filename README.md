# Chat App
A real-time chat application built using a client-server architecture. This project is divided into three main parts:

![Chat app](home.png)


- **Backend**: Handles the server-side logic and API endpoints.
- **Client**: The front-end for users to interact with the chat interface.
- **Socket**: Manages real-time messaging using WebSocket technology.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)

## Features
- Real-time messaging with WebSocket
- User authentication (sign up, log in)
- Create Chat 
- Persistent chat history
- Responsive user interface
- Show online users 

## Tech Stack

### Backend
- **Node.js**: JavaScript runtime for building server-side applications
- **Express**: Web framework for Node.js
- **MongoDB**: NoSQL database for storing user and message data
- **Socket.io**: Real-time, bidirectional communication for chat functionality
- **JWT**: For user authentication and authorization

### Client
- **React**: JavaScript library for building the user interface


## User Authentication Flow

Users can access the chat application by logging in. If a user does not have an account, they can easily sign up. The flow is as follows:

1. **Login**: 
   - Users enter their credentials (email and password) to log in.
   - Upon successful login, they gain access to the chat interface and can start chatting.

2. **Sign Up**: 
   - If the user does not have an account, they can click on the "Sign Up" button.
   - They will be prompted to enter their details, including their name, email, and password.
   - After successfully signing up, the user can log in with their new credentials.

This process ensures that users have secure access to their chats and can easily create an account if they are new to the application.


![User Authentication Flow](auth.png)

