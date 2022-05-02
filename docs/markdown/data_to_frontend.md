# Displaying Data in the Frontend

In the last section we worked on setting up our first websocket connection between our frontend and backend. 

In this section we will be have the frontend request data from the backend so that it can display the data to users. 

<hr>

## Interacting with the HTML using Javascript

First thing we need to do to update the elements in our HTML, is to get a javascript representation of the element, this allows you to apply changes to the elements using javascript.  

``` javascript
// Grab the element with the id "test"
let element = document.querySelector("#test");

// Grab the element with the class "program"
let prg = document.querySelector(".program");
```

Notice, to grab an element with a specific id, you use `#` and `.` for a specific class. 

<hr>

Below is how I grab and organize all of the elements I will need to interact with.  

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

You can see above, I created an object called `app_elements` where I can access all of the elements the inputs and outputs in this project.  

Lets say we would like to change the status to display "Testing", you would do the follow:  

``` javascript
app_elements.status.innerHTML = "Testing";
```

The status would now look like:

![HTML Sensor Data 2022-04-30 at 16 08 14](https://user-images.githubusercontent.com/75044812/166122186-5df48808-106f-46db-a836-3e07fb7fbc45.jpg)

To read in data, it is very similar. Lets type in a value in the Humidity input and the console log it.

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

If you have clicked the buttons, you probably have noticed that nothing happens, lets change that. Lets make the `1 Random Value` button console log `"Hello"` when it is clicked.

Open the `index.html` and we will need to add an event to the button. Below you can see that I added an `onclick` attribute with the value `random1()`.

``` html
<button id="random1" onclick="random1()">1 Random Value</button>
```

Then we need to go to our `index.js` and create that `random1` function that the button will run when it is clicked on.

``` javascript
function random1() {
  console.log("Hello");
}
```

Above you can see that we are just console logging `"Hello"`. Now you can run the server and click on `random1` and you will see `Hello` in the console.

![random1_hello](https://user-images.githubusercontent.com/75044812/166174352-05e838a8-7df3-4bf2-bdb2-8fb8e08a8719.jpg)

[Back to Beginning](/README.md) | [Prev: *Websockets*](/docs/markdown/complete_styling.md) | [Next: *Coming Soon*](/docs/markdown)