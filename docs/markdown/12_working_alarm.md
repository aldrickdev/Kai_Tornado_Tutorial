# Working Alarm

In the section we learned how to calculate the average, get the maximum 
and minimum and then displaying the results.

Currently we can set alarm thresholds but we aren't checking to see if the 
alarm should trigger or not. So in this section we will change the status 
if the alarm threshold is passed when a new value is generated.

<hr>

To accomplish this I created a simple helper function called `check_alarm_thresholds`:

``` javascript
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
    app_elements.status.innerHTML = "Both Humidity and Temperature Alarms Triggered";
  }
  else if (hum >= current_hum_threshold) {
    app_elements.status.innerHTML = "Humidity Alarm has Triggered";
  }
  else if (temp >= current_temp_threshold) {
    app_elements.status.innerHTML = "Temperature Alarm has Triggered";
  }
  else {
    app_elements.status.innerHTML = "No Alarms have been Triggered";
  }
}
```

What this function does is first pulls the current alarm thresholds and saves 
them in variables, next we convert those to a numerical representation so that 
we can do some comparisons. Lastly, we do the comparisons and display a new 
status message depending on the result of the comparison.

<hr>

We also need to make sure this function runs everytime we generate a new 
value. So we run this function at the bottom of the `onmessage` function.

``` javascript
// === Defines what happens when a message is received ===
ws.onmessage = function (event) {
  // Took out this section of the code to save space
  ...

  // Check to see if the alarm should trigger
  check_alarm_thresholds(short_hum_value, short_temp_value);

  // Stats
  calculate_avg();
  get_max();
  get_min();
};
```

Once you save these changes and run the server, this is how it should look:

![image](https://bit.ly/3LeMJ1a)

You can see how as we generate numbers, the status updates depending on the 
alarm thresholds and if they were surpassed.

Also just so that the application starts with the status `"No Alarms have been Triggered"`, you can update the status at the end of the file. Like so:

``` javascript
// ===== Default Status =====
app_elements.status.innerHTML = "No Alarms have been Triggered";
// =====
```

<hr>

One small thing that I have been meaning to update is for the application to 
show the currently generated values here:

![image](https://bit.ly/37RrYLj)

At the moment this doesn't update when a new value is generated, lets fix 
that. Above the `check_alarm_thresholds` function you can add the line below: 

``` javascript
// Display newly generated values
app_elements.input_sensor_section.current.Hum.innerHTML = short_hum_value;
app_elements.input_sensor_section.current.Temp.innerHTML = short_temp_value;
```

Now the `onmessage` function should look like:

``` javascript
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
```

Now if you save and run the server, the application should look do this:

![image](https://bit.ly/3wiRqTf)

Notice how now the `Current Sensor Values` section updates every time a new 
value gets generated.

<hr>

In this section we made use of the alarm thresholds updated the status if a 
threshold was surpassed or not. We also updated the `Current Sensor Values` 
section so that it could update to show the currently generated value.

In the next section we will finally tackle the `10 Random Values` button.

<hr>

[Back to Beginning](/README.md) |
[Prev: *Displaying Stats*](/docs/markdown/11_stats.md) |
[Next: *10 Random Values*](/docs/markdown/13_10_random_values.md)