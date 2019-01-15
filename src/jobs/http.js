const httpJobs = (agenda, axios, jobs, httpModel) => {
  jobs.map(job => {
    agenda.define(job.attrs.name, (job, done) => {
      const httpType = job.attrs.data.httpType.toUpperCase();

      const serviceUrl = job.attrs.data.serviceUrl;

      switch (httpType) {
        case "GET":
          axios({ method: httpType, url: serviceUrl })
            .then(response => {
              const headers = response.headers;
              const body = response.data;
              const statusCode = response.status;
              const newHttpResponse = new httpModel({
                headers,
                body,
                statusCode
              });
              newHttpResponse.save();
              done();
            })
            .catch(err => {
              // add to logger eg: winston
              console.log(err);
              done();
            });
          break;
        case "POST":
          console.log("POST");
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
      // const newPing = new httpModel({statusCode: 200, body: 'SAMPLE'});
      // newPing.save().then(() => { console.log('Done'); });
    });
  });
};

export default httpJobs;
