const http= require('http');
const fs= require('fs');
const _ = require('lodash');
//the node_modules folder created if node_moduels is not there but its packages are used, just write npm install and it gets installed

const server=http.createServer((req,res)=>{
//console.log('request sent');
//console.log(req);
//console.log(req.url, req.method);

//---LODASH----
const num= _.random(0,20);
console.log(num)

const greet=_.once(()=>{
    console.log('hello');
})

greet()
greet()


//----SET HEADER CONTENT TYPE----

//res.setHeader('Content-Type', 'text/plain')
// res.write('hello people')
// res.end();

res.setHeader('Content-Type', 'text/html')

// res.write('<p>hello people</p>')
// res.write('<p>hello again people</p>')
// res.end();\

let path='./views/'
switch(req.url){
    case '/':
    path +='index.html'
    res.statusCode=200;
    break;

    case '/about':
        path+='about.html'
        res.statusCode=200;
        break;

    case '/about-us':
        res.statusCode=301;
        //redirecting to about
        res.setHeader('Location','/about')
        res.end()
        break;

    default:
        path+='404.html'
        res.statusCode=404;
        break;
}

//----SEND AN HTML FILE----

fs.readFile(path,(err, data)=>{
    if(err){
        console.log(err)
        res.end();
    }
    else{
        res.write(data)
        res.end();
        //if(only 1 line of res.write)the(only write res.end(data))
    }
})


})

server.listen(3000,'localhost',()=>{
    console.log('listening to requests on port 3000')
})

