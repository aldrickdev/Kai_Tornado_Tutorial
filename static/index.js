// ===== Application Elements =====
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
// ===== End Appication Elements

// ===== Global State =====
let value_count = 0;
// ===== End Global State

// ===== Helper Functions =====
function two_decimals(num) {
  // Convert string to number
  let value = Number(num);
  
  // Rounds to the nearest hundreth
  let rounded_value = value.toFixed(2);
  
  return rounded_value;
}

function calculate_avg() {
  // Holds sum
  let hum_sum  = 0;
  let temp_sum = 0;

  // Holds averages
  let hum_avg  = 0;
  let temp_avg = 0;

  // Holds string representation of the average
  let s_hum_avg  = "";
  let s_temp_avg = "";

  // Calculates sum
  for (let i = 0; i < value_count; i++) {
    hum_sum  += Number(app_elements.latest_values_section.Hum[i].innerHTML)
    temp_sum += Number(app_elements.latest_values_section.Temp[i].innerHTML)
  }

  // Calculates average
  hum_avg  = two_decimals(hum_sum / value_count);
  temp_avg = two_decimals(temp_sum / value_count);

  // Covert average to string
  s_hum_avg  = hum_avg.toString()
  s_temp_avg = temp_avg.toString()

  // Display the calculated averages
  app_elements.statistics_section.Avg.Hum.innerHTML  = s_hum_avg
  app_elements.statistics_section.Avg.Temp.innerHTML = s_temp_avg
}
// ===== End Helper Functions

// ===== Websocket Section =====
// === Creates a structure for what a websocket message should look like
let message = {
  packet: '',
  data: {},
};

// === Creates the websocket connection
let ws = new WebSocket(`ws://${location.host}/ws`);

// === Defines what happens when the connection is opened ===
ws.onopen = function () {
  // Logs that we have connected to the server via websockets
  console.log("Connected to Server");
};

// === Defines what happens when a message is recieved ===
ws.onmessage = function (event) {
  // Save the data that was received
  let received = event.data;

  // Logs the received message
  console.log(`Message from Server: ${received}`);

  // de-stringify the packet received 
  let received_obj = JSON.parse(received);

  // Extract the humidity and temperature values from the packet
  let long_hum_value = received_obj.data[0];
  let long_temp_value = received_obj.data[1];

  // Round to the nearest hundreth
  let short_hum_value = two_decimals(long_hum_value);
  let short_temp_value = two_decimals(long_temp_value);

  // Pushes the previous values down 
  for (let i = app_elements.latest_values_section.Hum.length - 1; i > 0; i--){
    app_elements.latest_values_section.Hum[i].innerHTML = app_elements.latest_values_section.Hum[i-1].innerHTML;
    app_elements.latest_values_section.Temp[i].innerHTML = app_elements.latest_values_section.Temp[i-1].innerHTML;
  }

  // Display the humidity and temperature values in the first entry
  app_elements.latest_values_section.Hum[0].innerHTML = short_hum_value;
  app_elements.latest_values_section.Temp[0].innerHTML = short_temp_value;

  // Count of how many generated values are being displayed, used to calculate 
  // the average
  if (value_count < app_elements.latest_values_section.Hum.length) {
    value_count++;
  }

  calculate_avg();
};

// === Defines what happens when the connection is closed ===
ws.onclose = function () {
  // Logs that the connection has been closed
  console.log('Connection to Backend Lost');
};

// === Ask backend for 1 Random Value ===
function random1() {
  // Creates the message that we will send to the backend
  message.packet = "1 Random Value";
  message.data = "";

  // Stringify the message
  var string_message = JSON.stringify(message)

  // Send the packet
  ws.send(string_message)
}
// ===== End Websocket Section

// ===== Function to set the alarm =====
function set_alarm() {
  // Grabs the values that we entered for the humidity and temperature 
  let new_hum = app_elements.alarm_section.input_alarm.Hum.value;
  let new_temp = app_elements.alarm_section.input_alarm.Temp.value;

  // Sets the current alarm thresholds to the entered value
  app_elements.alarm_section.current_alarm.Hum.innerHTML = new_hum;
  app_elements.alarm_section.current_alarm.Temp.innerHTML = new_temp;

  // Clearing the inputs
  app_elements.alarm_section.input_alarm.Hum.value = "";
  app_elements.alarm_section.input_alarm.Temp.value = "";
}
// =====

// ===== Clear the Last 10 values Section =====
for (let i = 0; i < 10; i++) {
  app_elements.latest_values_section.Hum[i].innerHTML = "";
  app_elements.latest_values_section.Temp[i].innerHTML = "";
}
// =====

// ===== Clear the Stats Section =====
// === Average Section ===
app_elements.statistics_section.Avg.Hum.innerHTML = "0";
app_elements.statistics_section.Avg.Temp.innerHTML = "0";

// === Max Section ===
app_elements.statistics_section.Max.Hum.innerHTML = "0";
app_elements.statistics_section.Max.Temp.innerHTML = "0";

// === Min Section ===
app_elements.statistics_section.Min.Hum.innerHTML = "0";
app_elements.statistics_section.Min.Temp.innerHTML = "0";
// =====
