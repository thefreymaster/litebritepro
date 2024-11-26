import { useEffect, useMemo, useState } from "react";
import "./App.css";
// import axios from "axios";
import { COLORS } from "./colors";
import { Touch } from "./Touch";
import { Help } from "./Help";
import { useDeviceSize } from "./hooks/useDeviceSize";

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

const Cell = ({ palette, scale, allActive, currentPosition, x, y }: any) => {
  const [active, setActive] = useState(false);

  const handleHover = async () => {
    setActive(true);
    // await axios.post(`/api/cell`, [x, y]);
  };

  useEffect(() => {
    if (currentPosition.x === x && currentPosition.y === y) {
      setActive(true);
    }
  }, [currentPosition]);

  useEffect(() => {
    if (allActive) {
      setActive(true);
    }
  }, [allActive]);

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

  const memorized = useMemo(() => {
    return (
      <div
        style={{
          height: `${scale}px`,
          width: `${scale}px`,
          backgroundColor: active ? `${getRandomHexColor(palette)}` : "black",
          borderRadius: `${scale}px`,
        }}
        className="cell"
        data-test-x={x}
        data-test-y={y}
        onMouseOver={() => handleHover()}
      />
    );
  }, [scale, palette, active]);

  return <>{memorized}</>;
};

function App() {
  const [palette, setPalette] = useState("");
  const [show, setShow] = useState(false);
  const [scale, setScale] = useState(20);
  const [allActive, setAllActive] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const { isMobile } = useDeviceSize();

  const rowsHeight = window.innerWidth / scale;
  const rowsWidth = window.innerHeight / scale;
  const rows = Array.from({ length: rowsHeight }, (_, i) => i + 1);
  const columns = Array.from({ length: rowsWidth }, (_, i) => i + 1);

  useEffect(() => {
    if (isMobile) {
      setTimeout(() => {
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
      }, 7500);
    }
  }, [isMobile, show]);

  useEffect(() => {
    const handleKeyPress = (event: any) => {
      if (event.key === "r" || event.key === "R") {
        window.location.reload();
      }
      if (event.key === "h" || event.key === "H") {
        setShowHelp(!showHelp);
      }
      if (event.key === "a" || event.key === "A") {
        setAllActive(!allActive);
      }
      if (event.key === "-") {
        setScale(scale + 1);
      }
      if (event.key === "=") {
        setScale(scale - 1);
      }
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
  }, [show, scale]);

  const [currentPosition, setCurrentPosition] = useState({ x: null, y: null });

  const handleTouchMove = (e: any) => {
    // Get the current touch position
    const currentTouch = {
      x: Math.floor(e.touches[0].clientX / scale),
      y: Math.floor(e.touches[0].clientY / scale),
    };
    // @ts-ignore
    setCurrentPosition(currentTouch);
  };

  const onClose = () => {
    setShowHelp(false);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column" }}
      onTouchMove={handleTouchMove}
    >
      <Touch />
      <Help
        setPalette={setPalette}
        palette={palette}
        showHelp={showHelp}
        onClose={onClose}
      />
      {columns.map((column, columnI) => (
        <div
          className="row"
          key={column + columnI}
          style={{ display: "flex", flexDirection: "row" }}
        >
          {rows.map((row, rowI) => (
            <Cell
              scale={scale}
              palette={palette}
              allActive={allActive}
              x={rowI}
              y={columnI}
              currentPosition={currentPosition}
              key={row + rowI}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
