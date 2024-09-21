import { Socket } from "socket.io";
import { IUserDocument } from "../../core/models/User.db";
import { isTokenAuthenticated } from "../../core/services/auth.service";

export const authenticatedSocketEvent = async (socket: Socket): Promise<IUserDocument| null> => {
  try {
    const accessToken = socket.handshake.headers.access_token as string;

    if (!accessToken)
      return null

    const user: IUserDocument | null = await isTokenAuthenticated(accessToken);

    if (!!user)
      return user;

    return null;

  } catch (error) {
    throw error;
  }
}
