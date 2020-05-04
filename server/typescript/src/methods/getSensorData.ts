import { GetSensorData } from "../generated-typings";
var esp = require("espruino");

const getSensorData: GetSensorData = (deviceID, sensorType) => {
  return Promise.resolve(querySensors(deviceID, sensorType));
};

const querySensors = (deviceID:any, sensorType: any):Promise<any> => {
  return new Promise((resolve, reject) => {  
    esp.init((data:any) => {
      esp.expr(deviceID, 'exportData('+sensorType+')', function(data:any){
        // return Promise.resolve(JSON.parse(data));
        resolve(data);
      });
    });
  });
}

// queryPressure("e5:b6:7f:eb:a0:dd");
export default getSensorData;