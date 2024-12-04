// @ts-nocheck

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Kbd,
  VStack,
  ModalFooter,
  Select,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
  HStack,
  Divider,
  Text,
  Fade,
} from "@chakra-ui/react";
import { COLORS } from "./colors";
import { useEffect, useState } from "react";

const ShortCut = ({ shortcut, title }) => {
  return (
    <HStack>
      <Kbd>{shortcut}</Kbd>
      <Box>{title}</Box>
    </HStack>
  );
};

export const Help = ({ showHelp, onClose, palette, setPalette }: any) => {
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  const handleChange = (e) => {
    setPalette(e.target.value);
  };

  useEffect(() => {
    setTimeout(() => {
      setShowHelpDialog(true);
      setTimeout(() => {
        setShowHelpDialog(false);
      }, 6000);
    }, 8000);
  }, []);

  return (
    <>
      <Fade
        in={showHelpDialog}
        style={{
          color: "white",
          fontSize: 14,
          position: "fixed",
          left: "calc(50vw - 50px)",
          bottom: "20px",
          zIndex: 100,
        }}
      >
        <HStack>
          <Kbd>H</Kbd>
          <Text>Tap H for help</Text>
        </HStack>
      </Fade>
      <Modal isOpen={showHelp} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Help</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack display="flex" alignItems="flex-start">
              <ShortCut shortcut="P" title="Color Palette" />
              <ShortCut shortcut="S" title="Start Show" />
              <ShortCut shortcut="A" title="Fill All" />
              <ShortCut shortcut="C" title="Clear" />
              <ShortCut shortcut="R" title="Reload" />
              <ShortCut shortcut="-" title="Decrease Scale" />
              <ShortCut shortcut="+" title="Increase Scale" />
              <Divider />
              <FormControl>
                <FormLabel>Color Palette</FormLabel>
                <Select value={palette} onChange={handleChange}>
                  <option value="">random</option>
                  {Object.keys(COLORS).map((color) => (
                    <option value={color}>{color}</option>
                  ))}
                </Select>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
};
