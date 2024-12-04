import { Fade } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdTouchApp } from "react-icons/md";
import { useDeviceSize } from "./hooks/useDeviceSize";
import { LuMousePointer2 } from "react-icons/lu";

export const Touch = () => {
  const { isMobile } = useDeviceSize();

  const [fade, setFade] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setFade(false);
    }, 3000);
  }, []);

  if (isMobile) {
    return (
      <Fade in={fade}>
        <MdTouchApp
          style={{
            color: "white",
            fontSize: 72,
            position: "fixed",
            left: "calc(50vw - 50px)",
            top: "calc(50vh - 62px)",
            zIndex: 100,
          }}
        />
      </Fade>
    );
  }
  return (
    <Fade
      in={fade}
      style={{
        color: "white",
        fontSize: 36,
        position: "fixed",
        left: "calc(50vw - 50px)",
        top: "calc(50vh - 62px)",
        zIndex: 100,
        animation: "moveInCircle 3s linear infinite",
      }}
    >
      <LuMousePointer2 />
    </Fade>
  );
};
