# Displaying Data in the Frontend

In the last section we worked on setting up our first websocket connection 
between our frontend and backend. 

In this section we will be have the frontend request data from the backend so 
that it can display the data to users. 

<hr>

## Interacting with the HTML using Javascript

First thing we need to do to update the elements in our HTML, is to get a 
javascript representation of the element, this allows you to apply changes to 
the elements using javascript.  

``` javascript
// Grab the element with the id "test"
let element = document.querySelector("#test");

// Grab the element with the class "program"
let prg = document.querySelector(".program");
```

Notice, to grab an element with a specific id, you use `#` and `.` for a 
specific class. 

<hr>

Below is how I grab and organize all of the elements I will need to interact 
with.  

``` javascript
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
```

<hr>

You can see above, I created an object called `app_elements` where I can 
access all of the elements the inputs and outputs in this project.  

Lets say we would like to change the status to display "Testing", you would do 
the follow:  

``` javascript
app_elements.status.innerHTML = "Testing";
```

The status would now look like:

![HTML Sensor Data 2022-04-30 at 16 08 14](https://user-images.githubusercontent.com/75044812/166122186-5df48808-106f-46db-a836-3e07fb7fbc45.jpg)

To read in data, it is very similar. Lets type in a value in the Humidity 
input and the console log it.

``` javascript
// grab the value 
let hum_alarm_value = app_elements.alarm_section.current_alarm.Hum.innerHTML;

// console log the value
console.log(hum_alarm_value);
```

First we grab the `innerHTML` displayed here:

![hum_alarm](https://user-images.githubusercontent.com/75044812/166123532-b64426a7-1535-4ff6-bc2f-50bd6301eb00.jpg)

and then console log it here:

![hum_alarm_cl](https://user-images.githubusercontent.com/75044812/166123557-8262e7cb-f8ee-40d4-99df-86b54d75e7ec.jpg)

 <hr>

## The buttons Don't Work

If you have clicked the buttons, you probably have noticed that nothing 
happens, lets change that. Lets make the `1 Random Value` button console log 
`"Hello"` when it is clicked.

Open the `index.html` and we will need to add an event to the button. Below 
you can see that I added an `onclick` attribute with the value `random1()`.

``` html
<button id="random1" onclick="random1()">1 Random Value</button>
```

Then we need to go to our `index.js` and create that `random1` function that 
the button will run when it is clicked on.

``` javascript
function random1() {
  console.log("Hello");
}
```

Above you can see that we are just console logging `"Hello"`. Now you can run 
the server and click on `random1` and you will see `Hello` in the console.

![random1_hello](https://user-images.githubusercontent.com/75044812/166174352-05e838a8-7df3-4bf2-bdb2-8fb8e08a8719.jpg)

## Setting an alarm

Now that we can add functions to our buttons, lets work on setting our current 
alarm values. 

![alarm](https://user-images.githubusercontent.com/75044812/166175642-289b3208-913e-47ea-9cfb-fb7ca87cea38.jpg)

Above you can see we have 2 text inputs and a button on the right, and then the 
values for the currently selected alarm thresholds, which are currently showing 
50 for humidity and 100 for temperature. We will make the `Set Alarm` button 
take the values you enter in the input fields and then displays them in place 
of default, 50 and 100.

Lets head to the `index.html` and add the `onclick` attribute on the 
`Set Alarm` button. The button will now look like:

``` html
<button id="set-alarm-button" onclick="set_alarm()">Set Alarm</button>
```

Now lets go to the `index.js` and create the function.

``` javascript
function set_alarm() {
  // Section1: Grabs the values that we entered for the humidity and temperature 
  let new_hum = app_elements.alarm_section.input_alarm.Hum.value;
  let new_temp = app_elements.alarm_section.input_alarm.Temp.value;

  // Section 2: Sets the current alarm thresholds to the entered value
  app_elements.alarm_section.current_alarm.Hum.innerHTML = new_hum;
  app_elements.alarm_section.current_alarm.Temp.innerHTML = new_temp;

  // Section 3: Clearing the inputs
  app_elements.alarm_section.input_alarm.Hum.value = "";
  app_elements.alarm_section.input_alarm.Temp.value = "";
}
```

You can see in the function that it has 3 sections:

- `Section 1:` Here we just save the currently entered values to variables
- `Section 2:` Here we take the variables created in Section 1 and display 
    under the `Current Alarm Values` location
- `Section 3:` Lastly we clear the values that were entered

Once the change above have been done you can try the button out. Below is the 
behavior you should be expecting.

![set_alarm](https://user-images.githubusercontent.com/75044812/167275012-558478dc-de3e-46ef-9c37-fa83e4531289.gif)

<hr>

## Generate a Random Value

In this section we will make the `1 Random Value` button get a button from the 
backend and then display it on the `Last 10 Values` section on the top left.

Below are the steps that we need to take to do this.

1. Clear the default values in the sections `Last 10 Values` and 
`Stats on the last 10 values`
2. Make the `1 Random Value` button ask the backend for a humidity and 
temperature value
3. Receive the value from the backend and then display it in the `Current 
Sensor Values`

When we first start the project and open it on our browser we have 50 and 100 
being displayed for whole `Lat 10 values` section. We should empty that out 
as displaying this isn't accurate. To do this we can just use a loop that will 
go to each row and enter in an empty string.

``` javascript
// ===== Clear the Last 10 values Section =====
for (let i = 0; i < 10; i++) {
  app_elements.latest_values_section.Hum[i].innerHTML = "";
  app_elements.latest_values_section.Temp[i].innerHTML = "";
}
```

I simply added the loop above to the bottom of the `index.js` file. You can 
see that this is simple for loop that just clears the Humidity and Temperature 
in each row. 

Next we clear the values in the `Stats on the last 10 values` 
Section.

``` javascript
// ===== Clear the Stats Section =====
// === Average Section ===
app_elements.statistics_section.Avg.Hum.innerHTML = "";
app_elements.statistics_section.Avg.Temp.innerHTML = "";

// === Max Section ===
app_elements.statistics_section.Max.Hum.innerHTML = "";
app_elements.statistics_section.Max.Temp.innerHTML = "";

// === Min Section ===
app_elements.statistics_section.Min.Hum.innerHTML = "";
app_elements.statistics_section.Min.Temp.innerHTML = "";
// =====
```

Here I just go through each of the stats and clear the value for the Humidity 
and the Termperature. This can also be added to the bottom of the `index.js` 
file.

<hr>

Now we need the `1 Random Value` button to send a websocket message to the 
backend asking it to send over a value for the Humidity and Temperature.

First lets assign a function to the `onclick` attribute of the 
`1 Random Value` button. 

``` html
<button id="random1" onclick="random1()">1 Random Value</button>
```

Now we need to create this funtion in the `index.js`.

``` javascript
// Section 1:
// === Creates a structure for what a websocket message should look like
let message = {
  packet: '',
  data: {},
};

// Section 2:
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
```

Above you can see that I created 2 sections, section 1 is where I created the 
structure of how our websocket messages. The structure is called `message` and 
it has 2 parts, the `packet` which is where we would put the title, 
essentially what the packet is for and `data` which is where you would put the 
data thats being sent.

In section 2, we have the function that will run when the `1 Random Value` 
button is clicked. you can see that we first fill out the message information 
`packet` and `data`, note how data is empty as we don't need to send and data 
to the backend here. Then we convert that message structure into a string 
with `JSON.stringify`. This needs to happen because when cannot send the 
message structure as is through a websocket. After converting the message to 
a string we send the message to the backend with `ws.send`.

Last thing to do is to not send anything to the backend when the connection 
opens as this isn't needed anymore.

``` javascript
// === Defines what happens when the connection is opened ===
ws.onopen = function () {
  // Logs that we have connected to the server via websockets
  console.log("Connected to Server");
};
```

<hr>

Now that we can send a packet to the backend, let's tell the backend what to 
do when it receives this packet. 

``` python
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
            "packet": "1 Random Value",
            "data": 10
        }
        
        # stringify the message
        stringified_message = json.dumps(message)
        
        # send message to frontend
        self.write_message(stringified_message)
```

So in the code above you can see that I update the `on_message` function. 
Below I'll go through the stuff I've added:

Since the frontend needs to sent the message as a string, we need to turn it 
back into an object we can work with. 

``` python
# de-stringify the message
json_message = json.loads(message)
```

Now that the message is in the form of an object we can check what the packet 
is so we can decide what we need to do next. Below you can see we check if the 
packet has the value of `1 Random Value` then we create a message dictionary 
with the value we want to send to the frontend in the `data` in this case we 
are just sending the value of 10. Lastly we stringify the message then send it.

``` python
# check what is the packet is about
if (json_message["packet"] == "1 Random Value"):
    # packet is asking for 1 random value to be sent to the frontend
    
    # creates the message to send
    message = {
        "packet": "1 Random Value",
        "data": 10
    }
    
    # stringify the message
    stringified_message = json.dumps(message)
    
    # send message to frontend
    self.write_message(stringified_message)
```

<hr>

The backend is now sending the value to the frontend. Looking at the 
`onmessage` function in the `index.js`, it looks like the message the frontend 
receives will just be printed to the console. 

``` javascript
// === Defines what happens when a message is recieved ===
ws.onmessage = function (event) {
  // Save the data that was received
  received = event.data;

  // Logs the received message
  console.log(`Message from Server: ${received}`);
};
```

Let's run the server and press the `1 Random Value` button and look at the 
console.

![data_to_frontend](https://user-images.githubusercontent.com/75044812/167973130-cd64f32a-dad5-4128-9ae7-cbefcf378f21.gif)

Here you can see that when I click on the `1 Random Value` button, the backend
 sends a packet to the frontend with the value of 10 as data. The frontend then
 prints that data to to console.

<hr>

In this section we learned how to send packets between the frontend and 
backend. In the next section we will expand on this by generating the proper 
humidity and temperature values so that we can send those to the frontend and 
then displaying the results.

[Back to Beginning](/README.md) | 
[Prev: *Websockets*](/docs/markdown/06_websockets.md) | 
[Next: *Generating Humidity and Temperature Values*](/docs/markdown/08_generating_values.md)