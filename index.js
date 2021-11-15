const http = require("http");
const forwardMessage = require("./forwardMessage");
const { guid } = require("./helpers");
const sendJoinNotification = require("./send-join-notification");
const websocketServer = require("websocket").server;
const httpServer = http.createServer();
httpServer.listen(9090, () => console.log("Listening.. on 9090"));
//hashmap clients

const existingRooms = {};
const clients = {};

const wsServer = new websocketServer({
  httpServer: httpServer,
});
wsServer.on("request", (request) => {
  //connect
  const connection = request.accept(null, request.origin);

  connection.on("open", () => console.log("opened!"));
  connection.on("close", () => console.log("closed!"));

  connection.on("message", (message) => {
    const requestInfo = JSON.parse(message.utf8Data);

    forwardMessage(
      "message",
      "message-received",
      requestInfo.clientId,
      requestInfo,
      existingRooms,
      clients
    );

    forwardMessage(
      "chosen-cards",
      "opponent-chosen-cards",
      requestInfo.clientId,
      requestInfo,
      existingRooms,
      clients
    );

    forwardMessage(
      "play-card",
      "opponent-play-card",
      requestInfo.clientId,
      requestInfo,
      existingRooms,
      clients
    );
    forwardMessage(
      "attack",
      "opponent-attack",
      requestInfo.clientId,
      requestInfo,
      existingRooms,
      clients
    );
    forwardMessage(
      "destory",
      "opponent-destroy",
      requestInfo.clientId,
      requestInfo,
      existingRooms,
      clients
    );
    forwardMessage(
      "turn",
      "turn",
      requestInfo.clientId,
      requestInfo,
      existingRooms,
      clients
    );
    forwardMessage(
      "end-game",
      "end-game",
      requestInfo.clientId,
      requestInfo,
      existingRooms,
      clients
    );
    forwardMessage(
      "wind",
      "opponent-win",
      requestInfo.clientId,
      requestInfo,
      existingRooms,
      clients
    );

    sendJoinNotification(requestInfo, clients, existingRooms);
  });

  //generate a new clientId
  const clientId = guid();
  clients[clientId] = {
    connection: connection,
    clientId,
  };

  const payload = {
    method: "connect",
    clientId: clientId,
  };
  //send back the client connect
  connection.send(JSON.stringify(payload));
});
