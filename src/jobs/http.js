function defineNewJob(agenda, axios, job, httpModel, configModel, notifier) {
  // axios interceptors to take request and reponse time
  axios.interceptors.request.use(
    function(config) {
      config.metadata = {
        startTime: new Date()
      };
      return config;
    },
    function(error) {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function(response) {
      response.config.metadata.endTime = new Date();
      response.duration =
        response.config.metadata.endTime - response.config.metadata.startTime;
      return response;
    },
    function(error) {
      error.config.metadata.endTime = new Date();
      error.duration =
        error.config.metadata.endTime - error.config.metadata.startTime;
      return Promise.reject(error);
    }
  );

  agenda.define(job.attrs.name, (job, done) => {
    const httpType = job.attrs.data.httpType.toUpperCase();
    const serviceUrl = job.attrs.data.serviceUrl;
    const type = notifier.notifierTypes;
    const request = {
      serviceUrl,
      httpType
    };

    const thresMonNotifier = notifier.createNotifier(
      type.EMAIL,
      request,
      configModel
    );

    switch (httpType) {
      case "GET":
        axios({ method: httpType, url: serviceUrl })
          .then(response => {
            const headers = response.headers;
            const body = response.data;
            const statusCode = response.status;
            const startTime = response.config.metadata.startTime.getTime();
            const endTime = response.config.metadata.startTime.getTime();
            const responseTime = endTime - startTime;

            let newHttpResponse = new httpModel({
              headers,
              body,
              statusCode,
              responseTime
            });
            newHttpResponse.save();
            done();
          })
          .catch(err => {
            // add to logger eg: winston
            thresMonNotifier.setFailure({ serviceUrl, httpType });
            console.log(err);
            done();
          });
        break;
      case "POST":
        const httpBody = jobs.attrs.data.httpBody;

        axios({ method: httpType, url: serviceUrl, data: httpBody })
          .then(response => {
            const headers = response.headers;
            const body = response.data;
            const statusCode = response.status;
            const startTime = response.config.metadata.startTime.getTime();
            const endTime = response.config.metadata.startTime.getTime();
            const responseTime = endTime - startTime;

            let newHttpResponse = new httpModel({
              headers,
              body,
              statusCode,
              responseTime
            });
            newHttpResponse.save();
            done();
          })
          .catch(err => {
            // add to logger eg: winston
            thresMonNotifier.setFailure({ serviceUrl, httpType });
            console.log(err);
            done();
          });
        break;
      case "DELETE":
        console.log("DELETE");
        break;
      case "PATCH":
        console.log("PATCH");
        break;
      case "PUT":
        console.log("PUT");
        break;
      default:
        done();
    }
  });
}

const httpJobs = (agenda, axios, jobs, httpModel, configModel, notifier) => {
  jobs.map(job => {
    defineNewJob(agenda, axios, job, httpModel, configModel, notifier);
  });
};

export { httpJobs, defineNewJob };
