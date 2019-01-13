const pingJobs = (agenda, jobs, pingModel) => {
  jobs.map(job => {
    agenda.define(job.attrs.name, job => {
      const httpType = job.attrs.data.httpType.toUpperCase();

      switch (httpType) {
        case "GET":
          console.log("GET");
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
      }
      // const newPing = new pingModel({statusCode: 200, body: 'SAMPLE'});
      // newPing.save().then(() => { console.log('Done'); });
    });
  });
};

export default pingJobs;
