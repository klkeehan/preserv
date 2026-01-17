# use node v22
FROM node:22

# navigate to the app directory
WORKDIR /app

# copy json file
COPY package*.json ./

# install packages
RUN npm install

# copy app content into container
COPY . .

# set port variable
ENV PORT=8080
# expose port for access
EXPOSE 8080

# run app
CMD ["npm", "start"]