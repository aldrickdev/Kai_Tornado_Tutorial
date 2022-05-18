# Code Base

## Project Structure

Below is the folder structure of the project, note that the directory `virt` 
has many files in it that are auto generated when we create a virtual 
environment. 

``` bash
Tornado_Project  
├── main.py  
├── psuedoSensor.py  
├── requirements.txt  
├── templates  
    └── index.html  
├── static  
    ├── index.css  
    └── index.js  
└── virt  
    └── ...
```

## [Tornado_Project/main.py](/main.py)

``` python
# imports needed for tornado
from tornado import web
from tornado import ioloop
from tornado import websocket

from pathlib import Path
import os
import json
import threading
from time import sleep
from datetime import datetime

from psuedoSensor import PsuedoSensor

# array to store all of the generated data that was sent to the frontend
data = []

# function that will return the created server
def create_server():
    # list of all of the handlers
    handlers = [
            (r"/", MainHandler), 
            (r"/ws", WebSocketHandler)
        ]
    # Dictionary listing some settings, specifically the location of the template and static files are located
    settings = {
        "template_path" : Path(__file__).parent / "templates",
        "static_path" : Path(__file__).parent / "static"
    }
    # returns the server
    return web.Application(handlers, **settings)


# function to store the generated data into an array
def store_data(hum_temp_values):
    # get the current time
    now = datetime.now()
    
    # format the time how I need to store it
    formatted_now = f"{now.month}-{now.day}-{now.year} {now.hour}:{now.minute}:{now.second}"
    
    # create the data point
    data_point = {
        "data": hum_temp_values,
        "datetime": formatted_now
    }
    
    # insert the data point into the dictionary
    data.append(data_point)
    
    # prints the currently stored values
    for dp in data:
        print(dp)
        
    print()

# Creating a handler for the path '/'
class MainHandler(web.RequestHandler):
    # Creating function to handle the GET request type
    def get(self):
        # Render index.html
        self.render("index.html")


# Creating a websocket handler
class WebSocketHandler(websocket.WebSocketHandler):
    # Create an instance of the PsuedoSensor class
    ps = PsuedoSensor()
    
    # Function that runs when a connection has been established
    def open(self):
        # Sends message to the client connected
        # self.write_message("Connection Open")
        print("Connected to Client")
        self.write_message("Hello Client")

    # Function that runs when we receive a message
    def on_message(self, message):
        # Prints the message received
        print(f"Message from Client: {message}")
        
        # de-stringify the message
        json_message = json.loads(message)
        
        # check what is the packet is about
        if (json_message["packet"] == "1 Random Value"):
            # packet is asking for 1 random value to be sent to the frontend
            
            # creates the message to send
            message = {
                "packet": "",
                "data": self.ps.generate_values()
            }
            
            # stringify the message
            stringified_message = json.dumps(message)
            
            # send message to frontend
            self.write_message(stringified_message)
            
            # store the data
            store_data(message["data"])
    
        elif (json_message["packet"] == "10 Random Values"):
            # Start a thread with the purpose of just generating 10 values
            threading.Thread(target = self.random10()).start()
        
    # Function that runs when the connection closes
    def on_close(self):
        # prints Connecton Closed
        print("Connection Closed")
       
    # Function to generate 10 values
    def random10(self):
        for _ in range(10):
            # creates the message to send
            message = {
                "packet": "",
                "data": self.ps.generate_values()
            }
            
            # stringify the message
            stringified_message = json.dumps(message)
            
            # send message to frontend
            self.write_message(stringified_message)
            
            # store the data
            store_data(message["data"])
            
            # adds a 1 second delay
            sleep(1)
           
      

# Entrypoint
if __name__ == '__main__':
    # Creates server and assigns it to the server variable 
    server = create_server()
    
    # Tells the server to listen to port 8888
    server.listen(8888)
    print("Server Running")
    
    # Starts the server in an event loop
    ioloop.IOLoop.current().start()

```

