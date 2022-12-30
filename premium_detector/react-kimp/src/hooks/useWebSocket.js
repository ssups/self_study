import React, { useEffect, useState } from "react";

const useWebSocket = Url => {
  const [ws, setWs] = useState();
  const [isConnected, setIsConnected] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    // if (isConnected) return;
    const ws = new WebSocket(Url);
    console.log("@@ initWebsocket");
    ws.onopen = () => {
      setWs(ws);
      console.log("connected to " + Url);
    };
    ws.onclose = err => {
      setWs(null);
      console.log("disconnected from " + Url);
      console.log(err);
      // window.location.reload();
    };
    ws.onerror = err => {
      setWs(null);
      console.log("connectin error from " + Url);
      console.log(err);
    };
    ws.onmessage = async event => {
      const blobData = event.data;
      const text = await new Response(blobData).text();
      const parsed = JSON.parse(text);
      setData(parsed);
    };

    return () => {
      console.log("connection with" + Url + "has cleaned up");
      ws.close();
      setWs(null);
      console.log("sdsdfdf");
    };
  }, []);
  return [ws, data];
};

export default useWebSocket;
