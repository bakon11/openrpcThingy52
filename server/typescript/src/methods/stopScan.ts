import { StopScan } from "../generated-typings";
var esp = require("espruino");
var noble = require('@abandonware/noble');

const stopScan: StopScan = ():Promise<any> => {
  return Promise.resolve(stopScaning());
};

const stopScaning = () => {
  return new Promise((resolve, reject) => {
    noble.stopScanning();
    noble.on('scanStop',  function() { 
      console.log("Scanning Stopped."); 
      resolve("stopped");
    });
  });
}

export default stopScan;
