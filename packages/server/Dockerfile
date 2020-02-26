FROM node:10

# Create app directory
WORKDIR /home/Github/3MON/packages/server

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080
#choose one  of the following.
# Start development live-reload server
CMD MONGO_CONNECTION_URL=mongodb://:<password>@<hostname>:<port>/<dbname> PORT=8080 npm run dev

# Start production server:
#CMD MONGO_CONNECTION_URL=mongodb://:<password>@<hostname>:<port>/<dbname> PORT=8080 npm start