import { deflate } from "zlib";

const SOCKET_TABLE = ["http://sdf", "http://123"];

const instances = {};

class Test {
  constructor(url) {
    // instances.filter((instance)=>instances.indexOf(instance.getURL()))
    if (!instances[url.slice(0, 5)]) return;
    instances[url.slice(0, 5)] = new WebSocket(url);
    this.url = url;
  }
  getURL = () => this.url;
}

const websocket = SOCKET_TABLE.map(url => new Test(url));

export default websocket;
