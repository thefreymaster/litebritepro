import { useEffect, useMemo, useState } from "react";
import { COLORS } from "../../colors";
import { useParams } from "react-router-dom";

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

interface ICell {
  palette: string;
  scale: number;
  allActive: boolean;
  currentPosition: {
    x: number | null;
    y: number | null;
  };
  x: number;
  y: number;
  socket: any;
}

export const Cell = ({
  palette,
  scale,
  allActive,
  currentPosition,
  x,
  y,
  socket,
}: ICell) => {
  const { sessionId } = useParams();

  const [active, setActive] = useState(false);

  const emitActivated = () => socket.emit("cellActivated", { x, y, sessionId });

  const handleHover = async () => {
    setActive(true);
    emitActivated();
  };

  useEffect(() => {
    socket.on(`${sessionId}/${x}-${y}`, () => {
      setActive(true);
    });
    socket.on("clear-board", () => {
      debugger
      setActive(false);
    });
  }, [x, y]);

  useEffect(() => {
    if (currentPosition.x === x && currentPosition.y === y) {
      setActive(true);
      emitActivated();
    }
  }, [currentPosition, sessionId]);

  useEffect(() => {
    if (allActive) {
      setActive(true);
    }
  }, [allActive]);

  useEffect(() => {
    const handleKeyPress = (event: any) => {
      if (event.key === "c" || event.key === "C") {
        setActive(false);
        socket.emit("clear");
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
