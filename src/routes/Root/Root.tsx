import { useEffect, useState } from "react";
import "../../App.css";
// import axios from "axios";
import { Touch } from "../../Touch";
import { Help } from "../../Help";
// import { useDeviceSize } from "../../hooks/useDeviceSize";
import { Cell } from "../../components/Cell/Cell";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import { io } from "socket.io-client";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Badge,
  Slide,
} from "@chakra-ui/react";

const socket = io(window.location.origin);

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

function Root() {
  const [isConnected, setIsConnected] = useState(false);
  const [palette, setPalette] = useState("");
  const [show, setShow] = useState(false);
  const [scale, setScale] = useState(20);
  const [allActive, setAllActive] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  //   const { isMobile } = useDeviceSize();
  const navigate = useNavigate();
  const { sessionId } = useParams();

  const rowsHeight = window.innerWidth / scale;
  const rowsWidth = window.innerHeight / scale;
  const rows = Array.from({ length: rowsHeight }, (_, i) => i + 5);
  const columns = Array.from({ length: rowsWidth }, (_, i) => i + 5);

  //   useEffect(() => {
  //     if (isMobile) {
  //       setTimeout(() => {
  //         const getPalatte = () => {
  //           setPalette(getRandomChakraColorName());
  //           // if (show) {
  //           setInterval(() => {
  //             getPalatte();
  //           }, 2000);
  //           // }
  //         };
  //         setShow(!show);
  //         getPalatte();
  //       }, 7500);
  //     }
  //   }, []);

  const createSession = async () => {
    try {
      const response = await api.create.session();
      navigate(`/${response.data.sessionId}`);
    } catch (error) {
      console.error("Error creating session:", error);
    }
  };

  window.addEventListener("load", () => {
    window.focus();
  });

  useEffect(() => {
    if (sessionId) {
      socket.on("connect", () => {
        setIsConnected(true);
        socket.emit("user-conection", { userId: socket.id, sessionId });
        console.log("Connected to server with ID:", socket.id);
      });
    }
  }, [sessionId, isConnected]);

  useEffect(() => {
    const handleKeyPress = (event: any) => {
      if (event.key === "m" || event.key === "M") {
        if (!sessionId) {
          createSession();
        }
      }
      if (event.key === "h" || event.key === "H") {
        setShowHelp(!showHelp);
      }
      if (event.key === "a" || event.key === "A") {
        setAllActive(!allActive);
      }
      if (event.key === "-") {
        setScale(scale - 1);
      }
      if (event.key === "=") {
        setScale(scale + 1);
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

    window.addEventListener("keydown", handleKeyPress);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [show, scale, sessionId]);

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
      {sessionId && (
        <Slide direction="top" in={!isConnected} style={{ zIndex: 10 }}>
          <Alert variant="solid" status={isConnected ? "success" : "error"}>
            <AlertIcon />
            <AlertTitle>
              {isConnected ? "Connected" : `Disconnected`}
            </AlertTitle>
            <AlertDescription>
              Session: <Badge>{sessionId}</Badge>
            </AlertDescription>
          </Alert>
        </Slide>
      )}

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
              socket={socket}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Root;
