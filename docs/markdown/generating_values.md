# Generating Humidity and Temperature Values

In the last section we learned how to send packets between the frontend and 
backend. 

In this section we will expand on this by generating the proper 
humidity and temperature values so that we can send those to the frontend and 
then displaying the results.

<hr>

To generate humidity and temperature values we will create a separate python 
file that will be responsible for doing that. In the same directory as your 
`main.py` file, create a file called `psuedoSensor.py` and enter in the code 
below:

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

The code about will allow us to create an instance of the `PsuedoSensor` class 
that we can use to generate values in our `main.py` file. We would then be 
able to send those values to the frontend when we click the `1 Random Value` 
button.

<hr>

[Back to Beginning](/README.md) |
[Prev: *Generating Humidity and Temperature Values*](
    /docs/markdown/generating_values.md) 
[Prev: *Coming Soon*](/docs/markdown)