import React, { useEffect, useRef, useState, useContext } from "react";
import useWebSocket from "../../../hooks/useWebSocket";
import List from "../../subComponents/List/List";
import axios from "axios";
import { Context } from "../../../App";

const Body = () => {
  // states
  const [criteriaAllMkt, setCriteriaAllMkt] = useState();
  const [criteriaMktPrices, setCriteriaMktPrices] = useState();
  // context
  const { upbitWs, upbitData } = useContext(Context);

  // useEffects
  useEffect(() => {
    (async () => {
      // 원화마켓 이름 전부가져오기 (KRW-BTC, KRW-ETH ...)
      const { data: upbit_krwMkt } = await axios.get("https://api.upbit.com/v1/market/all");
      const allMkt = upbit_krwMkt.map(el => el.market).filter(el => el.startsWith("KRW"));
      // 데이터 가져오기(업비트는 params로 마켓이름 문자열형태로 나열)
      const { data: upbit_krwMkt_data } = await axios.get(
        `https://api.upbit.com/v1/ticker?markets=${allMkt}`
      );
      // 마켓이름: 현재가격 으로 객체생성
      const krwMktPrices = upbit_krwMkt_data.reduce((acc, curMktData) => {
        acc[curMktData.market] = curMktData.trade_price;
        return acc;
      }, {});

      setCriteriaAllMkt(allMkt);
      setCriteriaMktPrices(krwMktPrices);

      // 원화마켓 이름들 가공하기
      const allMktToUsdt = allMkt.map(symbol => symbol.replace("KRW-", "") + "USDT");
      console.log(allMktToUsdt);
      // console.log(JSON.stringify(allMktToUsdt));
      const stringed = JSON.stringify(allMktToUsdt);
      // 데이터 가져오기 (바이낸스는 params로 마켓이름 배열형태로 받는다)

      const makeParams = `[` + allMktToUsdt.map(ticker => `"${ticker}"`).join(",") + `]`;

      console.log(makeParams);

      fetch("");

      // const { data: test } = await axios.get(
      //   // `https://api.binance.com/api/v3/ticker/price?symbols=["BTCUSDT","ETHUSDT"]`
      //   // `https://api.binance.com/api/v3/ticker/price?symbols=${JSON.stringify(allMktToUsdt)}`
      //   // `https://api.binance.com/api/v3/ticker/price?symbols=${allMktToUsdt}`
      //   // `https://api.binance.com/api/v3/ticker/price?symbols=${stringed}`
      //   `https://api.binance.com/api/v3/ticker/price?symbols=${makeParams}`

      // );
      const peding = await fetch(
        `https://api.binance.com/api/v3/ticker/price?symbols=${makeParams}`
      );

      console.log(peding);
    })();
  }, []);

  useEffect(() => {
    if (!upbitWs || !criteriaAllMkt) return;
    const str = JSON.stringify([{ ticket: "test" }, { type: "ticker", codes: criteriaAllMkt }]);
    upbitWs.send(str);
  }, [upbitWs, criteriaAllMkt]);

  useEffect(() => {
    if (!upbitData) return;
    const key = upbitData.code;
    const value = upbitData.trade_price;
    setCriteriaMktPrices({ ...criteriaMktPrices, [key]: value });
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
              price={criteriaMktPrices[market]}
              color={upbitData.code === market && "red"}
            />
          );
        })}
      <List />
    </div>
  );
};

export default Body;
