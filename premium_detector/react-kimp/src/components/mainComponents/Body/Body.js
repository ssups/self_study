import React, { useEffect, useRef, useState, useContext } from "react";
import useWebSocket from "../../../hooks/useWebSocket";
import List from "../../subComponents/List/List";
import axios from "axios";
import { Context } from "../../../App";

const Body = () => {
  // states
  const [criteriaAllMkt, setCriteriaAllMkt] = useState();
  // context
  const { upbitWs, upbitData } = useContext(Context);

  // useEffects
  useEffect(() => {
    (async () => {
      const { data: upbit_allMkt } = await axios.get("https://api.upbit.com/v1/market/all");
      const allMkt = upbit_allMkt.map(el => el.market).filter(el => el.startsWith("KRW"));
      console.log(allMkt);
      setCriteriaAllMkt(allMkt);
    })();
  }, []);

  useEffect(() => {
    if (!upbitWs) return;
    const str = JSON.stringify([{ ticket: "test" }, { type: "trade", codes: criteriaAllMkt }]);
    upbitWs.send(str);
  }, [upbitWs]);

  useEffect(() => {
    if (!upbitData) return;
    console.log(upbitData.code, ": ", upbitData.trade_price);
  }, [upbitData]);

  // returns
  return (
    <div>
      {criteriaAllMkt &&
        upbitData &&
        criteriaAllMkt.map((market, ind) => {
          return (
            <List
              key={ind}
              market={market}
              updatePrice={upbitData.code === market && upbitData.trade_price}
            />
          );
        })}
      <List />
    </div>
  );
};

export default Body;
