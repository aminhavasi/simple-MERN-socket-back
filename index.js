const express = require('express');
const socketIo = require('socket.io')
const http = require('http');
const router=require('./router.js')
const app=express();
require('dotenv').config();
const server=http.createServer(app);
app.use(router)
const io=socketIo(server)
io.on('connection',(socket)=>{
  console.log('we have a new connection')
  socket.on('disconnect',()=>{
    console.log('User had left')
  })
})
server.listen(process.env.PORT,()=>{
  console.log(`server is running on port ${process.env.PORT}`)

})
