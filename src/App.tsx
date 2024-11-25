import { useEffect, useState } from "react";
import "./App.css";
// import axios from "axios";
import { COLORS } from "./colors";

function getRandomChakraColorName() {
  const chakraColorNames = [
    "gray",
    "red",
    "orange",
    "yellow",
    "green",
    "teal",
    "blue",
    "cyan",
    "purple",
    "pink",
  ];

  const randomIndex = Math.floor(Math.random() * chakraColorNames.length);
  return chakraColorNames[randomIndex];
}

function getRandomNumber() {
  const numbers = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  return numbers[Math.floor(Math.random() * numbers.length)];
}

function getRandomHexColor(palette?: string) {
  if (palette) {
    // @ts-ignore
    return COLORS[palette]?.[getRandomNumber()];
  }
  return `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0")}`;
}

const Cell = ({ palette }: any) => {
  const [active, setActive] = useState(false);

  const handleHover = async () => {
    setActive(true);
    // await axios.post(`/api/cell`, [x, y]);
  };

  useEffect(() => {
    const handleKeyPress = (event: any) => {
      if (event.key === "c" || event.key === "C") {
        setActive(false);
      }
    };

    window.addEventListener("keypress", handleKeyPress);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  return (
    <div
      style={{
        height: "10px",
        width: "10px",
        backgroundColor: active ? `${getRandomHexColor(palette)}` : "black",
        borderRadius: "10px",
      }}
      className="cell"
      onMouseOver={() => handleHover()}
    />
  );
};

function App() {
  const rowsHeight = window.innerWidth / 10;
  const rowsWidth = window.innerHeight / 10;
  const rows = Array.from({ length: rowsHeight }, (_, i) => i + 1);
  const columns = Array.from({ length: rowsWidth }, (_, i) => i + 1);
  const [palette, setPalette] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event: any) => {
      if (event.key === "p" || event.key === "P") {
        setPalette(getRandomChakraColorName());
      }
      if (event.key === "s" || event.key === "S") {
        const getPalatte = () => {
          setPalette(getRandomChakraColorName());
          // if (show) {
            setTimeout(() => {
              getPalatte();
            }, 2000);
          // }
        };
        setShow(!show);
        getPalatte();
      }
    };

    window.addEventListener("keypress", handleKeyPress);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [show]);

  return (
    <div
      className="container"
      style={{ display: "flex", flexDirection: "column" }}
    >
      {columns.map((column, columnI) => {
        return (
          <div
            className="row"
            key={column + columnI}
            style={{ display: "flex", flexDirection: "row" }}
          >
            {rows.map((row, rowI) => {
              return (
                <Cell palette={palette} x={rowI} y={columnI} key={row + rowI} />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default App;
