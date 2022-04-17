# Full HTML

Now that we have made sure that we can render HTML and can link our CSS to it, lets add in the rest of the HTML for this project and see how that looks. Your `index.html` should now look like this:  

``` html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>HTML Sensor Data</title>
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
</html>
```  

Now when you start the server again, you will now see this:  

![full_html_page](/docs/images/full_html.png)  

Now yes it does look ugly but thats because it's just HTML we will add the CSS shortly.  

#### Explaining the HTML  

So that is a lot of HTML but I will attempt to go over all of the components and explain that they are for.  

This is the base of every HTML document. 

``` html
<!DOCTYPE hmtl>
<html lang="en">
  ...
</html>
``` 

<hr>  

The `head` element holds more standard metadata, but you can also see that we have a `title` element where we give our HTML document a title. 

``` html
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>HTML Sensor Data</title>
</head>
```   

<hr>

The `body` element which is what holds eventhing that will be displayed to the user. Inside of that I put a `div` element with a class of `App`, this is where I'm putting the rest of the HTML code.  

``` html
<body>
  <div class="App">
    ...
  </div>
</body>
```  

<hr>

Inside of the `App div`, I have other `div`s, each with their own `id` assigned, this will help when I try to style the different them. The `id`s provide a way to target a specific `div`. By convention, `id's` are meant to be unique but `classes` can be shared, this will be important when styling.    

``` html
<div class="App">
  <div id="latest-values_container">
    ...
  </div>
  <div id="statistics_container">
    ...
  </div>
  <div id="status_container">
    ...
  </div>
  <div id="alarm_container">
    ...
  </div>
  <div id="input_container">
    ...
  </div>
</div>
```  

You can see that the `id`s are all unique and kind of describe what is going to be stored in it.  

<hr>

Inside the `latest-values_container div` we have a couple of different elements.  

``` html
<div id="latest-values_container">
  <p class="panel-title">Last 10 values</p>
  <section class="content-panel border">
    <table>
      <thead>
        ...
      </thead>
      <tbody class="latest-values-table">
        ...
      </tbody>
    </table>
  </section>
</div>
```  

Here you can see that we have a `p` element, this will just give us a small title for section below. You can see that it has a class `"latest-values-table"`, and what will be displayed in the UI will be `Last 10 values`.  

Below that, we have an element called `section` with multiple classes, `"content-panel"` and `"border"`. Again these are classes that I will use for styling. A `section` element is pretty much the same thing as the `div` tag.  

inside the `section` we have a `table` element, this will allow us to create a table. In a table, you have a `thead` which would have the titles for each column and below that, you will have the `tbody` element which will hold the all of the rows for the table. I gave it the class `"latest-values-table"`.  

<hr>

In the `thead` element we are going to add our headings, in this case we will have `Humidity (%)` and `Temperature (F)`. 

``` html
<thead>
  <tr>
    <th>Humidity (%)</th>
    <th>Temperature (F)</th>
  </tr>
</thead>
```  

Notice how inside of head we have a `tr` element, this represents a row. Then inside the row we have two `th` elements which each hold a heading.  

<hr>

Inside the `tbody` you will see ten rows (`tr` elements) each with two `td` elements. These are similar to `th` except they are meant to hold "table data".  

``` html
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
...
```  

Above I've only shown 3 rows but in the full HTML, you can see that there are ten of them. You can see that I've added dummy data to start.  

<hr>

Next you will see that we have another `div` that similar as it ultimately contains a `table` with a title and some rows. However, there are some differences.  

``` html
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
```

[Back to Beginning](/README.md) | [Prev: *Styling*](/docs/markdown/styling.md) | [Next: *Comming Soon*]()