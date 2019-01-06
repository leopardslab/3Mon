import resource from 'resource-router-middleware';
import tasks from '../models/tasks';

export default ({config, db, agenda}) => resource({

    /** Property name to store preloaded entity on `request`. */
    id: 'task',

    /** For requests with an `id`, you can auto-load the entity.
     *  Errors terminate the request, success sets `req[id] = data`.
     */
    load(req, id, callback) {
        let task = tasks.find(task => task.id === id),
            err = task ? null : 'Not found';
        callback(err, task);
    },

    /** GET / - List all entities */
    index: async ({params}, res) => {
        res.json(tasks);
    },

    /** POST / - Create a new entity */
    create: async ({body}, res) => {
        body.id = tasks.length.toString(36);
        tasks.push(body);
        await agenda.every('1 minute', 'HTTP GET');
        res.json(body);
    },

    /** GET /:id - Return a given entity */
    read({task}, res) {
        res.json(task);
    },

    /** PUT /:id - Update a given entity */
    update({task, body}, res) {
        for (let key in body) {
            if (key !== 'id') {
                task[key] = body[key];
            }
        }
        res.sendStatus(204);
    },

    /** DELETE /:id - Delete a given entity */
    delete({task}, res) {
        tasks.splice(tasks.indexOf(task), 1);
        res.sendStatus(204);
    }
});
