import { useEffect, useState } from "react";
import "../../App.css";
import { Touch } from "../../Touch";
import { Help } from "../../Help";
import { Cell } from "../../components/Cell/Cell";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import { io } from "socket.io-client";
import {
  Text,
  useTheme,
  Box,
  Flex,
  HStack,
  IconButton,
  Input,
  Tooltip,
  // Slide,
} from "@chakra-ui/react";
import { VscDebugStart } from "react-icons/vsc";
import { LuUnplug } from "react-icons/lu";
import { PiPlugsConnectedFill } from "react-icons/pi";
import { RiPaletteFill } from "react-icons/ri";
import { MdCleaningServices } from "react-icons/md";
import { TiMinus, TiPlus } from "react-icons/ti";
import { useDeviceSize } from "../../hooks/useDeviceSize";

const socket = io(window.location.origin);

const StartSession = ({ handleCreateSession }: any) => (
  <>
    <Box marginLeft="10px" />
    <Text>
      <HStack>
        <Tooltip hasArrow label="Start">
          <IconButton
            icon={<VscDebugStart />}
            onClick={handleCreateSession}
            aria-label={"start"}
          >
            Start
          </IconButton>
        </Tooltip>
      </HStack>
    </Text>
    <Box marginRight="5px" />
  </>
);

const ActiveSession = ({ sessionIdInput, handleInputChange }: any) => (
  <Text>
    <Input
      maxW="120px"
      value={sessionIdInput}
      onChange={(e) => handleInputChange(e)}
      placeholder="Join Code"
      color="white"
      variant="filled"
    />
  </Text>
);

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
  const theme = useTheme();
  const { isDesktop } = useDeviceSize();

  const [sessionIdInput, setSessionIdInput] = useState(sessionId);

  const rowsHeight = window.innerWidth / scale;
  const rowsWidth = window.innerHeight / scale;
  const rows = Array.from({ length: rowsHeight }, (_, i) => i + 5);
  const columns = Array.from({ length: rowsWidth }, (_, i) => i + 5);

  const createSession = async () => {
    try {
      const response = await api.create.session();
      navigate(`/${response.data.sessionId}`);
      setSessionIdInput(response.data.sessionId);
      window.location.reload();
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

  const handleCreateSession = () => {
    if (!sessionId) {
      createSession();
    }
  };

  const handlePaletteChange = () => {
    const color = getRandomChakraColorName();
    setPalette(color);
    if (sessionId) {
      socket.emit("palette", { palette: color });
    }
  };

  useEffect(() => {
    const handleKeyPress = (event: any) => {
      if (event.key === "m" || event.key === "M") {
        handleCreateSession();
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
        handlePaletteChange();
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

  const handleInputChange = (e: any) => {
    setSessionIdInput(e.currentTarget?.value);
  };

  const handleClearBoard = () => {
    if (sessionId) {
      return socket.emit("clear");
    }
    return window.location.reload();
  };

  useEffect(() => {
    if (sessionIdInput?.length === 4 && sessionId !== sessionIdInput) {
      navigate(`/${sessionIdInput}`);
      window.location.reload();
    }
  }, [sessionIdInput]);

  useEffect(() => {
    socket.on("palette", (palette) => {
      setPalette(palette);
    });
  }, [palette]);

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
              socket={socket}
            />
          ))}
        </div>
      ))}
      <Box
        position="fixed"
        bottom="0"
        display="flex"
        flexDir="row"
        minW="100%"
        padding="2"
        minH="5vh"
        backgroundColor={theme.colors?.[palette || "gray"]["900"]}
        alignItems="center"
      >
        <Box margin="2">
          {isConnected ? (
            <PiPlugsConnectedFill
              color={theme.colors?.[palette || "gray"]["300"]}
            />
          ) : (
            <LuUnplug color={theme.colors?.[palette || "gray"]["300"]} />
          )}
        </Box>
        <Text color={theme.colors?.[palette || "gray"]["300"]}>
          {isConnected ? `Coop` : "Solo"}
        </Text>
        <Flex flex={1} />
        {isDesktop && (
          <>
            <Tooltip label="Decrease Scale" hasArrow>
              <IconButton
                icon={<TiMinus />}
                marginRight="5px"
                aria-label={"palette"}
                onClick={() => setScale(scale - 1)}
              />
            </Tooltip>
            <Tooltip label="Increase Scale" hasArrow>
              <IconButton
                icon={<TiPlus />}
                marginRight="5px"
                aria-label={"palette"}
                onClick={() => setScale(scale + 1)}
              />
            </Tooltip>
          </>
        )}
        <Tooltip label="Clear board" hasArrow>
          <IconButton
            icon={<MdCleaningServices />}
            marginRight="5px"
            aria-label={"palette"}
            onClick={handleClearBoard}
          />
        </Tooltip>
        <Tooltip label="Color Palette" hasArrow>
          <IconButton
            icon={<RiPaletteFill />}
            marginRight="5px"
            aria-label={"palette"}
            onClick={handlePaletteChange}
          />
        </Tooltip>
        {!sessionId && (
          <StartSession handleCreateSession={handleCreateSession} />
        )}
        <ActiveSession
          sessionIdInput={sessionIdInput}
          handleInputChange={handleInputChange}
        />
      </Box>
    </div>
  );
}

export default Root;
