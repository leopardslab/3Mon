import {version} from '../../package.json';
import {Router} from 'express';
import tasks from './tasks';

export default ({config, db, agenda}) => {
    let api = Router();

    // mount the tasks resource
    api.use('/tasks', tasks({config, db, agenda}));

    // perhaps expose some API metadata at the root
    api.get('/', (req, res) => {
        res.json({version});
    });

    return api;
}
