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
} from "@chakra-ui/react";
import { COLORS } from "./colors";

const ShortCut = ({ shortcut, title }) => {
  return (
    <HStack>
      <Kbd>{shortcut}</Kbd>
      <Box>{title}</Box>
    </HStack>
  );
};

export const Help = ({ showHelp, onClose, palette, setPalette }: any) => {
  const handleChange = (e) => {
    setPalette(e.target.value);
  };

  return (
    <Modal isOpen={showHelp} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Shortcuts</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack display="flex" alignItems="flex-start">
            <ShortCut shortcut="P" title="Color Palette" />
            <ShortCut shortcut="S" title="Start Show" />
            <ShortCut shortcut="A" title="Fill All" />
            <ShortCut shortcut="C" title="Clear" />
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
  );
};
