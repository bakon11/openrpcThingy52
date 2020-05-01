var temp = new Float32Array(100); // our logged data
var humid = new Float32Array(100); // our logged data
var light = new Float32Array(100); // our logged data
var battery = new Float32Array(100);
var logIndex = 0; // index of last logged data item
var timePeriod = 10*1000; // how often to pull data
var lastReadingTime; // time of last reading

NRF.on('connect',()=>{
  digitalPulse(LED2,1,200);
});
NRF.on('disconnect',()=>{
  digitalPulse(LED1,1,200);
});

// Store data into RAM
function storeMyData(sensor, data) {
  logIndex++;
  if (logIndex>=sensor.length) logIndex=0;
  sensor[logIndex] = data;
}
// Get sensor data and store it in RAM
function monitorSensors() {
  // Get Temp and Humidity
  Thingy.getHumidity((data) => {
    sensorTemp = data.temperature ;
    sensorHumid = data.humidity;
    storeMyData(temp,sensorTemp);
    storeMyData(humid,sensorHumid);
  });
  // gett light intensity
  Thingy.getColor((data) =>{
    sensorLight = data.c;
    storeMyData(light,sensorLight);
  });
  // Get Battery status
  Thingy.getBattery((data) => {
    var volt = data.voltage;
    var charging = data.charging;
    storeMyData(battery,volt);
  });
  lastReadingTime = Math.round((new Date()).getTime() / 1000);
}
// Dump our data
function exportData(sensor) {
  var sensorData = [];
  for (var i=1;i<=sensor.length;i++) {
    var time = new Date(lastReadingTime - (sensor.length-i));
    var data = sensor[(i+logIndex)%sensor.length].toFixed(2);
    if(data !=0) sensorData.push({
      date:time,
      sensor:data
    });
  }
  return sensorData;
}
// Start recording Sensors
setInterval(monitorSensors, timePeriod);
