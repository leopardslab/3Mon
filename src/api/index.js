import { version } from "../../package.json";
import { Router } from "express";
import tasks from "./tasks";

export default ({ config, db, models, agenda }) => {
  let api = Router();

  // mount the all tasks
  api.use("/tasks", tasks({ config, db, models, agenda }));
  // route related to a single task

  // perhaps expose some API metadata at the root
  api.get("/", (req, res) => {
    res.json({ version });
  });

  return api;
};
