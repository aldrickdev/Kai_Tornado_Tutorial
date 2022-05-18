# 10 Random Values

In the last section we made use of the alarm thresholds updated the status if 
a threshold was surpassed or not. We also updated the `Current Sensor Values` 
section so that it could update to show the currently generated value.

In this section we will finally tackle the `10 Random Values` button.

<hr>

One of the first things we need to do here is add a function to the `onclick` 
attribute of the `10 Random Values` button.

``` html
<button id="random10" onclick="random10()">10 Random Values</button>
```

Above you can see that I added a function called `random10` to the button. 
Now we need to go to our `index.js` file and create this function. All it 
really needs to do is to send a packet to the backend asking it to generate 
10 random values. 

``` javascript
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
```

Above you can see that it is very similar to the `random1` function, the only 
difference is that it sends `10 Random Value` as the packet. Now we the need 
backend to catch this and send the frontend 10 random values. 

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
            "packet": "",
            "data": self.ps.generate_values()
        }
        
        # stringify the message
        stringified_message = json.dumps(message)
        
        # send message to frontend
        self.write_message(stringified_message)

    elif (json_message["packet"] == "10 Random Values"):
        # Start a thread with the purpose of just generating 10 values
        threading.Thread(target = self.random10()).start()
```

Above you can see that in the `on_message` function we add to our if 
statement to check for `"10 Random Values"`, and you can see that all we do is 
start a thread that will run the `random10` function. 

``` python
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
        
        # adds a 1 second delay
        sleep(1)
```

Above you can see that the `random10` function just has a loop that runs 10 
times where we create a message with a generated value and then send out the 
message. The `sleep` function just adds a delay so that the generated values 
get sent to the frontend 1 by 1.

<hr>

In the above code changes you can see that we are using `threading` and the 
`sleep` function, we need to import these, so at the top of the `main.py` file 
add the imports:

``` python
import threading
from time import sleep
```

<hr>

![image](https://bit.ly/3sGDDUl)

Above you can see that when you press the `10 Random Values` button, 10 values 
gets generated without having to press the button again.

<hr>

In this section we learned how to create a thread that has a specific task. In 
the last section we will see how to time stamp each value generated and how to 
save it to a dictionary.

<hr>

[Back to Beginning](/README.md) |
[Prev: *Working Alarm*](/docs/markdown/12_working_alarm.md) |
[Next: *Coming Soon*](/docs/markdown)