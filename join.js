const joinMe = (client, existingRooms, currentRoom) => {
  const { clientId, name } = client;
  if (currentRoom === "") {
    // then create a room and put the player1 info in it
    existingRooms[clientId] = {};
    existingRooms[clientId].player1 = {
      clientId,
      name,
    };
    return "player1";
  }

  if (currentRoom !== "" && currentRoom !== clientId) {
    existingRooms[currentRoom].player2 = {
      clientId: clientId,
      name,
      partnerClientId: currentRoom,
    };
    existingRooms[currentRoom].player1.partnerClientId = clientId;
    return "player2";
  }
};
module.exports = joinMe;
