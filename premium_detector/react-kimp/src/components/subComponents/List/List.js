import React, { useEffect, useState } from "react";
import axios from "axios";
// import WebSocket from "ws";
// import wscat from "wscat"
// import websockets from "websockets";
// import asyncio from "asyncio";
// import wscat from "wscat";
// const WebSocket = require("ws");

const List = ({ color, market, price }) => {
  return (
    <div style={{ color: color }}>
      {market} : {price && (price * 1).toLocaleString()}
    </div>
  );
};

export default List;
