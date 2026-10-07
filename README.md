# ☁️ Secure Cloud Storage System

## 📌 Overview

Secure Cloud Storage is a full-stack web application that provides a secure platform for users to store and manage their files digitally.

Users can create an account, log in securely, upload files, download files, and manage their personal storage space.

The backend is built with **Java Spring Boot**, the frontend with **React (Vite)**, and the data is stored in **MySQL**. The whole application runs as a **3-tier architecture using Docker Compose**.

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

* Upload files securely (up to 100 MB)
* View uploaded files
* Download files
* Delete files
* User-specific file storage
* Track file size and upload details

## 📊 Dashboard

* Storage usage overview
* Total uploaded files count
* Recent files list
* User profile information

---

# 🏗️ System Architecture

The application follows a 3-tier design. Each tier runs in its own Docker container.

```
                 Browser
                    |
             http://localhost:3000
                    |
   ┌────────────────────────────────────┐
   │  Presentation Tier  (web-tier)     │
   │  React build served by Nginx       │
   │  Nginx forwards /api/* requests    │
   └────────────────┬───────────────────┘
                    |   web-net
   ┌────────────────▼───────────────────┐
   │  Application Tier  (app-tier)      │
   │  Spring Boot (Java 21), port 8081  │
   └────────────────┬───────────────────┘
                    |   db-net
   ┌────────────────▼───────────────────┐
   │  Data Tier  (db-tier)              │
   │  MySQL 8.0                         │
   └────────────────────────────────────┘
```

| Tier | Container | Technology | Networks |
| ---- | --------- | ---------- | -------- |
| Presentation | `web-tier` | React + Nginx | `web-net` |
| Application | `app-tier` | Spring Boot (Java 21) | `web-net`, `db-net` |
| Data | `db-tier` | MySQL 8.0 | `db-net` |

**Network isolation:** only the web tier is published to the host (port 3000). The database sits on a private network and can be reached only by the backend. The web tier cannot connect to the database directly.

**Persistent storage:** two Docker volumes keep data across restarts: `db-data` (MySQL data) and `uploads-data` (uploaded files).

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
| MySQL 8         | Database              |
| Maven           | Dependency Management |

## Frontend

| Technology   | Purpose                  |
| ------------ | ------------------------ |
| React        | User Interface           |
| Vite         | Build Tool               |
| Tailwind CSS | Styling                  |
| React Router | Page Navigation          |
| Axios        | API Communication        |

## DevOps

| Technology     | Purpose                                  |
| -------------- | ---------------------------------------- |
| Docker         | Containerization                         |
| Docker Compose | Running the 3 tiers together             |
| Nginx          | Serves the frontend and proxies the API  |

## Development Tools

* Spring Tool Suite (STS)
* MySQL Workbench
* Postman
* Git & GitHub

---

# 📂 Project Structure

```
Secure-Cloud-Storage
│
├── Dockerfile                  # Backend image (Maven build + Java 21 runtime)
├── docker-compose.yml          # Runs db, backend and frontend together
├── .dockerignore
├── pom.xml
│
├── src
│   └── main
│       ├── java/com/example/cloudstorage
│       │   ├── config
│       │   ├── controller
│       │   ├── dto
│       │   ├── entity
│       │   ├── repository
│       │   ├── security
│       │   ├── service
│       │   └── serviceimpl
│       └── resources
│           └── application.properties
│
├── frontend
│   ├── Dockerfile              # Frontend image (Node build + Nginx)
│   ├── nginx.conf              # Static files + /api proxy to backend
│   ├── .dockerignore
│   ├── package.json
│   ├── vite.config.js
│   └── src
│       ├── components
│       ├── context
│       ├── css
│       ├── hooks
│       ├── layouts
│       ├── pages
│       ├── routes
│       ├── services
│       └── utils
│
└── docs
    └── screenshots
```

---

# 🐳 Running with Docker (Recommended)

## Prerequisites

* Docker Desktop installed and running (wait for "Engine running")
* About 4 GB of free RAM for the first build

## Step 1: Clone the repository

```bash
git clone https://github.com/Ankitabirajdar0559/Secure-Cloud-Storage.git
cd Secure-Cloud-Storage
```

## Step 2: Build and start all three tiers

```bash
docker compose up -d --build
```

The first build takes 5 to 10 minutes because it downloads Maven, Node and MySQL images.

## Step 3: Check the containers

```bash
docker compose ps
```

