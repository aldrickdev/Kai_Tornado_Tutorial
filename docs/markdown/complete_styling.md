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

#statistics_container {
  width: 17.25em;
  height: 12.75em;
  margin: auto;
  margin-right: 1em;
  position: relative;
}

#statistics_container > .vertical-center > section {
  text-align: center;
}

#statistics_container > div > section {
  height: 16.75em;
}

#statistic-table-title {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

#statistic-table {
  display: flex;
}

#statistics_container > .vertical-center > .content-panel {
  font-size: small;
}

.vertical-center {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

.vertical-center > .content-panel {
  display: grid;
  grid-template-columns: 1fr 4fr;
  width: 21em;
}

.margin-top {
  margin-top: 18px;
}

#status_container {
  grid-column: 1/3;
  margin-left: 1em;
  margin-right: 1em;
}

#status-message {
  padding: 0.5em;
  text-align: center;
}

#alarm_container {
  grid-column: 1/3;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 1em 1em 0.5em 1em;
}

#current-alarm_container {
  margin: auto;
}

#current-alarm_container > p {
  margin-bottom: 1em;
}

#set-alarm_container {
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
  font-size: small;
  padding: 0em 0.5em;
  margin-right: 1em;
}

#current-sensor-h {
  margin-left: 2em;
}

#input_container > #current-input-value_container,
#input_container > #input-button_container {
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
