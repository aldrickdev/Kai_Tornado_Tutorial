# Saving Your Data

In the section we learned how to create a thread that has a specific task. 

In this final section we will see how to time stamp each value generated and how to save it into an array.

<hr>

Currently the application generates data and displays it for the user to see. 
However, once the values are displayed, they are lost forever. In this section we are going to simply save the data into an array.

First thing we need to import the `datetime` package so that we can get the 
date and time, that date and time will be added to the values we generated so 
that we know when it was generated. 

``` python
from datetime import datetime
```

You would put the import line above with the other imports towards the top of 
the `main.py` file.

We also need to create an array that we will be adding of the data too. For 
this I create an array called `data` and put it right under all of the 
imports near the top of the file.

``` python
# array to store all of the generated data that was sent to the frontend
data = []
```

Next we need to create the function that has the task of storing 
our generated data. We will be creating this right under the `create_server` 
function in the `main.py` file.

``` python
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
```

You can see that the function gets the data as a parameter called 
`hum_temp_values`. 

``` python
def store_data(hum_temp_values):
```

We then create a variable called `now`, which holds the current date and time. 

``` python
# get the current time
now = datetime.now()
```

Next we create a variable called `formatted_now` which just uses the `now` variables to created a formatted version of the date and time.

``` python
# format the time how I need to store it
formatted_now = f"{now.month}-{now.day}-{now.year} {now.hour}:{now.minute}:{now.second}"
```

We then create a data point which would be a dictionary with the data and the 
date and time, and append it to the end of the `data` array:

``` python
# create the data point
data_point = {
    "data": hum_temp_values,
    "datetime": formatted_now
}

# insert the data point into the dictionary
data.append(data_point)
```

Lastly we print the entire arrary to the console.

``` python
# prints the currently stored values
for dp in data:
    print(dp)
    
print()
```

<hr>

Now that the function has been created we now just need to use it. We will 
need to run this function in the two places we generate values, in the 
`onmessage` function where we create `1 Random Value`:

``` python
# Function that runs when we receive a message
def on_message(self, message):
    ...
    
    # check what is the packet is about
    if (json_message["packet"] == "1 Random Value"):
        # packet is asking for 1 random value to be sent to the frontend
        
        # creates the message to send
        message = {
            "packet": "",
            "data": self.ps.generate_values()
        }
        
        ...
        
        # store the data
        store_data(message["data"])
```

And in the `random10` function:

``` python   
# Function to generate 10 values
def random10(self):
    for _ in range(10):
        # creates the message to send
        message = {
            "packet": "",
            "data": self.ps.generate_values()
        }
        
        ...
        
        # store the data
        store_data(message["data"])
        
        ...
```

Note that the `...` is just to save space in the documentation, you don't 
need to remove code, just add the `store_data` function. 


<hr>

After making the changes above the backend will save every value generated to 
this array and then print it to the terminal. 

![image](https://bit.ly/3NFquDp)

<hr>

This is the end of the project, in the section section I will display the code for all of the files.

<hr>

[Back to Beginning](/README.md) |
[Prev: *10 Random Values*](/docs/markdown/13_10_random_values.md) |
[Next: *Code*](/docs/markdown/15_code.md)

