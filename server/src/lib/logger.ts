import Logger from "bunyan";
function createLogger(name:string) {
  return Logger.createLogger({name, level: "debug"});
}
export default createLogger;