You should see `db-tier` (healthy), `app-tier` and `web-tier` running.

## Step 4: Open the application

```
http://localhost:3000
```

Register a new user, log in, and upload a file.

## Useful commands

| Command | Purpose |
| ------- | ------- |
| `docker compose logs -f backend` | Watch the backend logs |
| `docker compose stop` | Stop containers (data is kept) |
| `docker compose up -d` | Start them again |
| `docker compose down` | Remove containers (data is kept) |
| `docker compose down -v` | Remove containers **and delete all data** |
| `docker compose up -d --build` | Rebuild after changing code |

## Verify the tier isolation

```bash
# Backend can reach the database (prints an IP address)
docker exec app-tier getent hosts db

# Web tier cannot reach the database (prints nothing)
docker exec web-tier getent hosts db
```

## Look inside the database

```bash
docker exec -it db-tier mysql -uroot -prootpass cloud_storage_db -e "SHOW TABLES;"
```

---

# 💻 Running Without Docker (Development)

## Backend

1. Start a local MySQL server.
2. Update `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/cloud_storage_db?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update

server.port=8081
```

3. Run:

```bash
mvn spring-boot:run
```

Backend runs on `http://localhost:8081`.

## Frontend

The frontend calls the API at `/api`. For local development, add a proxy to `frontend/vite.config.js` so `/api` reaches the backend:

```js
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": "http://localhost:8081",
    },
  },
});
```

Then run:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.

---

# 📸 Screenshots

## Containers running

All three tiers up, with the database healthy.

![Containers running](docs/screenshots/01-containers-running.png)

## Backend connected to the Docker database

The backend log shows the application started and connected to `db:3306`.

![Backend logs](docs/screenshots/02-backend-logs.png)

## Login page

![Login page](docs/screenshots/03-login-page.png)

## Dashboard

![Dashboard](docs/screenshots/04-dashboard.png)

## File upload and My Files

![My Files](docs/screenshots/05-my-files.png)

## Database tables

![Database](docs/screenshots/06-database.png)

## Tier isolation proof

The backend can resolve the database. The web tier cannot.

![Tier isolation](docs/screenshots/07-isolation.png)

---

# 🔗 API Endpoints

## Authentication

| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| POST   | /api/auth/register | Register new user |
| POST   | /api/auth/login    | User login        |

## Users

| Method | Endpoint             | Description          |
| ------ | -------------------- | -------------------- |
| GET    | /api/users/profile   | Get logged-in profile |
| PUT    | /api/users/update/{id} | Update user        |

## File Management

| Method | Endpoint                 | Description          |
| ------ | ------------------------ | -------------------- |
| POST   | /api/files/upload        | Upload file          |
| GET    | /api/files               | Get user files       |
| GET    | /api/files/count         | Get total file count |
| GET    | /api/files/storage       | Get storage usage    |
| GET    | /api/files/download/{id} | Download file        |
| DELETE | /api/files/{id}          | Delete file          |

All endpoints except `/api/auth/**` and `/api/users/register` require a JWT token in the `Authorization: Bearer <token>` header.

---

# 🧰 Troubleshooting

| Problem | Fix |
| ------- | --- |
| Docker crashes during the build | Close other apps, and limit WSL memory in `C:\Users\<you>\.wslconfig` (`memory=4GB`), then run `wsl --shutdown` |
| Frontend build fails with "Could not resolve" | Check CSS import paths and letter case (Linux is case-sensitive) |
| Register or login fails with 403 | Make sure `nginx.conf` uses `proxy_set_header Host $http_host;` |
| Upload fails with 413 | Check `client_max_body_size 100m;` in `frontend/nginx.conf` |
| Port 3000 already in use | Change `"3000:80"` in `docker-compose.yml` |
| 502 Bad Gateway | The backend is still starting. Wait 30 seconds and refresh |

---

# ⚠️ Security Note

The database password (`rootpass`) and the JWT secret in this repository are **demo values for learning only**. Before any real deployment, move them to environment variables or a secrets manager.

---

# 🚀 Future Enhancements

* AWS EC2 deployment
* AWS S3 integration for file storage
* AWS RDS database deployment
* File sharing between users
* Email notifications
* Admin dashboard

---

# 👩‍💻 Developer

**Ankita Kumar Birajdar**

B.Tech Computer Science Engineering

GitHub: https://github.com/Ankitabirajdar0559

---

# 📄 License

This project is developed for learning and demonstration purposes.
