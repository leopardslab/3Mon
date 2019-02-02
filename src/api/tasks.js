import resource from "resource-router-middleware";
import tasks from "../models/tasks";
import apiMessages from "./api-messages";
import { defineNewJob } from "../jobs/index";
import { loadTasks, loadTask, createTask } from "./controllers/tasks.js";
import axios from "axios";

// refactoring needed will move all logic to separate files
export default ({ config, db, models, agenda, notifier }) =>
  resource({
    /** Property name to store preloaded entity on `request`. */
    id: "tasks",

    /** For requests with an `id`, you can auto-load the entity.
     *  Errors terminate the request, success sets `req[id] = data`.
     */
    load(req, id, callback) {
      const taskModel = models.taskModel;
      loadTask(taskModel, callback);
    },

    /** GET / - List all entities */
    index: async ({ params }, res) => {
      const taskModel = models.taskModel;
      const allTasks = await loadTasks(taskModel);
      res.json(allTasks).status(200);
    },

    /** POST / - Create a new entity */
    create: async ({ body }, res, next) => {
      let interval = body.interval;
      const taskName = body.taskName;
      const serviceUrl = body.serviceUrl;
      const startMonit = body.startMonit;
      const httpType = body.httpType;
      const httpModel = models.httpModel;

      body.id = tasks.length.toString(36);

      if (interval == undefined || interval == null) {
        return res
          .json({ error: apiMessages.errorMessages.intervalError })
          .status(200);
      }

      createTask({
        interval,
        taskName,
        serviceUrl,
        httpType,
        agenda,
        httpModel,
        notifier
      });

      res.json(body);
    },

    /** GET /:id - Return a given entity */
    read({ tasks }, res) {
      res.json(tasks[0]);
    },

    /** PUT /:id - Update a given entity */
    update({ task, body }, res) {
      for (let key in body) {
        if (key !== "id") {
          task[key] = body[key];
        }
      }
      res.sendStatus(204);
    },

    /** DELETE /:id - Delete a given entity */
    delete({ task }, res) {
      tasks.splice(tasks.indexOf(task), 1);
      res.sendStatus(204);
    }
  });
