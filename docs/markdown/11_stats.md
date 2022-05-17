# Stats 

In the last section we learned how to update the `Last 10 values` section 
so that older values get pushed down everytime new values come in.

In this section we will work on calculating the Avg, Max and Min and 
displaying those calculations in the `Stats on the last 10 values` section.

<hr>

All we need to do here is create helper functions that can calculate the Avg, 
Max and Min then display the calculations. 

``` javascript
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

  // Covert number to string to string
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
```

<hr>

## Average 

For the average we have created the `calculate_avg` function. 

``` javascript
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

  // Covert number to string to string
  s_hum_avg = hum_avg.toString();
  s_temp_avg = temp_avg.toString();

  // Display the calculated averages
  app_elements.statistics_section.Avg.Hum.innerHTML = s_hum_avg;
  app_elements.statistics_section.Avg.Temp.innerHTML = s_temp_avg;
}
```

Essentially the way the function works is that it creates a couple of 
temporary variables. Calculates the sum of all of the currently displayed 
values, calculates the average and lastly, displays the result.

First temporary variables for the sum:

``` javascript
// Holds sum
let hum_sum  = 0;
let temp_sum = 0;
```

Temporary variables for numberical representation of the averages:

``` javascript
// Holds averages
let hum_avg  = 0;
let temp_avg = 0;
```

Lastly, temporary variables for the string representation of the averages: 

``` javascript
// Holds string representation of the average
let s_hum_avg  = "";
let s_temp_avg = "";
```

After setting up the variables that we will use, we then calculate the sum 
for the humidity and the temperature. In the loop we essentially grab the 
values being displayed for the humidity and temperature, convert those values 
to their numerical representation and then add them the current sum:

``` javascript
// Calculates sum
for (let i = 0; i < value_count; i++) {
  hum_sum += Number(app_elements.latest_values_section.Hum[i].innerHTML);
  temp_sum += Number(app_elements.latest_values_section.Temp[i].innerHTML);
}
```

Next, we calculate the average values for the humidity and the temperature: 

``` javascript
// Calculates average and rounds to the nearest hundreth
hum_avg = two_decimals(hum_sum / value_count);
temp_avg = two_decimals(temp_sum / value_count);
```

In the code above you can probably notice two things here. We are using a 
variable here called `value_count`. This is a new variable that we will need 
to create, the point of the variable is to provide a count of how many values 
are currently being displayed. I created this variable below the 
`app_elements` sctructure near the top. 

``` javascript
let value_count = 0;
```

The next thing you probably notice it that we are using the `two_decimals` 
function again. This is because when calculating the average we have the 
potential of getting really long numbers again so here we are going to round 
them again.

The last thing we do in the function is convert the numerical averages to 
strings so that we can then display them.

``` javascript
// Covert number to string
s_hum_avg = hum_avg.toString();
s_temp_avg = temp_avg.toString();

// Display the calculated averages
app_elements.statistics_section.Avg.Hum.innerHTML = s_hum_avg;
app_elements.statistics_section.Avg.Temp.innerHTML = s_temp_avg;
```

<hr>

## Maximum

For the maximum we created the `get_max` function:

``` javascript
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
```

The way that this function works is, it first creates temporary max variables 
with negative infinity so that any number we compare it too would be larger 
than it, we then loop through each displayed value and compare it to the 
current temporary max variable, we then compare each value to the temporary 
max variable, if it is larger, we replace the current temporary max with the 
value we saw was larger. Lastly, once we have looped through all of the 
displayed values, we display the max value variable.

Temporary max variables:

``` javascript
// Holds the max values, temp holding Number.NEGATIVE_INFINITY so that we can 
// gurantee that the next number we compare it too will be greater
let hum_max = Number.NEGATIVE_INFINITY;
let temp_max = Number.NEGATIVE_INFINITY;
```

Loop where the logic to check which is the largest displayed value:

``` javascript
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
```

Displaying the max value

``` javascript
// Display the Max values
app_elements.statistics_section.Max.Hum.innerHTML = hum_max.toString()
app_elements.statistics_section.Max.Temp.innerHTML = temp_max.toString()
```

<hr>

## Minimum

For the minimum we created the `get_min` functions:

``` javascript
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
```

I won't explain this one since it is pretty much the same as the `get_max` 
just checking for the values to be smaller not larger.

Lastly, to make use of these new functions we need to call them in the 
`onmessage` function so that they run everytime a new value is generated and 
we also need to increment the `value_count` variable so that we can accurately 
calculate the average. Below is how the `onmessage` function should look like: 

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

  // Count of how many generated values are being displayed, used to calculate 
  // the average
  if (value_count < app_elements.latest_values_section.Hum.length) {
    value_count++;
  }

  // Calculate Statistics
  calculate_avg();
  get_max();
  get_min();
}
```

<hr>

Once all this is added, run the server and this is how it should run:

![image](https://bit.ly/3PpkqQZ)

You can see how immediately after generating a new value we calculate the 
statistics. 

<hr>

In this section we learned how to calculate the average, get the maximum 
and minimum and then displaying the results.

Currently we can set alarm thresholds but we aren't checking to see if the 
alarm should trigger or not. In the next section we will change the status 
if the alarm threshold is passed when a new value is generated.

<hr>

[Back to Beginning](/README.md) |
[Prev: *Queue Like List*](/docs/markdown/10_queue_like_list.md) |
[Next: *Working Alarm*](/docs/markdown/12_working_alarm.md)