import { Socket } from 'socket.io';
import { Server } from 'net';
import {
  WebSocketServer,
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayDisconnect,
  OnGatewayConnection
} from '@nestjs/websockets';

import { MessageService } from 'src/message/message.service';
import { UserService } from 'src/user/user.service';

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class MessageGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly userService: UserService,
    private readonly messageService: MessageService
  ) {}

  // --------------------------------------------- //

  @WebSocketServer() server: Server;
  clients = new Map<string, Socket[]>();

  // --------------------------------------------- //

  handleConnection(client: Socket) {
    const socketId = this.hashSocketId(
      client.handshake.query.senderPhoneNumber,
      client.handshake.query.receiverPhoneNumber
    );

    if (!this.clients.has(socketId)) {
      this.clients.set(socketId, [client]);
    } else {
      this.clients.get(socketId).push(client);
    }

    console.log(
      '-------------------\n',
      'CONNECTION:\n',
      client.id,
      client.handshake.query.senderPhoneNumber,
      client.handshake.query.receiverPhoneNumber,
      this.clients.get(socketId)?.length
    );
  }

  // --------------------------------------------- //

  handleDisconnect(client: Socket) {
    const socketId = this.hashSocketId(
      client.handshake.query.senderPhoneNumber,
      client.handshake.query.receiverPhoneNumber
    );

    const socket = this.clients.get(socketId);
    const idx = socket.findIndex((clt) => clt.id === client.id);

    socket.splice(idx, 1);
    if (socket.length === 0) {
      this.clients.delete(socketId);
    }

    console.log(
      '-------------------\n',
      'DISCONNECTION:\n',
      client.id,
      client.handshake.query.senderPhoneNumber,
      client.handshake.query.receiverPhoneNumber,
      socket?.length
    );
  }

  // --------------------------------------------- //

  @SubscribeMessage('message')
  async handleMessage(client: Socket, data: { text: string }) {
    const socketId = this.hashSocketId(
      client.handshake.query.senderPhoneNumber,
      client.handshake.query.receiverPhoneNumber
    );

    const sender = await this.userService.getByPhoneNumber(
      client.handshake.query.senderPhoneNumber.toString()
    );
    const receiver = await this.userService.getByPhoneNumber(
      client.handshake.query.receiverPhoneNumber.toString()
    );

    const text = data.text;

    console.log(
      '-------------------\n',
      'MESSAGE:\n',
      socketId,
      text,
      client.handshake.query.senderPhoneNumber,
      client.handshake.query.receiverPhoneNumber
    );

    const message = await this.messageService.createMessage({
      text: text,
      senderUser: sender,
      receiverUser: receiver
    });

    this.clients.get(socketId).forEach(async (clt) => {
      clt.emit('message', message);
    });
  }

  // ============================================== //

  hashSocketId(phoneNumber1: any, phoneNumber2: any) {
    if (phoneNumber1 > phoneNumber2) {
      [phoneNumber1, phoneNumber2] = [phoneNumber2, phoneNumber1];
    }
    return phoneNumber1 + '-' + phoneNumber2;
  }
}
