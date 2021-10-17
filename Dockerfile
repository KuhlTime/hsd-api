###############
# BUILD STAGE #
###############

FROM node:16-alpine

# Select working directory
WORKDIR /usr/src/app

# Disable npm update message
RUN npm config set update-notifier false

# Install app dependencies
COPY package*.json ./
RUN npm ci

# Copy files
COPY . .

# Run build
RUN npm run build


#############
# RUN STAGE #
#############

FROM node:16-alpine

# Select working directory
WORKDIR /usr/src/app

# Disable npm update message
RUN npm config set update-notifier false

# Install production dependencies
COPY package*.json ./
RUN npm set-script prepare ""
RUN npm ci --production

# Copy /dist folder from build stage
COPY --from=0 /usr/src/app/dist ./dist

# Start the server
# EXPOSE 80
CMD npm start
