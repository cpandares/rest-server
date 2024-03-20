import express, { Router } from 'express'
import path from 'path';


interface Options {
    port: number;
    routes : Router;
    public_path?: string;
}


export class Server {

    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor(private options: Options) {
        const { port, public_path,routes } = options;
        this.port = port;
        this.publicPath = public_path || 'public';
        this.routes = routes;
    }

    
    async start() {

        /* mniddlewaew */

        this.app.use( express.json() ); /*  tipo de peticion raw  */
        this.app.use( express.urlencoded({ extended: true }) ); /* tipo de peticion url encoded */

        this.app.use( express.static(this.publicPath) );

        /* Routes */
        this.app.use('/api', this.routes);

        this.app.get('*', (req, res) => {
            const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
            res.sendFile(indexPath);

        })


        this.app.listen(this.port, () => {
            console.log('Server is running on port 3000')
        })
    }

}