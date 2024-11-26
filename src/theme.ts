import { extendTheme } from "@chakra-ui/react";

const config = () => {
  return {
    initialColorMode: "dark",
    useSystemColorMode: true,
    styles: {
      global: {
        // styles for the `body`
        html: {
          backgroundColor: 'gray.50',
        },
      },
    },
  }
}

const theme = extendTheme({ config: config() });

export default theme;