## [Tornado_Project/psuedoSensor.py](/psuedoSensor.py)

``` python
from random import uniform
from typing import Tuple

# Class that will be used to generate values for humidity and temperature
class PsuedoSensor:
  
  # The base values that will be used to generate a random value
  h_range = [0, 20, 20, 40, 40, 60, 60, 80, 80, 90, 70, 70, 50, 50, 30, 30, 10, 10]
  t_range = [-20, -10, 0, 10, 30, 50, 70, 80, 90, 80, 60, 40, 20, 10, 0, -10]

  # The index we are going to start, this will track what base value we are 
  # going to be using
  h_range_index = 0
  t_range_index = 0

  # Initializing the humidity and temperature values
  humVal = 0
  tempVal = 0

  # Initialization method for the class
  def __init__(self) -> None:
    
    # Gets the initial humidity and temperature values
    self.humVal = self.h_range[self.h_range_index]
    self.tempVal = self.t_range[self.t_range_index]

  # Method responsible for generating and returning a tuple with the humidity 
  # and temperature values 
  def generate_values(self) -> Tuple[float, float]:
    
    # Generate a new humidity and temperature by grabbing the base value and 
    # adding a random value between 0 and 10 
    self.humVal = self.h_range[self.h_range_index] + uniform(0, 10);
    self.tempVal = self.t_range[self.t_range_index] + uniform(0, 10);

    # Increment the humidity index so that next time we generate a value, we 
    # get a new base value 
    self.h_range_index += 1

    # If the humidity index gets large than the size of our range, then start 
    # again from 0
    if self.h_range_index > len(self.h_range) - 1:
      self.h_range_index = 0

    # Increment the temperature index so that next time we generate a value, we 
    # get a new base value 
    self.t_range_index += 1

    # If the temperature index gets large than the size of our range, then 
    # start again from 0
    if self.t_range_index > len(self.t_range) - 1:
      self.t_range_index = 0

    # Returns the newly generated humidity and temperature values
    return self.humVal, self.tempVal
```

## [Tornado_Project/requirements.txt](/requirements.txt)

``` bash
tornado==6.1
```

## [Tornado_Project/templates/index.html](/templates/index.html)

