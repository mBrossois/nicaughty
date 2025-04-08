import type * as Party from "partykit/server";
import { characters } from "~/types/characters";
import type { Connections } from "~/types/connections";

export default class Server implements Party.Server {
  constructor(readonly room: Party.Room) {}

  async onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    // A websocket just connected!
  //   console.log(
  //     `Connected:
  // id: ${conn.id}
  // room: ${this.room.id}
  // url: ${new URL(ctx.request.url).pathname}`
  //   );

    // let's send a message to the connection
    // conn.send("hello from server");
    const hostId = await this.room.storage.get('host')

    let connections: Connections = await this.room.storage.get('connections') || []
    const roomCreatedOn: number | undefined = await this.room.storage.get('createdOn')

    const isCreateRoom = new URL(ctx.request.url).searchParams.get('createRoom') === 'true';

    const now = new Date().getTime()
    if((!roomCreatedOn && !!isCreateRoom) || (!hostId && !!isCreateRoom && now - roomCreatedOn > 18000000 )) {
      this.room.storage.put('host', conn.id)
      this.room.storage.put('createdOn', now)
      this.room.storage.delete('connections')
      this.room.storage.put('connections', [])
      return;
    }
    if(hostId && !!isCreateRoom) {
      conn.send(JSON.stringify({messageType: 'error', message: 'Room taken', status: 401}))
      return;
    }
    if(!hostId && !isCreateRoom) {
      conn.send(JSON.stringify({messageType: 'error', message: 'Room not found', status: 401}))
      return;
    }
    if(connections.length === 8) {
      conn.send(JSON.stringify({messageType: 'error', message: 'Room full', status: 401}))
      return;
    }

    conn.send(JSON.stringify({messageType: 'set-id', value: {id: conn.id,  character: characters[connections.length]}}))
    connections.push({isHost: connections.length === 0, id: conn.id, character: characters[connections.length]})
    this.room.storage.put('connections', connections)
    this.room.broadcast(
      JSON.stringify({messageType: 'connections', connections})
    );

  }

  async onMessage(message: string, sender: Party.Connection) {
    let connections: Connections = await this.room.storage.get('connections') || []

    const parsedMessage = JSON.parse(message)
    switch(parsedMessage.messageType) {
      case 'player-name-change': 
        const senderConnection = connections.find(connection => connection.id === sender.id)
        if(senderConnection) {
          senderConnection.name = parsedMessage.value
          this.room.storage.put('connections', connections)
          this.room.broadcast(
            JSON.stringify({messageType: 'connections', connections})
          )
        }
        return
      case 'remove-player':
        connections = connections.filter(connection => connection.id !== parsedMessage.value)
        this.room.storage.put('connections', connections)
        this.room.broadcast(
          JSON.stringify({messageType: 'connections', connections})
        )
        return
    }
  }

  async onClose(conn: Party.Connection): Promise<void> {
    let connections: Connections = await this.room.storage.get('connections') || []
    const hostId = await this.room.storage.get('host')
    if(conn.id === hostId) {
      this.room.storage.deleteAll()
      this.room.broadcast(
        JSON.stringify({messageType: 'host-disconnected'})
      );
      return
    }
    connections = connections.filter((connection) => connection.id !== conn.id)
    this.room.storage.put('connections', connections)
    if(connections.length > 0 && !connections[0].isHost) {
      connections[0].isHost = true
    }
    this.room.broadcast(
      JSON.stringify({messageType: 'connections', connections})
    );
  }
}

Server satisfies Party.Worker;
