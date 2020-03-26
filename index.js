const express = require('express');
const socketIo = require('socket.io')
const http=require('http');
const app=express();
require('dotenv').config()
const server=http.createServer(app);
const io=socketIo(server);

const router=require('./router')
app.use(router)
server.listen(process.env.PORT||5000,()=>{
	console.log(`server is running on port ${process.env.PORT||5000}`)
})
