# Status Management Application

A comprehensive application to manage and monitor the status of services in real-time.

## Features

- User Authentication (Login, Signup).
- Team and Organization Management.
- Service Management (CRUD operations).
- Incident and Maintenance Management.
- Real-time Status Updates using WebSockets.
- Public Status Page for end-users.

## Technologies Used

- **Backend:** Django, Django REST Framework.
- **Frontend:** React with Vite and Shadcn UI components.
- **Database:** PostgreSQL.
- **WebSocket Server:** Django Channels with Redis.
- **Deployment:** Docker and Docker Compose.
- **Hosting:** GCP Debian Linux VM.

## Access the Application

The application is deployed and accessible at the following URLs:

 [http://34.173.112.130:5173](http://34.173.112.130:5173)


## Run Locally Using Docker

### Prerequisites

- Docker and Docker Compose installed on your machine.

### Steps to Run

```bash
git clone https://github.com/your-repo/status-management-app.git
cd status-management-app
docker-compose -f docker-compose.yml up --build
```

Access the application:

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:8001](http://localhost:8001)

## Environment Variables

Ensure the following environment variables are configured in your `.env` file:

```
SECRET_KEY=your-django-secret-key
DATABASE_NAME=status_management_db
DATABASE_USER=postgres
DATABASE_PASSWORD=StatusPostgres@123
DATABASE_HOST=db
DATABASE_PORT=5432
REDIS_URL=redis://redis:6379
```

## License

This project is licensed under the MIT License.
