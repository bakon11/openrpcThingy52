var temp = new Float32Array(100); // our logged data
var humid = new Float32Array(100); // our logged data
var light = new Float32Array(100); // our logged data
var battery = new Float32Array(100);
var logIndex = 0; // index of last logged data item
var timePeriod = 60*100; // every minute
var lastReadingTime; // time of last reading
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
    console.log(data);
    sensorTemp = data.temperature ;
    sensorHumid = data.humidity;
    storeMyData(temp,sensorTemp);
    storeMyData(humid,sensorHumid);
  });
  // gett light intensity
  Thingy.getColor((data) =>{
    console.log(data);
    sensorLight = data.c;
    storeMyData(light,sensorLight);
  });
  // Get Battery status
  Thingy.getBattery((data) => {
    console.log(data);
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
    // console.log(time+": "+data);
    if(data !=0) sensorData.push({
      date:time,
      sensor:data
    });
  }
  return sensorData;
}
// Start recording Sensors
monitorSensors(monitorSensors, timePeriod);
