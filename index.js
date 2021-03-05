const WebSocket = require("ws");
const port = 3000;
const wss = new WebSocket.Server({ port: port });

console.log(`[WebSocket] Starting WebSocket server on localhost:${port}`);

wss.on("connection", (ws, request) => {
  const clientIp = request.socket.remoteAddress;
  console.log(`[WebSocket] Client with IP ${clientIp} has connected`);

  ws.on("message", (message) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
    console.log(`[WebSocket] Message ${message} was received`);
  });
});