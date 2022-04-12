import tornado.ioloop
import tornado.web
import tornado.websocket
import json
from psuedoSensor import PsuedoSensor
from threading import Thread
from time import sleep
import os
import asyncio
from datetime import datetime
import sqlite3
from typing import Tuple


class Application(tornado.web.Application):
  def __init__(self):
    handlers = [(r"/", MainHandler), (r"/ws", WebSocketHandler)]
    settings = dict(
      template_path=os.path.join(os.path.dirname(__file__), "templates"),
      static_path=os.path.join(os.path.dirname(__file__), "static")
    )
    super().__init__(handlers, **settings)


class MainHandler(tornado.web.RequestHandler):
  def get(self):
    self.render("index.html")


class WebSocketHandler(tornado.websocket.WebSocketHandler):
  def open(self):
    self.ps = PsuedoSensor()
    
    self.message = {
      "packet": "",
      "data": {}
    }
    
    self.packet_dict = {
      "r1": "1 Random Value",
      "r10": "10 Random Values"
    }


  async def on_message(self, message):
    json_message = json.loads(message)

    if (json_message["packet"] == self.packet_dict["r1"]):
      dirty_values = self.ps.generate_values()
      cleaned_values = self._clean_values(dirty_values)

      self.message["packet"] = self.packet_dict["r1"]
      self.message["data"] = {
        self.packet_dict["r1"]: cleaned_values
      }
      self.write_message(json.dumps(self.message))

      db.post_data(cleaned_values)

    elif (json_message["packet"] == self.packet_dict["r10"]):
      for _ in range(10):
        self.message["packet"] = self.packet_dict["r1"]
        self.message["data"] = {
          self.packet_dict["r1"]: self.ps.generate_values()
        }
        self.write_message(json.dumps(self.message))
        await asyncio.sleep(1)

  
  def _clean_values(self, dirty_values :Tuple[str, str]) -> Tuple[float, float]:
    cleaned_values_str = ('%.2f'%dirty_values[0], '%.2f'%dirty_values[1])
    return (float(cleaned_values_str[0]), float(cleaned_values_str[1]))


  def on_close(self):
    # print("WebSocket closed")
    pass


class sql_db():
  def __init__(self, connection :str) -> None:
    self.db_conn = sqlite3.connect(connection)
    self.cursor = self.db_conn.cursor()
    self.dt = datetime

    self._create_database_table()
  
  
  def _execute(self, command :str) -> None:
    '''
      Execute database command
    '''
    with self.db_conn:
      try:
        # Attempt to run command
        self.cursor.execute(command)
        self.db_conn.commit()
        # ---
      except sqlite3.OperationalError as e:
        # Handle database error
        print(e)
        # ---


  def _create_database_table(self) -> None:
    command :str = \
      '''
        CREATE TABLE sensor_values (
          datetime TEXT,
          humidity REAL,
          temperature REAL
        )
      '''

    self._execute(command)


  def post_data(self, values :Tuple[str, str]):
    '''
      Posting data to the database
    '''
    command :str = f" \
    INSERT INTO sensor_values VALUES( \
      \"{self.dt.now()}\", \
      {float(values[0])}, \
      {float(values[1])}  \
    )"

    self._execute(command)


# Globals
db = sql_db('psuedo_sensors.db')
# ---


if __name__ == "__main__":
  app = Application()
  app.listen(8888)
  print("Starting App")
  tornado.ioloop.IOLoop.current().start()