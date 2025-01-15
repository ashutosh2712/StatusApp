# Base image
FROM python:3.10-slim

# Install system dependencies, including PostgreSQL client and build tools
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

RUN apt-get update && apt-get install -y redis-tools

# Set the working directory in the container
WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend application
COPY . .

# Expose the Django default port
EXPOSE 8000

# Command to run the Django app
CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