``` html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>HTML Sensor Data</title>
    <link rel="stylesheet" href="static/index.css">
  </head>
  <body>
    <div class="App">
      <div id="latest-values_container">
        <p class="panel-title">Last 10 values</p>
        <section class="content-panel border">
          <table>
            <thead>
              <tr>
                <th>Humidity (%)</th>
                <th>Temperature (F)</th>
              </tr>
            </thead>
            <tbody class="latest-values-table">
              <tr>
                <td id="hd1">50</td>
                <td id="td1">100</td>
              </tr>
              <tr>
                <td id="hd2">50</td>
                <td id="td2">100</td>
              </tr>
              <tr>
                <td id="hd3">50</td>
                <td id="td3">100</td>
              </tr>
              <tr>
                <td id="hd4">50</td>
                <td id="td4">100</td>
              </tr>
              <tr>
                <td id="hd5">50</td>
                <td id="td5">100</td>
              </tr>
              <tr>
                <td id="hd6">50</td>
                <td id="td6">100</td>
              </tr>
              <tr>
                <td id="hd7">50</td>
                <td id="td7">100</td>
              </tr>
              <tr>
                <td id="hd8">50</td>
                <td id="td8">100</td>
              </tr>
              <tr>
                <td id="hd9">50</td>
                <td id="td9">100</td>
              </tr>
              <tr>
                <td id="hd10">50</td>
                <td id="td10">100</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
      <div id="statistics_container">
        <div class="vertical-center">
          <p class="panel-title">Stats on the last 10 values</p>
          <section class="content-panel border">
            <section id="statistic-table-title" class="margin-top">
              <div>Avg</div>
              <div>Max</div>
              <div>Min</div>
            </section>
            <section id="statistic-table">
              <table>
                <thead>
                  <tr>
                    <th>Humidity (%)</th>
                    <th>Temperature (F)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td id="avg-hd">0</td>
                    <td id="avg-td">0</td>
                  </tr>
                  <tr>
                    <td id="max-hd">0</td>
                    <td id="max-td">0</td>
                  </tr>
                  <tr>
                    <td id="min-hd">0</td>
                    <td id="min-td">0</td>
                  </tr>
                </tbody>
              </table>
            </section>
          </section>
        </div>
      </div>
      <div id="status_container">
        <div>
          <p class="panel-title">Status</p>
          <p id="status-message" class="border">Placeholder</p>
        </div>
      </div>
      <div id="alarm_container" class="border">
        <div id="current-alarm_container">
          <p>Current Alarm Values</p>
          <table>
            <thead>
              <tr>
                <th>Humidity (%)</th>
                <th>Temperature (F)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td id="current-alarm-h">50</td>
                <td id="current-alarm-t">100</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="set-alarm_container">
          <div id="humidity-alarm-input">
            <p>Humidity <input id="input-h" type="text" />%</p>
          </div>
          <div id="temperature-alarm-input">
            <p>Temperature <input id="input-t" type="text" />F</p>
          </div>
          <button id="set-alarm-button" onclick="set_alarm()">Set Alarm</button>
        </div>
      </div>
      <div id="input_container" class="border">
        <div id="current-input-value_container">
          <p id="current-sensor-title">Current Sensor Values</p>
          <p id="sensor-title-h">
            Humidity <span id="current-sensor-h">Null</span>%
          </p>
          <p id="sensor-title-t">
            Temperature <span id="current-sensor-t"></span>F
          </p>
        </div>
        <div id="input-button_container">
          <button id="random1" onclick="random1()">1 Random Value</button>
          <button id="random10" onclick="random10()">10 Random Values</button>
        </div>
      </div>
    </div>
  </body>
  <script src="static/index.js"></script>
</html>
```

## [Tornado_Project/static/index.css](/static/index.css)

