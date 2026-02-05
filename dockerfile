FROM nginx:alpine

# Remove default nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy only the files needed for the site
COPY index.html style.css script.js /usr/share/nginx/html/
