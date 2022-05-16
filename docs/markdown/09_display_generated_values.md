# Display Generated Values

In the last section we learned how to create a separate class that serve a 
specific purpose and then make use of it in the main application. 

In this section we will work on getting the frontend to display the values 
that it just received in the `Last 10 values` section.

<hr>

First thing we should do is just assign the received values to the first entry 
in the `10 Last values` section. Below you will see how we update the 
`onmessage` function to do this.

``` javascript
// === Defines what happens when a message is recieved ===
ws.onmessage = function (event) {
  // Save the data that was received
  let received = event.data;

  // Logs the received message
  console.log(`Message from Server: ${received}`);

  // de-stringify the packet received 
  let received_obj = JSON.parse(received);

  // Extract the humidity and temperature values from the packet
  let hum_value = received_obj.data[0];
  let temp_value = received_obj.data[1];

  // Display the humidity and temperature values in the first entry
  app_elements.latest_values_section.Hum[0].innerHTML = hum_value;
  app_elements.latest_values_section.Temp[0].innerHTML = temp_value;
};
```

You can see above that what we change is that we de-stringify the packet so 
that it is in a form we can easily work with. 

``` javascript
// de-stringify the packet received 
let received_obj = JSON.parse(received);
```

We then extract the values from the data section in the packet.

``` javascript
// Extract the humidity and temperature values from the packet
let hum_value = received_obj.data[0];
let temp_value = received_obj.data[1];
```

Lastly, we display the extracted values in the first entry in the 
`10 Last values`.

``` javascript
// Display the humidity and temperature values in the first entry
app_elements.latest_values_section.Hum[0].innerHTML = hum_value;
app_elements.latest_values_section.Temp[0].innerHTML = temp_value;
```

Below you can see what this accomplishes.

![image](https://bit.ly/3szN8Vm)

<hr>

I'm sure you can immediately see the problem here. The values we are receiving 
have to many decimals. Let's say that we only want these values to round to 
nearest 100th, so just 2 decimal places. How would we do this?

Let's create a function that does this for us. The way that that function 
should work is that we will provide it a number that we need to round and it 
return the rounded number back to us.

You can think of this function as a "Helper Function" as its job is just to 
help our application with a small task. Since this will not be the last 
"Helper Function" I will make a section in our code where we will put all of 
our helper functions.

``` javascript
// ===== Helper Functions =====
function two_decimals(num) {
  // Convert string to number
  let value = Number(num);
  
  // Rounds to the nearest hundreth
  let rounded_value = value.toFixed(2);
  
  return rounded_value;
}
// ===== End Helper Functions
```

I put this right below the `app_elements` section. Looking at the function, 
its called `two_decimals` and it takes in a variable called `num`, and all the 
function does it use the function `Number` with the `num` variable as a 
parameter, this will convert our string to an actual numerical value, we then 
save that into a temporary variable called `rounded_value`. 

Next we run `toFixed` with the parameter of 2, this will tell it to round and 
save 2 decimal places and lastly we return that new rounded value.

<hr>

We now update the `onmessage` function to use this new helper function.

``` javascript
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

  // Display the humidity and temperature values in the first entry
  app_elements.latest_values_section.Hum[0].innerHTML = short_hum_value;
  app_elements.latest_values_section.Temp[0].innerHTML = short_temp_value;
};
```

Notice how now we save the received values into new variables `long_hum_value` 
and `long_temp_value`. 

``` javascript
// Extract the humidity and temperature values from the packet
let long_hum_value = received_obj.data[0];
let long_temp_value = received_obj.data[1];
```

Next we round these values and save them into new variables called 
`short_hum_value` and `short_temp_value`.

``` javascript
// Round to the nearest hundreth
let short_hum_value = two_decimals(long_hum_value);
let short_temp_value = two_decimals(long_temp_value);
```

Lastly, we display the shortened values. 

``` javascript
// Display the humidity and temperature values in the first entry
app_elements.latest_values_section.Hum[0].innerHTML = short_hum_value;
app_elements.latest_values_section.Temp[0].innerHTML = short_temp_value;
```

![image](https://bit.ly/3wsQQkR)

Much better!!

<hr>

In this section we learned how on to take the humidity and temperature values 
received, and display it in the `Last 10 values` section. However, we are only 
displaying these values in the first entry.

In the next section we will go over how we can update the `Last 10 values` 
section to push older values down the table as new values come in from the 
top similar to pushing values on to a queue.

<hr>

[Back to Beginning](/README.md) |
[Prev: *Generating Humidity and Temperature Values*](/docs/markdown/08_generating_values.md) |
[Next: *Queue Like List*](/docs/markdown/10_queue_like_list.md)