``` css
/* Zero out the margins and padding so that we can start from a clean slate. */
* {
  margin: 0px;
  padding: 0px;
}

/* This will target the body element */
body {
  /* Sets the documents font to system_ui */
  font-family: system-ui;

  /* Sets the height to 100% of the height of the browser */
  height: 100vh;

  /* Sets the display mode to flex, allowing you to put components side by side */
  display: flex;

  /* Aligns the elements inside of the body in the center of the browser */
  justify-content: center;
  align-items: center;
}

/* This will target elements with the class of App */
.App {
  /* This will set the background color */
  background: rgb(178, 190, 181);

  /* Creates a border of a solid black line with a width of 2px, then gives corners
  a radius of 5px */
  border: solid black 2px;
  border-radius: 5px;

  /* Sets the width to 35 character widths */
  width: 35em;

  /* Sets the display mode to grid, then creates 2 columns with equal widths */
  display: grid;
  grid-template-columns: 1fr 1fr;
}

/* Selects any element with the class border */
.border {
  /* Creates a border of a solid black line with a width of 2px, then gives corners
  a radius of 5px */
  border: solid black 2px;
  border-radius: 5px;
}

/* Selects all button elements */
button {
  /* Adds the top and bottom padding to 0.5 the width of a character and the 
  left and right to 3 times the width of a character */
  padding: 0.5em 3em;

  /* Sets the font size to 16px */
  font-size: 16px;

  /* Sets the radius of the button to 5px */
  border-radius: 5px;
}

/* Selects all input elements */
input {
  /* Sets the width to 50px */
  width: 50px;

  /* Sets the margin of the right to the size of 1 character width */
  margin-right: 1em;

  /* Sets the radius of the input to 5px */
  border-radius: 5px;
}

/* Selects all elements with the class panel-title */
.panel-title {
  /* Sets the font size to small */
  font-size: small;
}

/* Selects all elements with the id of latest-values_container */
#latest-values_container {
  /* Sets the width and height to 15 character widths */
  width: 15em;
  height: 15em;

  /* Sets the margin to auto allowing the browser to set the left and right 
  margins to equal values */
  margin: auto;
}

/* Selects all the section elements that are inside of an element with the id
of latest-values_container */
#latest-values_container > section {
  /* Sets the height to 13.75 of a character width */
  height: 13.75em;

  /* Centers the text */
  text-align: center;
}

/* Selects element with class latest-values-table */
.latest-values-table {
  font-size: 15px;
}

/* Selects all elements with the id of statistics_container */
#statistics_container {
  /* Sets the width to 17.25 character widths and the height to 12.75 character
   widths */
  width: 17.25em;
  height: 12.75em;

  /* Sets the margin to auto allowing the browser to set the left and right 
  margins to equal values */
  margin: auto;

  /* Sets the margin to a character width */
  margin-right: 1em;

  /* Sets the position to relative so that you can position it relative to its 
  normal position */
  position: relative;
}

/* Selects all sections the are inside of elements with a class 
vertical-center inside elements with the id of statistics_container */
#statistics_container > .vertical-center > section {
  /* Centers the text */
  text-align: center;
}

/* Selects all sections that are inside a div, inside an element with the id
of statistics_container */
#statistics_container > div > section {
  /* Sets the height to 16.75 of a characters width */
  height: 16.75em;
}

/* Selects elements with the id of statistic-table-title */
#statistic-table-title {
  /* Sets the display mode to flex, allowing you to put components side by side */
  display: flex;

  /* Sets the direction of the content to be vertical */
  flex-direction: column;

  /* Sets the margins around the children to be equal */
  justify-content: space-around;
}

#statistic-table {
  /* Sets the display mode to flex, allowing you to put components side by side */
  display: flex;
}

/* Selects the elements with the class content-panel that is a child of elements
with the class name vertical-center that is a child of an element with the 
id of statistics_container */
#statistics_container > .vertical-center > .content-panel {
  /* Sets the font size to small */
  font-size: small;
}

/* Selects element with class vertical-center */
.vertical-center {
  /* Sets all margins around this element to 0 */
  margin: 0;

  /* Vertically centers the element */
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

/* Selects element with the class content-panel that has a child with the class
vertical-center  */
.vertical-center > .content-panel {
  display: grid;
  grid-template-columns: 1fr 4fr;
  width: 21em;
}

/* Selects elements with class margin-top */
.margin-top {
  /* Sets the margin-top to 18px */
  margin-top: 18px;
}

/* Selects elements with the is of status_container  */
#status_container {
  /* Sets the size of the element to span over 2 columns */
  grid-column: 1/3;

  /* Sets the left and right margins to 1 character width */
  margin-left: 1em;
  margin-right: 1em;
}

/* Selects elements with the id status-message */
#status-message {
  /* Sets the padding to 0.5 character widths */
  padding: 0.5em;
  
  /* Centers the text */
  text-align: center;
}

/* Selects elements with the id alarm_container */
#alarm_container {
  /* Extends the width of the element to 2 columns */
  grid-column: 1/3;

  /* Sets the display to grid, with 2 equally sized columns */
  display: grid;
  grid-template-columns: 1fr 1fr;

  /* Sets the top, right and left margins to 1 character width and the bottom 
  to 0.5 character width */
  margin: 1em 1em 0.5em 1em;
}

/* Selects element with id current-alarm_container */
#current-alarm_container {
  /* Sets the margin to auto allowing the browser to set the left and right 
  margins to equal values */
  margin: auto;
}

/* Selects p elements inside of elements with the id current-alarm_container */
#current-alarm_container > p {
  /* Sets the bottom margin to 1 character width */
  margin-bottom: 1em;
}

/* Select elements with the id of set-alarm_container */
#set-alarm_container {
  /* Sets the margin to auto allowing the browser to set the left and right 
  margins to equal values */
  margin: auto;

  /* Sets the top and bottom margins to 0.5 character widths */
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

/* Select elements that have the id of input-h */
#input-h {
  /* Sets the left margin to 2 character widths */
  margin-left: 2em;
}

/* Select buttons the are child elements of elements with the id of 
set-alarm_container */
#set-alarm_container > button {
  /* Set the top margin to 8px */
  margin-top: 8px;
}

/* Select elements with the id input_container */
#input_container {
  /* Sets the size to 2 columns */
  grid-column: 1/3;
}

/* Select elements with the id of input_container */
#input_container {
  /* Sets the display mode to grid with equally sized columns */
  display: grid;
  grid-template-columns: 1fr 1fr;

  /* Sets the height to 8 character widths */
  height: 8em;

  /* Sets the top margin to 0.5 character widths, and the rest to 1 character 
  widths */
  margin: 0.5em 1em 1em 1em;
}

/* Select elements with the id of current-sensor-h and current-sensor-t */
#current-sensor-h,
#current-sensor-t {
  /* Creates a border of a solid black line with a width of 2px, then gives corners
  a radius of 5px */
  border: solid black 2px;
  border-radius: 5px;

  /* Sets the font size to small */
  font-size: small;

  /* Sets the top and bottom padding to 0 and the left and right to 0.5 
  character width */
  padding: 0em 0.5em;

  /* Sets the right margin to 1 character width */
  margin-right: 1em;
}
/* Select element with an id of current-sensor-h */
#current-sensor-h {
  /* Sets the left margin-left to 2 character width */
  margin-left: 2em;
}

/* Select element with the id of current-input-value_container or input-button=container that is a 
child of an element with the id of input_container */
#input_container > #current-input-value_container,
#input_container > #input-button_container {
  /* Sets the margin to auto allowing the browser to set the left and right 
  margins to equal values */
  margin: auto;
}

/* Select element with the id of random1 */
#random1 {
  /* Set top and bottom padding of 0.5 character width and the left and right 
  of 3.5 character width */
  padding: 0.5em 3.5em;

  /* Set the bottom margin to 0.5 character width */
  margin-bottom: 0.5em;
}

/* Select element with the id of random10 */
#random10 {
  /* Set top and bottom padding of 0.5 character width and the left and right 
  of 3 character width */
  padding: 0.5em 3em;

  /* Set the top margin to 0.5 character width */
  margin-top: 0.5em;
}

/* Select element to id current-sensor-title */
#current-sensor-title {
  /* Sets the bottom margin to 1 character width */
  margin-bottom: 1em;
}
```

