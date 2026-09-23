# Step 1: Select the Base Image (Node.js)
FROM node:18-alpine

# Step 2: Set the working directory inside the container
WORKDIR /juice-shop

# Step 3: Copy package files required for installing dependencies
COPY package*.json ./

# Step 4: Install production dependencies
RUN npm install --only=production

# Step 5: Copy all remaining application files
COPY . .

# Step 6: Expose the port on which the application runs
EXPOSE 3000

# Step 7: Specify the command to start the application
CMD ["npm", "start"]