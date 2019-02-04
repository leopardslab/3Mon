import tasks from "../../models/tasks";
import apiMessages from "../api-messages";

const loadTask = (taskModel, callback) => {
  return new Promise((resolve, reject) => {
    taskModel.find(
      {
        _id: id
      },
      ["name", "type", "data", "priority"],
      (err, tsk) => {
        if (err) reject(err); //callback(err, null);

        resolve(tsk); //callback(err, tsk);
      }
    );
  });
};

const loadTasks = (taskModel, callback) => {
  return new Promise((resolve, reject) => {
    taskModel.find(
      {},
      ["name", "type", "data", "priority"],
      (err, allTasks) => {
        if (err) reject(err);
        resolve(allTasks);
      }
    );
  });
};

const createTask = async ({
  interval,
  taskName,
  serviceUrl,
  httpType,
  agenda,
  httpModel,
  notifier
}) => {
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
    return false;
  }
};

export { loadTask, loadTasks, createTask };
