import { StartScan } from "../generated-typings";
var esp = require("espruino");
var noble = require('@abandonware/noble');

const startScan: StartScan = () => {
  return Promise.resolve(scan());
};

const scan = ():Promise<any> => {
  return new Promise((resolve, reject) => {
    const devices: any[] = [];
    noble.startScanning([]);
    noble.on('discover',  (device:any ) => {
      // console.log(`${device.address} (${device.advertisement.localName})`);
      devices.push({name: device.advertisement.localName, address: device.address});
      console.log(devices);
      setTimeout(() => {
        noble.stopScanning();
        resolve(devices);
        device.disconnect((data:any)=>console.log(data));
        device.once('disconnect', ((data:any)=>console.log(data)));
      }, 5000);
    });
    noble.on('scanStart', () => console.log("Scanning started."));
    noble.on('scanStop',  () => console.log("Scanning Stopped."));
  });
}

export default startScan;
