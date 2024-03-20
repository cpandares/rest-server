import { Router } from 'express';
import { TodoController } from './todos/controller';
import { TodoRoutes } from './todos/routes';



export class AppRoutes {

    static get routes():Router{

        const router = Router();

        router.use('/todos', TodoRoutes.routes);

        return router;


    }

}