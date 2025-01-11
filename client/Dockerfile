# Use an official Node.js image as the base
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the Vite project files
COPY . .

# Expose the Vite development server port
EXPOSE 5173

# Command to start the Vite development server
CMD ["npm", "run", "dev", "--", "--host"]
