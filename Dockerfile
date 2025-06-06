# Use Node.js for building the React app
FROM node:18 as build
# Set the working directory
WORKDIR /app
# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install
# Copy the entire project and build the React app
COPY . .
RUN npm run build
# Use Nginx to serve the React app
FROM nginx:alpine
# Copy the built React app
COPY --from=build /app/dist /usr/share/nginx/html
# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose the default Nginx port
EXPOSE 80
# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
