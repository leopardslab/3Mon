# 3Mon

3rd Party service monitoring tool

## Install

```
npm install -g three-mon
```

## Getting Started

```sh
# clone it
git clone git@github.com:leopardslab/3Mon.git
cd 3Mon

# Install dependencies
npm install

# Start development live-reload server
MONGO_CONNECTION_URL=mongodb://<user>:<password>@<hostname>:<port>/<dbname> PORT=8080 npm run dev

# Start production server:
MONGO_CONNECTION_URL=mongodb://<user>:<password>@<hostname>:<port>/<dbname> PORT=8080 npm start
```

## Docker Support

```sh
cd express-es6-rest-api

# Build your docker
docker build -t leopardslab/3Mon .
#            ^      ^         ^
#          tag  tag name      Dockerfile location

# run your docker
docker run -p 8080:8080 leopardslab/3Mon
#                 ^            ^
#          bind the port    container tag
#          to your host
#          machine port

```

## Misc

- [OpenMetrics](https://openmetrics.io/) - Open standard for metrics

## License

MIT
