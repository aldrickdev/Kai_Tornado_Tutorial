# Queue Like List

In the last section we learned how on to take the humidity and temperature 
values received, and display it in the `Last 10 values` section. However, we 
are only displaying these values in the first entry.

In this section we will go over how we can update the `Last 10 values` 
section to push older values down the table as new values come in from the 
top similar to pushing values on to a queue.

<hr>

Just as a recap, this is what the application currently does:

![image](https://bit.ly/3wsQQkR)

Everytime I generate new values and display it in the `Last 10 values` 
section, the next generated values replace the previous one. It would be 
preferred if everyime a new value gets generated, the previous ones gets 
pushed down. 

<hr>

To do this we need to update the `onmessage` function in our `index.js`.

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

  // Pushes the previous values down 
  for (let i = app_elements.latest_values_section.Hum.length - 1; i > 0; i--){
    app_elements.latest_values_section.Hum[i].innerHTML = app_elements.latest_values_section.Hum[i-1].innerHTML;
    app_elements.latest_values_section.Temp[i].innerHTML = app_elements.latest_values_section.Temp[i-1].innerHTML;
  }

  // Display the humidity and temperature values in the first entry
  app_elements.latest_values_section.Hum[0].innerHTML = short_hum_value;
  app_elements.latest_values_section.Temp[0].innerHTML = short_temp_value;
};
```

Notice that the only change is that before displaying the new value at the 
top of the `Last 10 values` section, we push all currently displayed values 
down.

``` javascript
// Pushes the previous values down 
for (let i = app_elements.latest_values_section.Hum.length - 1; i > 0; i--){
app_elements.latest_values_section.Hum[i].innerHTML = app_elements.latest_values_section.Hum[i-1].innerHTML;
app_elements.latest_values_section.Temp[i].innerHTML = app_elements.latest_values_section.Temp[i-1].innerHTML;
}
```

<hr>

This is the outcome:

![](https://bit.ly/3yH3wY6)

<hr>

In this small section we learned how to update the `Last 10 values` section 
so that older values get pushed down everytime new values come in.

In the next section we will work on calculating the Avg, Max and Min and 
displaying those calculations in the `Stats on the last 10 values` section.

<hr>

[Back to Beginning](/README.md) |
[Prev: *Queue Like List*](/docs/markdown/queue_like_list.md) |
[Next: *Coming Soon*](/docs/markdown)