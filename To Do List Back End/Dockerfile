
FROM node:18

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of app code
COPY . .

# Expose the port app runs on 
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
