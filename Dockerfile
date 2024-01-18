# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy over the prisma schema
COPY prisma/schema.prisma ./prisma/

# Generate the prisma client based on the schema
RUN npx prisma generate

# Copy the rest of your app's source code
COPY . .

RUN npx prisma db push

# Build the production version of the app
RUN npm run build

# Expose the port your Next.js app will run on
EXPOSE 3000

# Start your Next.js app
CMD ["npm", "start"]