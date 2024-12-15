# Use the specific Node.js version
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose the port your backend listens on (e.g., 5000)
EXPOSE 5000

# Start the application
CMD ["node", "server.js"]
