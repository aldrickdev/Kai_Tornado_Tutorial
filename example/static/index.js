// Globals
let app = {
  latest_values_section: {
    Hum: [
      document.querySelector('#hd1'),
      document.querySelector('#hd2'),
      document.querySelector('#hd3'),
      document.querySelector('#hd4'),
      document.querySelector('#hd5'),
      document.querySelector('#hd6'),
      document.querySelector('#hd7'),
      document.querySelector('#hd8'),
      document.querySelector('#hd9'),
      document.querySelector('#hd10'),
    ],
    Temp: [
      document.querySelector('#td1'),
      document.querySelector('#td2'),
      document.querySelector('#td3'),
      document.querySelector('#td4'),
      document.querySelector('#td5'),
      document.querySelector('#td6'),
      document.querySelector('#td7'),
      document.querySelector('#td8'),
      document.querySelector('#td9'),
      document.querySelector('#td10'),
    ],
  },

  statistics_section: {
    Avg: {
      Hum: document.querySelector('#avg-hd'),
      Temp: document.querySelector('#avg-td'),
    },
    Max: {
      Hum: document.querySelector('#max-hd'),
      Temp: document.querySelector('#max-td'),
    },
    Min: {
      Hum: document.querySelector('#min-hd'),
      Temp: document.querySelector('#min-td'),
    },
  },

  status: document.querySelector('#status-message'),

  alarm_section: {
    current_alarm: {
      Hum: document.querySelector('#current-alarm-h'),
      Temp: document.querySelector('#current-alarm-t'),
    },
    input_alarm: {
      Hum: document.querySelector('#input-h'),
      Temp: document.querySelector('#input-t'),
    },
    set_alarm_button: document.querySelector('#set-alarm-button'),
  },

  input_sensor_section: {
    current: {
      Hum: document.querySelector('#current-sensor-h'),
      Temp: document.querySelector('#current-sensor-t'),
    },
    button: {
      Random1: document.querySelector('#random1'),
      Random10: document.querySelector('#random0'),
    },
  },
};
let message = {
  packet: '',
  data: {},
};
let received;
let latest_values = {
  Hum: [],
  Temp: [],
};
let alarm = {
  Hum: 50,
  Temp: 60,
};
// ===

// Button Events
const Random1 = () => {
  message.packet = '1 Random Value';
  message.data = '';

  ws.send(JSON.stringify(message));
};
const Random10 = () => {
  message.packet = '10 Random Values';
  message.data = '';

  ws.send(JSON.stringify(message));
};
const SetAlarm = () => {
  alarm.Hum = parseFloat(app.alarm_section.input_alarm.Hum.value);
  alarm.Temp = parseFloat(app.alarm_section.input_alarm.Temp.value);

  app.alarm_section.input_alarm.Hum.value = '';
  app.alarm_section.input_alarm.Temp.value = '';

  app.alarm_section.current_alarm.Hum.innerHTML = alarm.Hum.toString();
  app.alarm_section.current_alarm.Temp.innerHTML = alarm.Temp.toString();
};
// ===

