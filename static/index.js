// Application Elements
let app_elements = {
  // Section for displaying the latest values
  latest_values_section: {
    // Array holding the latest humidity values
    Hum: [
      document.querySelector('#hd1'),
      document.querySelector('#hd2'),
      document.querySelector('#hd3'),
      document.querySelector('#hd4'),
      document.querySelector('#hd5'),
      document.querySelector('#hd6'),
      document.querySelector('#hd7'),
      document.querySelector('#hd8'),
      document.querySelector('#hd9'),
      document.querySelector('#hd10'),
    ],
    // Array holding the latest temperature values
    Temp: [
      document.querySelector('#td1'),
      document.querySelector('#td2'),
      document.querySelector('#td3'),
      document.querySelector('#td4'),
      document.querySelector('#td5'),
      document.querySelector('#td6'),
      document.querySelector('#td7'),
      document.querySelector('#td8'),
      document.querySelector('#td9'),
      document.querySelector('#td10'),
    ],
  },

  // Section for displaying the statistics values
  statistics_section: {
    // Elements for displaying the average values for the humidity and temperature
    Avg: {
      Hum: document.querySelector('#avg-hd'),
      Temp: document.querySelector('#avg-td'),
    },

    // Elements for displaying the maximum values for the humidity and temperature
    Max: {
      Hum: document.querySelector('#max-hd'),
      Temp: document.querySelector('#max-td'),
    },

    // Elements for displaying the minimum values for the humidity and temperature
    Min: {
      Hum: document.querySelector('#min-hd'),
      Temp: document.querySelector('#min-td'),
    },
  },

  // Used to display the status
  status: document.querySelector('#status-message'),

  // Section for recieving and displaying alarm values
  alarm_section: {
    // Elements to display the current alarm thresholds for the humidity and temperature
    current_alarm: {
      Hum: document.querySelector('#current-alarm-h'),
      Temp: document.querySelector('#current-alarm-t'),
    },
    // Elements to recieve the desired alarm thresholds for the humidity and temperature
    input_alarm: {
      Hum: document.querySelector('#input-h'),
      Temp: document.querySelector('#input-t'),
    },
    // Button to set the alarm thresholds
    set_alarm_button: document.querySelector('#set-alarm-button'),
  },

  // Section for all inputs
  input_sensor_section: {
    // Elements to type in the humidity and temperature values
    current: {
      Hum: document.querySelector('#current-sensor-h'),
      Temp: document.querySelector('#current-sensor-t'),
    },
    // Buttons to generate data 
    button: {
      Random1: document.querySelector('#random1'),
      Random10: document.querySelector('#random0'),
    },
  },
};

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

app_elements.status.innerHTML = "Testing";

let hum_alarm_value = app_elements.alarm_section.current_alarm.Hum.innerHTML;
console.log(hum_alarm_value);

function random1() {
  console.log("Hello");
}
