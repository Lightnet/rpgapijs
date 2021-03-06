/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://stackoverflow.com/questions/57512366/how-to-use-socket-io-with-next-js-api-routes
// https://codesandbox.io/s/piffv?file=/src/pages/api/socketio.ts

import { Server as ServerIO } from "socket.io";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  if (!res.socket.server.io) {
    console.log("New Socket.io server...");
    // adapt Next's net Server to http Server
    const httpServer = res.socket.server;
    
    const io = new ServerIO(httpServer, {
      path: "/api/socketio",
    });

    io.on('connection', socket => {
      console.log("Connect user!");
      socket.broadcast.emit('a user connected')
      socket.on('hello', msg => {
        socket.emit('hello', 'world!')
      })
    })

    // append SocketIO server to Next.js socket server response
    res.socket.server.io = io;
  } else {
    console.log('socket.io already running')
  }

  res.end();
};