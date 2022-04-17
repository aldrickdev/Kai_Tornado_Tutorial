# Tornado, Hello World  

In this section we will create a simple tornado application. Inside of the project directory, create a file called `main.py`. In this file enter the code below:  

``` python
# imports needed for tornado
from tornado import web
from tornado import ioloop


# Function that will return the created server
def create_server():
    # list of all of the handlers
    handlers = [
            (r"/", MainHandler)
        ]
    # returns the server
    return web.Application(handlers)


# Creating a handler for the path '/'
class MainHandler(web.RequestHandler):
    # Creating function to handle the GET request type
    def get(self):
        # returns hello world
        self.write("Hello World")
        

# Entrypoint
if __name__ == '__main__':
    # Creates server and assigns it to the server variable 
    server = create_server()
    
    # Tells the server to listen to port 8888
    server.listen(8888)
    print("Server Running")
    
    # Starts the server in an event loop
    ioloop.IOLoop.current().start()
```  

I have commented the code above but I will go over the different sections in a little more detail here.  

<hr>

Here we are just importing 2 packages, `web` and `ioloop`.  

``` python
# imports needed for tornado
from tornado import web
from tornado import ioloop
```  

The `web` package will have two classes we will use, `Application` and `RequestHandler`. The `Application` class will be used to create the Tornado server and the `RequestHandler` class will be used to create a handler for when http requests are received.  

The package `ioloop` will have the class `IOLoop`, which is used to start the server.  

<hr>

Here we are creating a function called `create_server` that will create the server for us. Inside the function you can see that we first create a variable called `handlers`. Inside you see a tuple `(r"/", MainHandler)`, element 0 of the tuple is `r"/"` this means that our server will accept request that hit the `/` endpoint. Element 1 of the tuple is `MainHandler`, this will handle the requests that hit `/`.  

``` python
# Function that will return the created server
def create_server():
    # list of all of the handlers
    handlers = [
            (r"/", MainHandler)
        ]
    # returns the server
    return web.Application(handlers)
```  

<hr>

Here we create the `MainHandler` class. This is what will be handling requests that try to reach the endpoint `/`. Inside this class we create a method called `get`, this will run when the `MainHandler` needs to handle a GET request. Inside the `get` method you can see that we just run `self.write("Hello World")`.  

``` python
# Creating a handler for the path '/'
class MainHandler(web.RequestHandler):
    # Creating function to handle the GET request type
    def get(self):
        # returns hello world
        self.write("Hello World")
```  

<hr>

Lastly, here we have the entrypoint of the program. First we run the `create_server` function and assign that the the variable `server`. Next we tell the server to listen on port `8888`, add we then print a message that will let us know that things are working as expected. Finally, we start the server with `ioloop.IOLoop.current().start()`.  

``` python
# Entrypoint
if __name__ == '__main__':
    # Creates server and assigns it to the server variable 
    server = create_server()
    
    # Tells the server to listen to port 8888
    server.listen(8888)
    print("Server Running")
    
    # Starts the server in an event loop
    ioloop.IOLoop.current().start()
```  

<hr>

Once you have this all typed out, you can save, then run this program with `python main.py`. Remember, you should have your virtual environment activated and have tornado installed, or this command will fail to run the code, this was covered in [Backend Prep](/docs/markdown/backend_prep.md). Once you run the code, you should be able to go to your web browser and go to the url `localhost:8888`.  

![tornado_hello_world](https://user-images.githubusercontent.com/75044812/160307457-39682924-c5b0-42f7-8f21-7225afaf2241.png)  

You have created the base of this project, a simple "hello world" tornado server.  

[Back to Beginning](/README.md) | [Prev: *Backend Prep*](/docs/markdown/backend_prep.md) | [Prev: *Rendering HTML*](/docs/markdown/rendering_html.md)