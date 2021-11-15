let currentRoom = "";
const joinMe = require("./join.js");

const sendJoinNotification = (requestInfo, clients, existingRooms) => {
  if (requestInfo.method === "join-me") {
    const client = clients[requestInfo.clientId];
    const player = joinMe(client, existingRooms, currentRoom, requestInfo.name);

    if (player === "player1") {
      currentRoom = requestInfo.clientId;
    }
    if (player === "player2") {
      // now notify the two players
      const { player1, player2 } = existingRooms[currentRoom];

      const player1Connection = clients[player1.clientId].connection;
      const player2Connection = clients[player2.clientId].connection;
      console.log(player1Connection.send, "from player conneection");
      console.log(existingRooms, "from existing rooms");
      player1Connection.send(
        JSON.stringify({
          method: "joined",
          payload: {
            partner: player2,
          },
        })
      );
      player2Connection.send(
        JSON.stringify({
          method: "joined",
          payload: {
            partner: player1,
          },
        })
      );
      currentRoom = "";
    }
  }
};

module.exports = sendJoinNotification;
