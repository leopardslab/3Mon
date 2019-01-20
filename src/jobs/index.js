import { httpJobs, defineNewJob } from "./http";

// initialize Agenda, jobs and events
function initializeJobs(Agenda, axios, httpModel, configModel, notifier) {
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
    httpJobs(agenda, axios, jobs, httpModel, configModel, notifier);
  });

  function failGracefully() {
    console.log("Woot woot something's gonna blow up");
    agenda.stop(() => process.exit(0));
  }

  process.on("SIGTERM", failGracefully);
  process.on("SIGINT", failGracefully);

  return agenda;
}

export { initializeJobs, defineNewJob };
