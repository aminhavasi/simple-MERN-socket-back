const express = require('express');
const socketIo = require('socket.io')
const http = require('http');
const router=require('./router.js')
const app=express();
require('dotenv').config();
const server=http.createServer(app);
const {addUser,getUser,getUsersInRoom,removeUser}=require('./user')
app.use(router)
const io=socketIo(server)
io.on('connection',(socket)=>{
  socket.on('join',({name,room},callback)=>{
  const {error,user}=addUser({id:socket.id,name,room});
  if(error) return callback(error);
  socket.emit('message',{user:'admin',text:`${user.name},welcome to the room ${user.room}`})
  socket.broadcast.to(user.room).emit('message',{user:'admin',text:`${user.name} has join`})
  socket.join(user.room);
  callback();



  })
  socket.on('sendMessage',(message,callback)=>{
    const user=getUser(socket.id);
    io.to(user.room).emit('message',{user:user.name,text:message});

    callback();

  })
  socket.on('disconnect',()=>{
    console.log('User had left')
  })
})
server.listen(process.env.PORT,()=>{
  console.log(`server is running on port ${process.env.PORT}`)

})
