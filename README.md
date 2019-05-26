# raven

3rd party service monitoring tool

<img align="center" src="https://github.com/leopardslab/3Mon/blob/master/docs/Raven%20-%20leopardslab.png" />

## Install

```
npm install -g raven-monit
```

## Getting Started

```sh
# clone it
git clone git@github.com:leopardslab/raven.git
cd raven

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

# run mongo
docker run -p 27017:27017 --name raven-mongo mongo
```

## Misc

- [OpenMetrics](https://openmetrics.io/) - Open standard for metrics

## License

MIT © [leopardslab](https://github.com/leopardslab)
