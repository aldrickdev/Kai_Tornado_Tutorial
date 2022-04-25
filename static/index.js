// Create the websocket connection
let ws = new WebSocket(`ws://${location.host}/ws`);

// Function that defines what happens when the connection is opened
ws.onopen = function () {
  // Logs that we have connected to the server via websockets
  console.log("Connected to Server");
  // Send a message to the server
  ws.send("Hello Sever");
};

// Function that defines what happens when a message is recieved 
ws.onmessage = function (event) {
  // Save the data that was received
  let received = event.data;
  
  // Logs the received message
  console.log(`Message from Server: ${received}`);
};

// Function that defines what happens when the connection is closed
ws.onclose = function () {
  // Logs that the connection has been closed
  console.log('Connection to Backend Lost');
};
