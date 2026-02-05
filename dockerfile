###########
# Base image
###########
# Use a small Linux image that already has nginx installed and configured.
FROM nginx:alpine

########################
# Image build steps
########################
# Remove the default nginx HTML so we can serve only our app.
RUN rm -rf /usr/share/nginx/html/*

# Copy only the files needed for the static site into nginx's web root.
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/

########################
# Runtime configuration
########################
# Document that nginx listens on port 80 inside the container.
# The actual port on your machine is set with `-p` or docker-compose.
EXPOSE 80
