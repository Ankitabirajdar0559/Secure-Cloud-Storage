# ☁️ Secure Cloud Storage System

## 📌 Overview

Secure Cloud Storage is a full-stack web application that provides a secure platform for users to store and manage their files digitally.

The application allows users to create an account, authenticate securely, upload files, download files, and manage their personal storage space.

The backend is developed using **Java Spring Boot**, while the frontend is built using **React.js** with a responsive user interface.

---

# ✨ Features

## 🔐 Authentication & Security

* User registration
* Secure login system
* JWT-based authentication
* BCrypt password encryption
* Protected REST APIs
* Role-based user management

## 📁 File Management

* Upload files securely
* View uploaded files
* Download files
* Delete files
* User-specific file storage
* Track file size and upload details

## 📊 Dashboard

* Storage usage overview
* Total uploaded files count
* User information display
* File management interface

---

# 🏗️ System Architecture

```
React.js Frontend
        |
        |
      REST API
        |
        |
Spring Boot Backend
        |
        |
      MySQL Database
```

---

# 🛠️ Technologies Used

## Backend

| Technology      | Purpose               |
| --------------- | --------------------- |
| Java 21         | Programming Language  |
| Spring Boot     | Backend Framework     |
| Spring Security | Application Security  |
| JWT             | Authentication        |
| Hibernate / JPA | Database Management   |
| MySQL           | Database              |
| Maven           | Dependency Management |

## Frontend

| Technology | Purpose           |
| ---------- | ----------------- |
| React.js   | User Interface    |
| JavaScript | Frontend Logic    |
| Axios      | API Communication |
| HTML5      | Structure         |
| CSS3       | Styling           |

## Development Tools

* Spring Tool Suite (STS)
* MySQL Workbench
* Postman
* Git & GitHub

---

# 📂 Project Structure

```
Secure-Cloud-Storage

├── Backend
│
├── src
│   └── main
│       ├── java
│       │   └── com.example.cloudstorage
│       │       ├── controller
│       │       ├── service
│       │       ├── serviceimpl
│       │       ├── repository
│       │       ├── entity
│       │       ├── security
│       │       └── config
│       │
│       └── resources
│           └── application.properties
│
└── pom.xml
```

---

# ⚙️ Backend Configuration

Update database details in:

```
src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/cloud_storage_db
spring.datasource.username=root
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update

server.port=8081
```

---

# ▶️ Running the Application

### Clone Repository

```bash
git clone https://github.com/Ankitabiraj0559/Secure-Cloud-Storage.git
```

### Navigate to Project

```bash
cd Secure-Cloud-Storage
```

### Run Spring Boot Application

```bash
mvn spring-boot:run
```

Backend runs on:

```
http://localhost:8081
```

---

# 🔗 API Endpoints

## Authentication

| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| POST   | /api/auth/register | Register new user |
| POST   | /api/auth/login    | User login        |

## File Management

| Method | Endpoint                 | Description    |
| ------ | ------------------------ | -------------- |
| POST   | /api/files/upload        | Upload file    |
| GET    | /api/files               | Get user files |
| GET    | /api/files/download/{id} | Download file  |
| DELETE | /api/files/{id}          | Delete file    |

---

# 🚀 Future Enhancements

* AWS EC2 deployment
* AWS S3 integration for file storage
* AWS RDS database deployment
* Docker containerization
* File sharing between users
* Email notifications
* Admin dashboard

---

# 👩‍💻 Developer

**Ankita Kumar Birajdar**

B.Tech Computer Science Engineering

GitHub:
https://github.com/Ankitabiraj0559

---

# 📄 License

This project is developed for learning and demonstration purposes.
