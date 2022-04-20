# Complete Styling

In this section we are going to add the rest of the styling to the HTML. Below is the CSS, you can copy and paste it into the `index.css` file.  

## Full CSS file
``` css
/* Zero out the margins and padding so that we can start from a clean slate. */
* {
  margin: 0px;
  padding: 0px;
}

/* This will target the body element */
body {
  /* Sets the documents font to system_ui */
  font-family: system-ui;

  /* Sets the height to 100% of the height of the browser */
  height: 100vh;

  /* Sets the display mode to flex, allowing you to put components side by side */
  display: flex;

  /* Aligns the elements inside of the body in the center of the browser */
  justify-content: center;
  align-items: center;
}

/* This will target elements with the class of App */
.App {
  /* This will set the background color */
  background: rgb(178, 190, 181);

  /* Creates a border of a solid black line with a width of 2px, then gives corners
  a radius of 5px */
  border: solid black 2px;
  border-radius: 5px;

  /* Sets the width to 35 character widths */
  width: 35em;

  /* Sets the display mode to grid, then creates 2 columns with equal widths */
  display: grid;
  grid-template-columns: 1fr 1fr;
}

/* Selects any element with the class border */
.border {
  /* Creates a border of a solid black line with a width of 2px, then gives corners
  a radius of 5px */
  border: solid black 2px;
  border-radius: 5px;
}

/* Selects all button elements */
button {
  /* Adds the top and bottom padding to 0.5 the width of a character and the 
  left and right to 3 times the width of a character */
  padding: 0.5em 3em;

  /* Sets the font size to 16px */
  font-size: 16px;

  /* Sets the radius of the button to 5px */
  border-radius: 5px;
}

/* Selects all input elements */
input {
  /* Sets the width to 50px */
  width: 50px;

  /* Sets the margin of the right to the size of 1 character width */
  margin-right: 1em;

  /* Sets the radius of the input to 5px */
  border-radius: 5px;
}

/* Selects all elements with the class panel-title */
.panel-title {
  /* Sets the font size to small */
  font-size: small;
}

/* Selects all elements with the id of latest-values_container */
#latest-values_container {
  /* Sets the width and height to 15 character widths */
  width: 15em;
  height: 15em;

  /* Sets the margin to auto allowing the browser to set the left and right 
  margins to equal values */
  margin: auto;
}

/* Selects all the section elements that are inside of an element with the id
of latest-values_container */
#latest-values_container > section {
  /* Sets the height to 13.75 of a character width */
  height: 13.75em;

  /* Centers the text */
  text-align: center;
}

/* Selects element with class latest-values-table */
.latest-values-table {
  font-size: 15px;
}

/* Selects all elements with the id of statistics_container */
#statistics_container {
  /* Sets the width to 17.25 character widths and the height to 12.75 character
   widths */
  width: 17.25em;
  height: 12.75em;

  /* Sets the margin to auto allowing the browser to set the left and right 
  margins to equal values */
  margin: auto;

  /* Sets the margin to a character width */
  margin-right: 1em;

  /* Sets the position to relative so that you can position it relative to its 
  normal position */
  position: relative;
}

/* Selects all sections the are inside of elements with a class 
vertical-center inside elements with the id of statistics_container */
#statistics_container > .vertical-center > section {
  /* Centers the text */
  text-align: center;
}

/* Selects all sections that are inside a div, inside an element with the id
of statistics_container */
#statistics_container > div > section {
  /* Sets the height to 16.75 of a characters width */
  height: 16.75em;
}

/* Selects elements with the id of statistic-table-title */
#statistic-table-title {
  /* Sets the display mode to flex, allowing you to put components side by side */
  display: flex;

  /* Sets the direction of the content to be vertical */
  flex-direction: column;

  /* Sets the margins around the children to be equal */
  justify-content: space-around;
}

#statistic-table {
  /* Sets the display mode to flex, allowing you to put components side by side */
  display: flex;
}

/* Selects the elements with the class content-panel that is a child of elements
with the class name vertical-center that is a child of an element with the 
id of statistics_container */
#statistics_container > .vertical-center > .content-panel {
  /* Sets the font size to small */
  font-size: small;
}

/* Selects element with class vertical-center */
.vertical-center {
  /* Sets all margins around this element to 0 */
  margin: 0;

  /* Vertically centers the element */
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

/* Selects element with the class content-panel that has a child with the class
vertical-center  */
.vertical-center > .content-panel {
  display: grid;
  grid-template-columns: 1fr 4fr;
  width: 21em;
}

/* Selects elements with class margin-top */
.margin-top {
  /* Sets the margin-top to 18px */
  margin-top: 18px;
}

/* Selects elements with the is of status_container  */
#status_container {
  /* Sets the size of the element to span over 2 columns */
  grid-column: 1/3;

  /* Sets the left and right margins to 1 character width */
  margin-left: 1em;
  margin-right: 1em;
}

#status-message {
  padding: 0.5em;
  /* Centers the text */
  text-align: center;
}

#alarm_container {
  grid-column: 1/3;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 1em 1em 0.5em 1em;
}

#current-alarm_container {
  /* Sets the margin to auto allowing the browser to set the left and right 
  margins to equal values */
  margin: auto;
}

#current-alarm_container > p {
  margin-bottom: 1em;
}

#set-alarm_container {
  /* Sets the margin to auto allowing the browser to set the left and right 
  margins to equal values */
  margin: auto;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

#input-h {
  margin-left: 2em;
}

#set-alarm_container > button {
  margin-top: 8px;
}

#input_container {
  grid-column: 1/3;
}

#input_container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 8em;
  margin: 0.5em 1em 1em 1em;
}

#current-sensor-h,
#current-sensor-t {
  border: solid black 2px;
  border-radius: 5px;
  /* Sets the font size to small */
  font-size: small;
  padding: 0em 0.5em;
  margin-right: 1em;
}

#current-sensor-h {
  margin-left: 2em;
}

#input_container > #current-input-value_container,
#input_container > #input-button_container {
  /* Sets the margin to auto allowing the browser to set the left and right 
  margins to equal values */
  margin: auto;
}

#random1 {
  padding: 0.5em 3.5em;
  margin-bottom: 0.5em;
}

#random10 {
  padding: 0.5em 3em;
  margin-top: 0.5em;
}

#current-sensor-title {
  margin-bottom: 1em;
}
```

<hr>

[Back to Beginning](/README.md) | [Prev: *Full HTML*](/docs/markdown/full_html.md) | [Prev: **]()
