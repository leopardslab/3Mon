import pingJobs from "./ping";

// initialize Agenda, jobs and events
function initializeJobs(Agenda, pingModel) {
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
    pingJobs(agenda, jobs, pingModel);
  });

  return agenda;
}

export default initializeJobs;
