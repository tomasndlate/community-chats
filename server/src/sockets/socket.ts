import { Server, Socket } from 'socket.io';
import { messageEvents } from './events/message.event';

export const socketServer = (server: any) => {

  const io: Server = new Server(server, { cors: {origin: '*'} } );

  // New client socket connection
  io.on('connection', (socket: Socket) => {

    // Connect
    console.log('User connected!');

    // Disconnect
    socket.on('disconnect', () => { console.log('User disconnected!'); });

    // Message Events
    messageEvents(io, socket);
  });

  return io;
};
