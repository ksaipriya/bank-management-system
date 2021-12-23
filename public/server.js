const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("data/db.json");
const middlewares = jsonServer.defaults({
    static: "./build"
})

const port = process.env.PORT || 8000;
 server.use('/db',middlewares,router);
 server.use(
     jsonServer.rewriter({
         "/api/*" : "/$1",
     })
 );

 server.use(router);
 server.listen(port,()=>{
     console.log(`Server is running on ${port}`);
 })