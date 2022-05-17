# imports needed for tornado
from tornado import web
from tornado import ioloop
from tornado import websocket

from pathlib import Path
import os
import json
import threading
from time import sleep

from psuedoSensor import PsuedoSensor


# function that will return the created server
def create_server():
    # list of all of the handlers
    handlers = [
            (r"/", MainHandler), 
            (r"/ws", WebSocketHandler)
        ]
    # Dictionary listing some settings, specifically the location of the template and static files are located
    settings = {
        "template_path" : Path(__file__).parent / "templates",
        "static_path" : Path(__file__).parent / "static"
    }
    # returns the server
    return web.Application(handlers, **settings)


# Creating a handler for the path '/'
class MainHandler(web.RequestHandler):
    # Creating function to handle the GET request type
    def get(self):
        # Render index.html
        self.render("index.html")


# Creating a websocket handler
class WebSocketHandler(websocket.WebSocketHandler):
    # Create an instance of the PsuedoSensor class
    ps = PsuedoSensor()
    
    # Function that runs when a connection has been established
    def open(self):
        # Sends message to the client connected
        # self.write_message("Connection Open")
        print("Connected to Client")
        self.write_message("Hello Client")

    # Function that runs when we receive a message
    def on_message(self, message):
        # Prints the message received
        print(f"Message from Client: {message}")
        
        # de-stringify the message
        json_message = json.loads(message)
        
        # check what is the packet is about
        if (json_message["packet"] == "1 Random Value"):
            # packet is asking for 1 random value to be sent to the frontend
            
            # creates the message to send
            message = {
                "packet": "",
                "data": self.ps.generate_values()
            }
            
            # stringify the message
            stringified_message = json.dumps(message)
            
            # send message to frontend
            self.write_message(stringified_message)
    
        elif (json_message["packet"] == "10 Random Values"):
            # Start a thread with the purpose of just generating 10 values
            threading.Thread(target = self.random10()).start()
        
    # Function that runs when the connection closes
    def on_close(self):
        # prints Connecton Closed
        print("Connection Closed")
       
    # Function to generate 10 values
    def random10(self):
        for _ in range(10):
            # creates the message to send
            message = {
                "packet": "",
                "data": self.ps.generate_values()
            }
            
            # stringify the message
            stringified_message = json.dumps(message)
            
            # send message to frontend
            self.write_message(stringified_message)
            
            # adds a 1 second delay
            sleep(1)
             

# Entrypoint
if __name__ == '__main__':
    # Creates server and assigns it to the server variable 
    server = create_server()
    
    # Tells the server to listen to port 8888
    server.listen(8888)
    print("Server Running")
    
    # Starts the server in an event loop
    ioloop.IOLoop.current().start()