// Helper Functions
const _clean_up = () => {
  // latest values
  app.latest_values_section.Hum.map((row) => {
    row.innerHTML = '    ';
  });

  app.latest_values_section.Temp.map((row) => {
    row.innerHTML = '    ';
  });
  // ===

  // Statistics
  app.statistics_section.Avg.Hum.innerHTML = '    ';
  app.statistics_section.Avg.Temp.innerHTML = '    ';

  app.statistics_section.Max.Hum.innerHTML = '    ';
  app.statistics_section.Max.Temp.innerHTML = '    ';

  app.statistics_section.Min.Hum.innerHTML = '    ';
  app.statistics_section.Min.Temp.innerHTML = '    ';
  // ===

  // Status
  app.status.innerHTML = 'Ready';
  // ===

  // Alarm
  app.alarm_section.current_alarm.Hum.innerHTML = alarm.Hum.toString();
  app.alarm_section.current_alarm.Temp.innerHTML = alarm.Temp.toString();
  // ===

  // Input
  app.input_sensor_section.current.Hum.innerHTML = '    ';
  app.input_sensor_section.current.Temp.innerHTML = '    ';
  // ===
};
const _open_connection = () => {
  message.packet = 'New Connection';
  message.data = '';

  ws.send(JSON.stringify(message));
};
const _check_alarm = (hum, temp) => {
  if (hum > alarm.Hum && temp > alarm.Temp) {
    app.status.innerHTML = 'Humidity and Temperature Alarms ON';
  } else if (hum > alarm.Hum) {
    app.status.innerHTML = 'Humidity Alarm ON';
  } else if (temp > alarm.Temp) {
    app.status.innerHTML = 'Temperature Alarm ON';
  } else {
    app.status.innerHTML = 'Humidity and Temperature are at Normal Values';
  }
};
const _update_latest_values_table = () => {
  let current_len = latest_values.Hum.length;

  if (current_len > 10) {
    latest_values.Hum = latest_values.Hum.splice(1, 11);
    latest_values.Temp = latest_values.Temp.splice(1, 11);

    current_len = latest_values.Hum.length;
  }

  app.input_sensor_section.current.Hum.innerHTML =
    latest_values.Hum[current_len - 1];
  app.input_sensor_section.current.Temp.innerHTML =
    latest_values.Temp[current_len - 1];

  latest_values.Hum.map((h, ix) => {
    app.latest_values_section.Hum[current_len - 1 - ix].innerHTML = h;
  });

  latest_values.Temp.map((t, ix) => {
    app.latest_values_section.Temp[current_len - 1 - ix].innerHTML = t;
  });
};
const _calculate_average = () => {
  let current_len = latest_values.Hum.length;

  let average_hum = latest_values.Hum.reduce((total, hum) => {
    return Number(total) + Number(hum);
  });
  let average_temp = latest_values.Temp.reduce((total, temp) => {
    return Number(total) + Number(temp);
  });

  app.statistics_section.Avg.Hum.innerHTML = _two_decimals(
    average_hum / current_len
  );
  app.statistics_section.Avg.Temp.innerHTML = _two_decimals(
    average_temp / current_len
  );
};
const _two_decimals = (num) => {
  return Number(num).toFixed(2);
};
const _find_max_min = () => {
  let hum_max = latest_values.Hum.reduce((max, num) => {
    return num > max ? num : max;
  });
  let hum_min = latest_values.Hum.reduce((min, num) => {
    return num < min ? num : min;
  });
  app.statistics_section.Max.Hum.innerHTML = hum_max.toString();
  app.statistics_section.Min.Hum.innerHTML = hum_min.toString();

  let temp_max = latest_values.Temp.reduce((max, num) => {
    return num > max ? num : max;
  });
  let temp_min = latest_values.Temp.reduce((min, num) => {
    return num < min ? num : min;
  });
  app.statistics_section.Max.Temp.innerHTML = temp_max.toString();
  app.statistics_section.Min.Temp.innerHTML = temp_min.toString();
};
// ===

// Websocket Functions
let ws = new WebSocket(`ws://${location.host}/ws`);
ws.onopen = function () {
  console.log('Opened Connection');
  _open_connection();
};
ws.onmessage = function (event) {
  received = JSON.parse(event.data);

  switch (received.packet) {
    case '1 Random Value':
      let current_humidity = parseFloat(
        _two_decimals(received.data['1 Random Value'][0])
      );

      let current_temperature = parseFloat(
        _two_decimals(received.data['1 Random Value'][1])
      );

      latest_values.Hum.push(current_humidity);
      latest_values.Temp.push(current_temperature);

      _update_latest_values_table();
      _calculate_average();
      _find_max_min();
      _check_alarm(current_humidity, current_temperature);
      break;

    default:
      console.log('Not Emplemented');
      break;
  }
};
ws.onclose = function () {
  alert('Connection to Backend Lost');
};
// ===

_clean_up();