## [Tornado_Project/static/index.js](/static/index.js)

``` javascript
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

// Calculates the Average
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
    hum_sum += Number(app_elements.latest_values_section.Hum[i].innerHTML);
    temp_sum += Number(app_elements.latest_values_section.Temp[i].innerHTML);
  }

  // Calculates average and rounds to the nearest hundreth
  hum_avg = two_decimals(hum_sum / value_count);
  temp_avg = two_decimals(temp_sum / value_count);

  // Covert number to string
  s_hum_avg = hum_avg.toString();
  s_temp_avg = temp_avg.toString();

  // Display the calculated averages
  app_elements.statistics_section.Avg.Hum.innerHTML = s_hum_avg;
  app_elements.statistics_section.Avg.Temp.innerHTML = s_temp_avg;
}

// Finds the Maximum
function get_max() {
  // Holds the max values, temp holding Number.NEGATIVE_INFINITY so that we can 
  // gurantee that the next number we compare it too will be greater
  let hum_max = Number.NEGATIVE_INFINITY;
  let temp_max = Number.NEGATIVE_INFINITY;

  // Loop through each displayed value
  for (let i = 0; i < value_count; i++) {
    // Get the displayed value
    let hum_value = Number(app_elements.latest_values_section.Hum[i].innerHTML)
    let temp_value = Number(app_elements.latest_values_section.Temp[i].innerHTML)

    // Compare the displayed value to the temporary max
    if (hum_value > hum_max) {
      // Sets the current value to the max
      hum_max = hum_value;
    }
    // Compare the displayed value to the temporary max
    if (temp_value > temp_max) {
      // Sets the current value to the max
      temp_max = temp_value;
    }
  }

  // Display the Max values
  app_elements.statistics_section.Max.Hum.innerHTML = hum_max.toString()
  app_elements.statistics_section.Max.Temp.innerHTML = temp_max.toString()
}

// Finds the Minimum
function get_min() {
  // Holds the min values, temp holding Number.POSITIVE_INFINITY so that we can 
  // gurantee that the next number we compare it too will be smaller
  let hum_min = Number.POSITIVE_INFINITY;
  let temp_min = Number.POSITIVE_INFINITY;

  // Loop through each displayed value
  for (let i = 0; i < value_count; i++) {
    // Get the displayed value
    let hum_value = Number(app_elements.latest_values_section.Hum[i].innerHTML)
    let temp_value = Number(app_elements.latest_values_section.Temp[i].innerHTML)

    // Compare the displayed value to the temporary min
    if (hum_value < hum_min) {
      // Sets the current value to the min
      hum_min = hum_value;
    }
    // Compare the displayed value to the temporary min
    if (temp_value < temp_min) {
      // Sets the current value to the min
      temp_min = temp_value;
    }
  }

  // Display the Min values
  app_elements.statistics_section.Min.Hum.innerHTML = hum_min.toString()
  app_elements.statistics_section.Min.Temp.innerHTML = temp_min.toString()
}

// Check Alarm Thresholds
function check_alarm_thresholds(hum, temp) {
  // Get the current threshold values
  let s_current_hum_threshold = app_elements.alarm_section.current_alarm.Hum.innerHTML;
  let s_current_temp_threshold = app_elements.alarm_section.current_alarm.Temp.innerHTML;

  // Convert the string representation of the thresholds to numbers
  let current_hum_threshold = Number(s_current_hum_threshold);
  let current_temp_threshold = Number(s_current_temp_threshold);

  // Compare the values to the currently generated values
  if (hum >= current_hum_threshold && temp >= current_temp_threshold) {
    app_elements.status.innerHTML = "Both Humidty and Temperature Alarms Triggered";
  }
  else if (hum >= current_hum_threshold) {
    app_elements.status.innerHTML = "Humidty Alarm has Triggered";
  }
  else if (temp >= current_temp_threshold) {
    app_elements.status.innerHTML = "Temperature Alarm has Triggered";
  }
  else {
    app_elements.status.innerHTML = "No Alarms have been Triggered";
  }
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

// === Defines what happens when a message is received ===
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

  // Display newly generated values
  app_elements.input_sensor_section.current.Hum.innerHTML = short_hum_value;
  app_elements.input_sensor_section.current.Temp.innerHTML = short_temp_value;

  // Check to see if the alarm should trigger
  check_alarm_thresholds(short_hum_value, short_temp_value);

  // Stats
  calculate_avg();
  get_max();
  get_min();
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

// === Ask backend for 10 Random Values
function random10() {
  // Creates the message that we will send to the backend
  message.packet = "10 Random Values";
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

// ===== Default Status =====
app_elements.status.innerHTML = "No Alarms have been Triggered";
// =====

// ===== Zero Out Current Value Display =====
app_elements.input_sensor_section.current.Hum.innerHTML = "0";
app_elements.input_sensor_section.current.Temp.innerHTML = "0";
// =====
```
