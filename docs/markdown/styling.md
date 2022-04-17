# Styling  

Now that we can display HTML, let's style it. Create a directory called `static`, and create a file inside it called `index.css`, this is where we will add our styling. Inside of `index.css` just put:  

``` css
* {
    color: red;
}
```  

Exactly as it says, all this will do it make all of the text red. Similar to what we did for our `templates` directory, we need to tell our server that this exist. We will go back to our `settings` directory and add the static path to it.  

``` python
# function that will return the created server
def create_server():
    # list of all of the handlers
    handlers = [
            (r"/", MainHandler)
        ]
    # Dictionary listing some settings, specifically the location of the template and static files are located
    settings = {
        "template_path" : Path(__file__).parent / "templates",
        "static_path" : Path(__file__).parent / "static"
    }
    # returns the server
    return web.Application(handlers, **settings)
```  

This is what the `create_server` should look like now.  

We also need to tell the HTML file to load the styles, to do this we need to go to the `index.html` file in our `templates` directory, and add a stylesheets link to the head element. Now the `index.html` should look like:  

``` html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="static/index.css" />
    <title>Testing</title>
  </head>
  <body>
    <h1>Hello World from an HTML File</h1>
  </body>
</html>
```  

Notice that now the head element has `<link rel="stylesheet" href="static/index.css" />` in it now, the will tell the HTML file to load in the styles found in `index.css`.  

Once all of these changes are made and you run  

``` python
python main.py
```  

The server should run and at `localhost:8888` you should see:  

![tornado_hello_world_css](https://user-images.githubusercontent.com/75044812/161887912-a19657dd-989b-4916-b688-fd643ccd5a24.png)

If you are seeing that the text is now red, then you have properly linked the css file.  

[Back to Beginning](/README.md) | [Prev: *Rending HTML*](/docs/markdown/rendering_html.md) | [Prev: *Full HTML*](/docs/markdown/full_html.md)