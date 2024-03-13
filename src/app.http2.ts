
import fs from 'fs';
import http from 'http2';



const server = http.createSecureServer( {
    key: fs.readFileSync('./keys/server.key'),
    cert: fs.readFileSync('./keys/server.crt')
}, (req, res) => {
   // res.end('Hello World');

   console.log(req.url);

   

    if(req.url === '/'){
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(htmlFile);
        res.end();

        return;
    }

    if( req.url?.endsWith('.js') ){
        res.writeHead(200, {'Content-Type': 'text/javascript'});
    }else if( req.url?.endsWith('.css') ){
        res.writeHead(200, {'Content-Type': 'text/css'});
    }

    try {
        const content = fs.readFileSync(`./public${req.url}`, 'utf-8');
        res.write(content);
        res.end();
        
    } catch (error) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.write('<h1>Not Found</h1>');
        res.end();
    }   


});

server.listen(3000, ()=>{
    console.log('Server is running on port 3000');
});


