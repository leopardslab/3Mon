import pingJobs from "./http";

// initialize Agenda, jobs and events
function initializeJobs(Agenda, axios, httpModel) {
  let agenda = new Agenda({
    db: {
      address: process.env.MONGO_CONNECTION_URL || config.mongoConnectionString,
      collection: "tasks"
    }
  });

  (async () => {
    // IIFE to give access to async/await
    await agenda.start();
  })();

  agenda.on("ready", async () => {
    const jobs = await agenda.jobs({});
    pingJobs(agenda, axios, jobs, httpModel);
  });

  function failGracefully() {
    console.log("Woot woot something's gonna blow up");
    agenda.stop(() => process.exit(0));
  }

  process.on("SIGTERM", failGracefully);
  process.on("SIGINT", failGracefully);

  return agenda;
}

function defineNewJob(agenda, axios, job, httpModel) {
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
  });
}

export { initializeJobs, defineNewJob };
