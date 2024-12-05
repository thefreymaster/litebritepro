import {
  Box,
  useTheme,
  Text,
  Flex,
  Tooltip,
  IconButton,
  HStack,
  Input,
} from "@chakra-ui/react";
import { LuUnplug } from "react-icons/lu";
import { MdCleaningServices } from "react-icons/md";
import { PiPlugsConnectedFill } from "react-icons/pi";
import { RiPaletteFill } from "react-icons/ri";
import { TiMinus, TiPlus } from "react-icons/ti";
import { VscDebugStart } from "react-icons/vsc";

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

interface IActionsFooter {
  palette: string;
  isConnected: boolean;
  scale: number;
  sessionId: string;
  sessionIdInput: string;
  handleInputChange(v: string): void;
  setScale(n: number): void;
  handleClearBoard(): void;
  handlePaletteChange(): void;
  handleCreateSession(): void;
}

export const ActionsFooter = ({
  palette,
  isConnected,
  scale,
  setScale,
  sessionId,
  sessionIdInput,
  handleClearBoard,
  handlePaletteChange,
  handleCreateSession,
  handleInputChange,
}: IActionsFooter) => {
  const theme = useTheme();

  return (
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
      {!sessionId && <StartSession handleCreateSession={handleCreateSession} />}
      <ActiveSession
        sessionIdInput={sessionIdInput}
        handleInputChange={handleInputChange}
      />
    </Box>
  );
};
