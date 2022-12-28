import React, { useRef } from "react";
import axios from "axios";

// token: 5961154974:AAE1RsCHWEwUzvx-xmG9RmoV7jd-WVVGDYI
// https://api.telegram.org/bot5961154974:AAE1RsCHWEwUzvx-xmG9RmoV7jd-WVVGDYI/getUpdates
// chatId: 2078202305

const Header = () => {
  const telURL =
    "https://api.telegram.org/bot5961154974:AAE1RsCHWEwUzvx-xmG9RmoV7jd-WVVGDYI/sendMessage";
  const chatId = "-860284516";

  // states

  // refs
  const testRef = useRef();

  //functions
  function sendMsg() {
    const msg = testRef.current.value;
    axios({
      method: "post",
      url: telURL,
      data: {
        chat_id: chatId,
        text: msg,
      },
    });
  }

  // returns
  return (
    <div>
      <div>
        <input type="text" ref={testRef} />
        <button onClick={sendMsg}>Send</button>
      </div>
    </div>
  );
};

export default Header;
