const getPartner = (existingRooms, clientId) => {
  console.log(clientId, existingRooms, "from client id and existing rooms");
  if (existingRooms[clientId]) {
    return existingRooms[clientId].player2;
  }
  for (let i in existingRooms) {
    if (existingRooms[i].player2.clientId === clientId)
      return existingRooms[i].player1;
  }
};

module.exports = getPartner;
