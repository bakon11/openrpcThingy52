export type DeviceID = string;
export type SensorType = string;
export type StringDoaGddGA = string;
/**
 *
 * Generated! Represents an alias to any of the provided schemas
 *
 */
export type AnyOfDeviceIDSensorTypeStringDoaGddGAStringDoaGddGAStringDoaGddGA = DeviceID | SensorType | StringDoaGddGA;
export type StartScan = () => Promise<StringDoaGddGA>;
export type StopScan = () => Promise<StringDoaGddGA>;
export type GetSensorData = (deviceID: DeviceID, sensorType: SensorType) => Promise<StringDoaGddGA>;