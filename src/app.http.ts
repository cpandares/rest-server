
import fs from 'fs';
import http from 'http';



const server = http.createServer((req, res) => {
   // res.end('Hello World');

   console.log(req.url);

    // res.writeHead(200, {'Content-Type': 'text/html'});
    // res.write('<h1>Hello World</h1>');
    // res.end();

    // const data = {
    //     id: 1,
    //     name: 'John Doe',
    //     age: 25
    // }

    // res.writeHead(200, {'Content-Type': 'application/json'});
    // res.write(JSON.stringify(data));
    // res.end();

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

    const content = fs.readFileSync(`./public${req.url}`, 'utf-8');
    res.write(content);
    res.end();

});

server.listen(3000, ()=>{
    console.log('Server is running on port 3000');
});


