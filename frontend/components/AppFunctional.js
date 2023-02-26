import React, { useState } from "react";
import axios from "axios";
//(1,1) (2,1) (3,1)
//(1,2) (2,2) (3,2)
//(1,3) (2,3) (3,3)

export default function AppFunctional(props) {
  const [location, setLocation] = useState([2, 2]);
  const [NumberOfMoves, setNumberOfMoves] = useState(0);
  const [Email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const locationAsStart = (location[1] - 1) * 3 + location[0] - 1;

  function goRight() {
    if (location[0] < 3) {
      setLocation([location[0] + 1, location[1]]);
      setNumberOfMoves(NumberOfMoves + 1);
    } else {
      setMessage("You can't go right");
    }
  }
  function goLeft() {
    if (location[0] > 1) {
      setLocation([location[0] - 1, location[1]]);
      setNumberOfMoves(NumberOfMoves + 1);
    } else {
      setMessage("You can't go right");
    }
  }
  function goDown() {
    if (location[1] < 3) {
      setLocation([location[0], location[1] + 1]);
      setNumberOfMoves(NumberOfMoves + 1);
    } else {
      setMessage("You can't go down");
    }
  }
  function goUp() {
    if (location[1] > 1) {
      setLocation([location[0], location[1] - 1]);
      setNumberOfMoves(NumberOfMoves + 1);
    } else {
      setMessage("You can't go up");
    }
  }

  function reset() {
    setLocation([2, 2]);
    setNumberOfMoves(0);
    setMessage("");
    setEmail("");
    // Tüm stateleri başlangıç ​​değerlerine sıfırlamak için bu helperı kullanın.
  }

  function onChange(evt) {
    setEmail(evt.target.value);
    // inputun değerini güncellemek için bunu kullanabilirsiniz
  }

  function handleSubmit(event) {
    event.preventDefault();
    // payloadu POST etmek için bir submit handlera da ihtiyacınız var.
  }
  const payload = {
    x: location[0],
    y: location[1],
    steps: NumberOfMoves,
    Email: Email,
  };
  console.log(payload);
  axios
    .post("http://localhost:9000/api/result", payload)
    .then((res) => {
      console.log(res.data);
      reset();
    })
    .catch((error) => {
      console.log("Hatalı payload", error);
    });
  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Koordinatlar ({location.join(",")})</h3>
        <h3 id="steps">{NumberOfMoves} kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div
            key={idx}
            className={`square${idx === locationAsStart ? " active" : ""}`}
          >
            {idx === locationAsStart ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={goLeft}>
          SOL
        </button>
        <button id="up" onClick={goUp}>
          YUKARI
        </button>
        <button id="right" onClick={goRight}>
          SAĞ
        </button>
        <button id="down" onClick={goDown}>
          AŞAĞI
        </button>
        <button id="reset" onClick={reset}>
          reset
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          id="email"
          type="email"
          placeholder="email girin"
          onChange={onChange}
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
