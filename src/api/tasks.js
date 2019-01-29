import resource from "resource-router-middleware";
import tasks from "../models/tasks";
import apiMessages from "./api-messages";
import { defineNewJob } from "../jobs/index";
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
      taskModel.find(
        {
          _id: id
        },
        ["name", "type", "data", "priority"],
        (err, tsk) => {
          if (err) callback(err, null);

          callback(err, tsk);
        }
      );
    },

    /** GET / - List all entities */
    index: async ({ params }, res) => {
      const taskModel = models.taskModel;

      taskModel.find(
        {},
        ["name", "type", "data", "priority"],
        (err, allTasks) => {
          res.json(allTasks).status(200);
        }
      );
    },

    /** POST / - Create a new entity */
    create: async ({ body }, res, next) => {
      let interval = body.interval;
      const taskName = body.taskName;
      const serviceUrl = body.serviceUrl;
      const startMonit = body.startMonit;
      const httpType = body.httpType;

      body.id = tasks.length.toString(36);

      if (interval == undefined || interval == null) {
        return res
          .json({ error: apiMessages.errorMessages.intervalError })
          .status(200);
      }

      const httpModel = models.httpModel;

      try {
        await agenda.every(interval, taskName, { serviceUrl, httpType });
        let job = {
          attrs: {
            name: taskName
          }
        };
        // define jobs dynamically for newly created ones
        defineNewJob(agenda, axios, job, httpModel, notifier);
      } catch (err) {
        console.log(err);
        return res
          .json({ error: apiMessages.errorMessages.taskSaveError })
          .status(200);
      }

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
