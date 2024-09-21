import { Server, Socket } from 'socket.io';
import { authenticatedSocketEvent } from '../middleware/auth-socket.middleware';
import { IMessageDocument } from '../../core/models/Message.db';
import { IMessageEvents_SendMessage, IMessageEvents_SubscribeCommunity } from '../interfaces/IMessageEvents.interface';
import { IUserDocument } from '../../core/models/User.db';
import { SocketErrorConstants } from '../interfaces/SocketErrors.enum';
import { Types } from 'mongoose';
import { findCommunityById } from '../../core/services/communities.service';
import { createMessage } from '../../core/services/messages.service';

export const messageEvents = (io: Server, socket: Socket) => {

  socket.on('subscribe-community-messages', async (data: IMessageEvents_SubscribeCommunity) => {
    try {
      if(!!data.communityId) {
        socket.join(data.communityId.toString());
        console.info(`User subscribe community: ${data.communityId.toString()}`);
      }
    } catch (error) {
      console.error(`SOCKET ERROR CATCH: ${error}`);
      socket.emit('error-send-message', SocketErrorConstants.INTERNAL_ERROR);
    }
  });

  socket.on('unsubscribe-community-messages', async (data: IMessageEvents_SubscribeCommunity) => {
    try {
      if(!!data.communityId) {
        socket.leave(data.communityId.toString());
        console.info(`User unsubscribe community: ${data.communityId.toString()}`);
      }
    } catch (error) {
      console.error(`SOCKET ERROR CATCH: ${error}`);
      socket.emit('error-send-message', SocketErrorConstants.INTERNAL_ERROR);
    }
  });

  socket.on('send-message', async (message: IMessageEvents_SendMessage) => {
    try {
      const user: IUserDocument | null = await authenticatedSocketEvent(socket);

      if (!user) {
        socket.emit('error-send-message', SocketErrorConstants.UNAUTHORIZED.TOKEN);
        return;
      }

      if (!Types.ObjectId.isValid(message.communityId)) {
        socket.emit('error-send-message', SocketErrorConstants.NOT_FOUND.COMMUNITY);
        return;
      }

      const [community, errors] = await findCommunityById(message.communityId);

      if (!community) {
        socket.emit('error-send-message', SocketErrorConstants.NOT_FOUND.COMMUNITY);
        return;
      }

      const sentMessage: IMessageDocument = await createMessage(user, community, message.content);

      io.to(message.communityId.toString()).emit('receive-message', sentMessage);

      return;

    } catch (error) {
      // Emit an error event to the client
      console.error(`SOCKET ERROR CATCH: ${error}`);
      socket.emit('error-send-message', SocketErrorConstants.INTERNAL_ERROR);
    }
  });

}
