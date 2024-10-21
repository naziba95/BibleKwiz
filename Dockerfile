# Use an official Node runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Set environment variables
ENV HOST=0.0.0.0 \
    PORT=3000 \
    BASE_URL=https://biblekwiz-server.onrender.com

# Define the command to run the app
CMD ["npm", "start"]