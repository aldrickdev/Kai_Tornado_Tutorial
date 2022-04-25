# Websockets

Now that we have our frontend and our backend, lets work on having them communicate.  

## Adding Javascript

First thing we will do here is make sure that we successfully link a Javascript file to our HTML file.  

Open the `index.html` and right below the `body` element and this:  

``` html
    ....
  </body>
  <script src="static/index.js"></script>
</html>
```

And just for reference, here is the entire HTML just incase you don't know what I mean.  

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
                    <td id="avg-hd">50</td>
                    <td id="avg-td">100</td>
                  </tr>
                  <tr>
                    <td id="max-hd">50</td>
                    <td id="max-td">100</td>
                  </tr>
                  <tr>
                    <td id="min-hd">50</td>
                    <td id="min-td">100</td>
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
          <button id="set-alarm-button">Set Alarm</button>
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
          <button id="random1">1 Random Value</button>
          <button id="random10">10 Random Values</button>
        </div>
      </div>
    </div>
  </body>
  <script src="static/index.js"></script>
</html>
```

Now let's create that javascript file. Go to the `static` directory and create `index.js`. To test that the javascript file was successfully loaded, add `console.log("Hello World")` inside the  `index.js` file. Now when you run the server again with `python main.py` and you check your browser at `localhost:8888` you should still see the application but, if you open your console you should see `Hello World` printed. 

To open your console, right click anywhere in your browser window and select `inspect`, then you can select `console` from the tabs. Below is what you should see:  

![js_hello_world](/docs/images/js_hello_world.jpg)  

If you are seeing the same thing then, you have successfully linked the files together, now lets start working on the websockets.  

## Websockets "Hello World"  

Here will we create a websocket connection between the frontend and backend allowing data to be passed between them in realtime without the need of refreshing the browser. 

### Backend  

First lets make our backend accept websocket connections. All we need to do is add a new handler class and give it a few functions that will handle the different events that can happen with a websocket. Some events you can think of are when a client opens and websocket connection to the server, when the client sends a message to the server and then the connection closes. Once you have created the handler, add it to the liste of handlers in the `create_server` function. Lets see how we would do this.  

``` python
# function that will return the created server
def create_server():
    # list of all of the handlers
    handlers = [
            (r"/", MainHandler), 
            (r"/ws", WebSocketHandler)
        ]
    ...


class MainHandler(web.RequestHandler):
  ...


# Creating a websocket handler
class WebSocketHandler(websocket.WebSocketHandler):
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
        
    # Function that runs when the connection closes
    def on_close(self):
        # prints Connecton Closed
        print("Connection Closed")


if __name__ == '__main__':
  ...
```     

In the snippet above, you can see that under the `MainHandler` class, we create a new class called `WebSocketHandler`, in the class we create three functions: `open`, `on_message` and `on_close`.  


### Frontend

Now we need to connect to the backend's websockets via the frontend. Below is how we would go about communicating to the backend via websockets.  

``` javascript
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
```

Now that both the frontend and the backend have some basic logic to support websockets, they should be able to communicate.  

What should happen with the code above is when you start the server, it will listen for websocket connections with the `WebSocketHandler` handler that we created. Once you visit the web page, the javascript will run 

``` javascript
let ws = new WebSocket(`ws://${location.host}/ws`);
```

This will try to establish a websocket connection to and if successful it will save that connection in the variable `ws` and `open` the connection.

Since we created a `ws.onopen` function in our Javascript, it will run because a websocket connection has been opened, but we also created a `open` function in our server's `WebSocketHandler` so that will also run when they connect. 

Run the server and open the web page in your browser and look at the console. You will see that the console has logged:

![client ws hello world](/docs/images/websocketHello.jpg)

Notice how on the client we have printed `Connected to Server` and then `Message from Server: Hello Client`. So we connected to the server (backend) and then we received a message saying `Hello Cient`. Lets look at what our server has printed. If we look at the terminal you can see that the server has printed something very similar.

![server ws hello world](/docs/images/server_ws.jpg)

Here you can see, that other than the initial command the server prints when it begins, we have `Connected to Client` when the connected is opened then `Message from Client: Hello Server`. 

<hr>

In this section you learned how to setup a simple websocket connection between the server and the client allowing realtime communication. In the next section we will go over how to use this connection to send sensor data from the backend to the frontend and how to display that data to users in the UI instead of the console.


[Back to Beginning](/README.md) | [Prev: *Complete Styling*](/docs/markdown/complete_styling.md) | [Next: *Displaying Data in the Frontend*](/docs/markdown/data_to_frontend.md)