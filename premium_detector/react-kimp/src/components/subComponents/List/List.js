import React, { useEffect, useState } from "react";
import axios from "axios";
// import WebSocket from "ws";
// import wscat from "wscat"
// import websockets from "websockets";
// import asyncio from "asyncio";
// import wscat from "wscat";
// const WebSocket = require("ws");

const List = ({ updatePrice, market }) => {
  const [price, setPrice] = useState();
  useEffect(() => {
    if (!updatePrice) return;
    setPrice(updatePrice);
  }, [updatePrice]);
  return (
    <div>
      {/* <span>티커 : {market}</span>
      <span>가격 : {price}</span> */}
      {market} : {price && (price * 1).toLocaleString()}
    </div>
  );
};

export default List;
