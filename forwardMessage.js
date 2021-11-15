const getPartner = require("./getPartener");
const forwardMessage = (
  messageEvent,
  receivedMessageEvent,
  clientId,
  requestInfo,
  existingRooms,
  clients
) => {
  if (requestInfo.method === messageEvent) {
    const partner = getPartner(existingRooms, clientId);
    const client = clients[partner.clientId];

    client.connection.send(
      JSON.stringify({
        method: receivedMessageEvent,
        payload: requestInfo.payload,
      })
    );
  }
};

module.exports = forwardMessage;
