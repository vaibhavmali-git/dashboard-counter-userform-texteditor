import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import "./styles.css";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function Counter() {
  // State for the counter
  const [counter, setCounter] = useState(() => {
    const savedCounter = localStorage.getItem("counter");
    return savedCounter ? parseInt(savedCounter) : 0;
  });

  const { backgroundColor } = useSpring({
    from: { backgroundColor: "#FDE65A" },
    to: { backgroundColor: `rgb(${counter * 10}, ${255 - counter * 10}, 100)` },
    config: { duration: 500 },
  });

  useEffect(() => {
    localStorage.setItem("counter", counter);
  }, [counter]);

  const incrementCounter = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };

  const decrementCounter = () => {
    if (counter > 0) {
      setCounter((prevCounter) => prevCounter - 1);
    }
  };

  const resetCounter = () => {
    setCounter(0);
  };

  return (
    <>
      <div id="counter">
        <h1>Counter App</h1>
        <div className="info-section" style={{ textAlign: "center" }}>
          <p>Current Counter Value: {counter}</p>
        </div>
        <div className="counter-wrapper">
          <div className="app">
            <animated.div
              className="container"
              style={{
                background: backgroundColor,
              }}
            >
              <div className="total_amount_card">
                <div className="right">
                  <span
                    style={{
                      color: "gray",
                      cursor: "pointer",
                      background: "white",
                      padding: "2px 4px",
                      borderRadius: "3px",
                    }}
                    onClick={resetCounter}
                  >
                    Reset
                  </span>
                </div>
                <div className="card_text">
                  <h3 className="total_amount_heading">{counter}</h3>
                </div>
              </div>
              <form>
                <div className="button_collection">
                  <Stack spacing={2} direction="row" justifyContent="center">
                    <Button
                      onClick={incrementCounter}
                      variant="contained"
                      className="btn_one"
                    >
                      +
                    </Button>
                    <Button
                      onClick={decrementCounter}
                      variant="contained"
                      className="btn_two"
                    >
                      -
                    </Button>
                  </Stack>
                </div>
              </form>
            </animated.div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Counter;
