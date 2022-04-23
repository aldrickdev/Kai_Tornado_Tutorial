console.log("Hello World")

// Create the websocket connection
let ws = new WebSocket(`ws://${location.host}/ws`);

// Function that defines what happens when the connection is opened
ws.onopen = function () {
  // Send a message to the server
  ws.send("Hello From Client");
};

// Function that defines what happens when a message is recieved 
ws.onmessage = function (event) {
  // Save the data that was received
  received = JSON.parse(event.data)
  
  // console logs the received message
  console.log(`Client has received: ${received}`)
};

// Function that defines what happens when the connection is closed
ws.onclose = function () {
  // console logs that the connection has been closed
  console.log('Connection to Backend Lost');
};
