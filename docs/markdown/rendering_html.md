# Rendering HTML

In this section we will look at how to get tornado to return an HTML file as a response to a request.  

First inside of the project directory, lets create a directory called `templates`, in here we will create a file called `index.html` with the following HTML in it.  

``` html
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Testing</title>
</head>
<body>
    <h1>Hello World from an HTML File</h1>
</body>
</html>
```  

Now that we have our HTML file setup, let's tell our server to display it. We will need to tell our server where to find out templates (html files) and then tell the `MainHandler` to display the HTML file. The `create_server` function should look like:  

``` python
def create_server():
    # list of all of the handlers
    handlers = [
            (r"/", MainHandler)
        ]
    # Dictionary with the location of the templates directory
    settings = {
        "template_path" : Path(__file__).parent / "templates"
    }
    # returns the server
    return web.Application(handlers, **settings)
```  

Notice, now we have a dictionary called `settings` where the `template_path` is being listed with the path to the templates directory. The settings are then passed to the `web.Application` function so that the server knows where to find the templates directory.  

Now we need to update the `MainHandler` class to use the `index.html` now.  

``` python
# Creating a handler for the path '/'
class MainHandler(web.RequestHandler):
    # Creating function to handle the GET request type
    def get(self):
        # Now returns the index.html file
        self.render("index.html")
```

You can now save the `main.py` and run the script with  

``` bash
python main.py
```  

When you open your browser to `localhost:8888` you should see:  

![tornado_hello_world_html](https://user-images.githubusercontent.com/75044812/161884285-1a7b43ad-e767-49f8-a7a5-382abcd94c1b.png)  

The fact that you can now see `Hello World from an HTML File`, should tell you that you are pulling in the `index.html` file from the `templates` directory.  

[Back to Beginning](/README.md) | [Prev: *Tornado, Hello World*](/docs/markdown/tornado_hello_world.md) | [Next: *Styling*](/docs/markdown/styling.md)